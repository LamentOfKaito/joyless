//@ts-check
'use strict';

import {writeFile} from 'fs/promises'

import JoylessMarkdownParser from './JoylessMarkdownParser.js';
import { readAll } from './joyless-builder.js';
import getPosterOf from './posters/getPosterOf.js';
import { prebuildLunrIndex } from './SearchUtils.js';


(async function test() {
    const text = await readAll(JOYLESS_DIRECTORY);
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
            console.error(e);
            thingsWithPosters.push(thing);
        }
    }

    const serializedLunrIndex = prebuildLunrIndex(thingsWithPosters);

    await writeFile('joyless.things.json', JSON.stringify(thingsWithPosters));
    await writeFile('joyless.lunr.json', serializedLunrIndex);

})();
