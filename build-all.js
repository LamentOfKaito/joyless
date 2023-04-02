/**
 * @file Build all (webapp and `*.json` files)
 */
import execa from 'execa';
import path from 'path';

const RAW_REPO_URL = 'https://github.com/ReprimandedKaito/reprimanded-notes';
const RAW_REPO_NAME = 'reprimanded-notes';
const RAW_JOYLESS_SUBDIR = './content/joyless/';

// NOTE: I am using 'www' (a la Apache) just so I don't get confused with `joyless-web`'s `build/` or whatever.
const OUTPUT_DIR = 'www';

const inputDir = path.resolve(RAW_REPO_NAME, RAW_JOYLESS_SUBDIR);
const thingsOutput = path.resolve(OUTPUT_DIR, 'joyless.things.json');
const lunrOutput = path.resolve(OUTPUT_DIR, 'joyless.lunr.json');
const metaOutput = path.resolve(OUTPUT_DIR, 'joyless.meta.json');

async function fetchRawData() {
    await execa(`git clone --depth 1 ${RAW_REPO_URL} ${RAW_REPO_NAME}`);
}

/**
 * Get last edit timestamp
 *
 * @todo Maybe returns "author date, strict ISO 8601 format" (`%aI`)?
 *
 * @returns {Promise<string>} committer date, strict ISO 8601 format
 */
async function getUpdatedDate() {
    const output = await execa(`cd ${RAW_REPO_NAME} ; git log -n 1 --pretty=format:%cI ${RAW_JOYLESS_SUBDIR}`);
    const isoDate = output.trim();
    return isoDate;
}

async function buildWebapp() {
    await execa(`cd joyless-web ; npm run build`);
}

async function cleanUp() {
    console.log('Cleaning up...');
    console.time('cleanUp');
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.timeEnd('cleanUp');
}

async function exportData() {
    await fetchRawData();

    const updatedAt = await getUpdatedDate();
    const meta = { updatedAt };
    await fs.writeFile(metaOutput, JSON.stringify(meta));

    await execa(`node joyless-parser/cli --input-dir "${inputDir}" --things-output "${thingsOutput}" --lunr-output "${lunrOutput}"`);
}

async function copyWebApp() {
    console.log('Copying everything to www/');

    // rename joyless-web/build/ to www/

    // TODO: Maybe use `www/data/`?
    // copy ./joyless.{things,lunr,meta}.json to www/
}

async function main() {
    await cleanUp();

    await Promise.all([
        exportData(),
        buildWebapp(),
    ]);
    await copyWebApp();

    console.log('Done.');
    process.exit(0);
}

main();
