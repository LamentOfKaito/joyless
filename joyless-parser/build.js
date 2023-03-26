import { writeFile } from 'fs/promises'

import JoylessMarkdownParser from './src/JoylessMarkdownParser.js';
import { readAll } from './src/FileUtils.js';
import getPosterOf from './src/posters/getPosterOf.js';
import { prebuildLunrIndex } from './src/SearchUtils.js';

/**
 * Export files.
 * 
 * @todo Turn into a CLI program.
 * @todo Allow skipping `getPosters` and only used cached files.
 */
(async function build() {
    const JOYLESS_DIRECTORY = '../../reprimanded-notes/content/joyless';

    const inputDir = JOYLESS_DIRECTORY;
    const thingsOutput = 'joyless.things.json';
    const lunrOutput = 'joyless.lunr.json';

    const text = await readAll(inputDir);
    const things = JoylessMarkdownParser.parseThings(text);

    const thingsWithPosters = [];
    for (const thing of things) {
        try {
            const poster = await getPosterOf(thing);
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

    const serializedLunrIndex = prebuildLunrIndex(thingsWithPosters);

    await writeFile(thingsOutput, JSON.stringify(thingsWithPosters));
    await writeFile(lunrOutput, serializedLunrIndex);

})();
