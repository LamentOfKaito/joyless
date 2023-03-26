/**
 * Using BetweenOurWorlds and Kitsu API
 * 
 * @param {string} malAnimeId
 * @returns {Promise<string?>}
 */
export default async function getKitsuPoster(malAnimeId) {
    const malUrl = `https://myanimelist.net/anime/${malAnimeId}`;

    //const bowThing = BetweenOurWorlds.findByMalUrl(malUrl);
    //const kitsuUrl = bowThing.getKitsuUrl()
    //const poster = kitsu.getAnime(kitsuUrl).getPoster.original
    //return poster;

    return null;
}
