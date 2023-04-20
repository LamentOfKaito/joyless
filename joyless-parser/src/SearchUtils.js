import lunr from 'lunr';
import JoylessThing from './JoylessThing.js';

/**
 * @example
 * fetchLunrIndex('joyless.lunr.json')
 * 
 * @param {string} url 
 * @returns Index
 */
export async function fetchLunrIndex(url) {
    const idxObj = await fetch(url).then(res => res.json());
    const idx = lunr.Index.load(idxObj);
    return idx;
}

/**
 * See https://lunrjs.com/guides/index_prebuilding.html
 * 
 * @param {Array<JoylessThing>} things
 * @returns {string} - JSON Lunr index
 */
export function prebuildLunrIndex(things) {
    const docs = toLunrData(things);

    const idx = lunr(function () {
        this.ref('id');
        this.field('name');
        this.field('aka');
        this.field('opinion');
        this.field('status');
        this.field('is');
        
        docs.forEach(function (doc) {
          this.add(doc);
        }, this);
    });
  
    const serializedIdx = JSON.stringify(idx);
    return serializedIdx;
}

/**
 * Reshape the data.
 * 
 * @param {Array<JoylessThing>} things 
 */
export function toLunrData(things) {
    return things.map(thing => {

        const obj = {
            id: thing.id,

            name: thing.name,

            status: thing.status,

            /** @type {string?} */
            aka: null,

            /** @type {string?} */
            opinion: null,

            /** @type {Array<string>} */
            is: [],

        };
        
        Object
            .entries(thing.labels)
            .forEach(pair => {
                const [name, val] = pair;
                
                switch(name) {
                    case 'opinion':
                        obj.opinion = val;
                        break;
                    
                    case 'aka':
                    case 'alt':
                        obj.aka = val;
                        break;
                    
                    default:
                        if (val === '') {
                            // [manga] => is:manga
                            obj.is.push(name);
                        } else {
                            // Ignore the rest: [imdb:{id}], etc.
                        }
                        break;
                }
            });
        
        return obj;
    });

}
