import JoylessCache from './JoylessCache.js';

const cache = new JoylessCache();

/**
 * 
 * @param {string} imdbId 
 * @returns {Promise<string|null>}
 */
async function getYtsCoverUrl(imdbId) {
    const url = `https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbId}`;
    const res = await fetch(url).then(res => res.json());
    // `title` will be `null` if the movie is not found.
    if (res?.data?.movie?.title) {
        const ytsMovie = res.data.movie;
        const coverUrl = ytsMovie.medium_cover_image;
        return coverUrl;    
    } else {
        return null;
    }
}

/**
 * @param {string} imdbId 
 * @returns {Promise<string|null>}
 */
export default async function getYtsPoster(imdbId) {
    const entryName = `imdb=${imdbId}/yts.medium`;
    const entryImg = `${entryName}.jpg`;
    const entryUrl = `${entryName}.url`;

    if (await cache.has(entryImg)) {
        return entryImg;
    } else {
        const imgUrl = await getYtsCoverUrl(imdbId);
        if (!imgUrl) {
            return null;
        }
        const imgData = await fetch(imgUrl).then(res => res.arrayBuffer());
        await cache.put(entryUrl, imgUrl);
        await cache.put(entryImg, imgData);
        return entryImg;
    }
    
}
