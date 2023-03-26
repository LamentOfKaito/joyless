import getMalPoster from "./getMalPoster.js";
import getTmbdPoster from "./getTmbdPoster.js";
import getYtsPoster from "./getYtsPoster.js";

import JoylessThing from "../JoylessThing.js";

/**
 * 
 * @param {JoylessThing} thing
 * @returns {Promise<string?>} URL to the poster. Can be external or local.
 */
 export default async function getPosterOf(thing) {

    /**
     * @param {string} l - label
     * @returns {boolean}
     */
    // @ts-ignore
    const hasLabel = (l) => Object.hasOwn(thing.labels, l);;

    if (hasLabel('imdb')) {
        const imdbId = thing.labels.imdb;
        const result = await getTmbdPoster(imdbId);
        if (result) {
            return result;
        }
    }
    
    if (hasLabel('film') && hasLabel('imdb')) {
        const imdbId = thing.labels.imdb;
        const entryImg = await getYtsPoster(imdbId);
        if (entryImg) {
            return entryImg;
        }
    }

    if (hasLabel('mal')) {
        const [malType, malId] = thing.labels.mal.split(':');
        let result = await getMalPoster(malType, malId);
        if (result) {
            return result;
        }
        
        
        if (malType === 'anime') {
            // Use BetweenOurWorlds and Kitsu
            //getKitsuPoster
        }
        
    }

    return null;
}
