import fs from 'fs/promises';
import lunr from 'lunr';

async function readLunrIndex() {
    const content = await fs.readFile('joyless.lunr.json', {encoding: 'utf8'});
    const idx = lunr.Index.load(JSON.parse(content));
    return idx;
}

(async function testLunr() {

    const idx = await readLunrIndex();

    const resultIds = idx
        .search('unicorn')
        .map(lunrResult => lunrResult.ref);
    console.log(resultIds);
})();
