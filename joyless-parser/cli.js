import { writeFile } from 'fs/promises';
import path from 'path';
import { program } from 'commander';

import JoylessMarkdownParser from './src/JoylessMarkdownParser.js';
import { readAll } from './src/FileUtils.js';
import getPosterOf from './src/posters/getPosterOf.js';
import { prebuildLunrIndex } from './src/SearchUtils.js';

program
    .requiredOption('-i, --input-dir <dir>')
    .requiredOption('--things-output <file>')
    .requiredOption('--lunr-output <file>')
    .option('--dry', null, null, false)
    .option('--no-posters')
    .parse();

const options = program.opts();

const isDryRun = options.dry;

const [
    inputDir,
    thingsOutput,
    lunrOutput
] = [
    options.inputDir,
    options.thingsOutput,
    options.lunrOutput
].map(x => path.resolve(x));


/**
 * Export files.
 * 
 * @todo Improve the `dry` run mode.
 * @todo Allow skipping `getPosters` and only used cached files.
 */
async function main() {

    console.log({ inputDir, thingsOutput, lunrOutput });

    console.log('Reading Markdown files...');
    const text = await readAll(inputDir);

    console.log('Parsing...');
    const things = JoylessMarkdownParser.parseThings(text);

    console.log('Getting posters...');
    const thingsWithPosters = [];
    for (const thing of things) {
        try {
            const poster = isDryRun ? null : await getPosterOf(thing);
            if (poster) {
                thingsWithPosters.push({
                    ...thing,
                    poster: poster,
                });
            } else {
                thingsWithPosters.push(thing);
            }
        } catch (e) {
            console.error(e, thing);
            thingsWithPosters.push(thing);
        }
    }

    console.log('Prebuilding Lunr index...');
    const serializedLunrIndex = prebuildLunrIndex(thingsWithPosters);

    console.log('Writing output...');
    if (!isDryRun) {
        await writeFile(thingsOutput, JSON.stringify(thingsWithPosters));
        await writeFile(lunrOutput, serializedLunrIndex);
    }

    console.log('Done.');
    process.exit(0);
}

main();
