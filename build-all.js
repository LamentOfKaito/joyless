/**
 * @file Build all (webapp and `*.json` files)
 */
import execa from 'execa';

const RAW_REPO_URL = 'https://github.com/ReprimandedKaito/reprimanded-notes';
const RAW_REPO_NAME = 'reprimanded-notes';
const RAW_JOYLESS_SUBDIR = './content/joyless/';

const inputDir = path.resolve(RAW_REPO_NAME, RAW_JOYLESS_SUBDIR);
const thingsOutput = 'joyless.things.json';
const lunrOutput = 'joyless.lunr.json';
const metaOutput = 'joyless.meta.json';

// NOTE: I am using 'www' (a la Apache) just so I don't get confused with `joyless-web`'s `build/` or whatever.
const OUTPUT_DIR = 'www';


async function fetchRawData() {
    await execa(`git clone --depth 1 ${RAW_REPO_URL} ${RAW_REPO_NAME}`);
}

/**
 * Get last edit timestamp
 *
 * @todo Maybe returns "author date, strict ISO 8601 format" (`%aI`)?
 *
 * @returns {string} committer date, strict ISO 8601 format
 */
async function getUpdatedDate() {
    const output = await execa(`cd ${RAW_REPO_NAME} ; git log -n 1 --pretty=format:%cI ${RAW_JOYLESS_SUBDIR}`);
    const isoDate = output.trim();
    return isoDate;
}

async function exportJsonFiles() {
    await execa(`node joyless-parser/cli --input-dir "${inputDir}" --things-output "${thingsOutput}" --lunr-output "${lunrOutput}"`);
}

async function buildWebapp() {
    await execa(`cd joyless-web ; npm build`);
}

async function task1() {
    await buildWebapp();
}

async function task2() {
    await fetchRawData();
    await exportJsonFiles();
    const updatedAt = await getUpdatedDate();
    await fs.writeFile(metaOutput, JSON.stringify({ updatedAt: updatedAt }));
}

async function task3() {
    console.log('Copying everything to www/');

    // rename joyless-web/build/ to www/

    // TODO: Maybe use `www/data/`?
    // copy ./joyless.{things,lunr,meta}.json to www/
}

async function main() {
    await Promise.all[
        task1(),
        task2()
    ];
    await task3();

    console.log('Done.');
    process.exit(0);
}

main();
