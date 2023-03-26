import JoylessCache from './JoylessCache.js';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const cache = new JoylessCache();

/**
 * TMDB https://www.themoviedb.org
 * 
 * @param {string} imdbId 
 * @returns {Promise<string|null>}
 */
export default async function getTmbdPoster(imdbId) {
    const posterSize = 'w300'; // 'original'
    const entryName = `imdb=${imdbId}/tmbd`;
    const entryImg = `${entryName}.${posterSize}.jpg`;
    const entryUrl = `${entryName}.${posterSize}.url`;

    const tmbdApiFind = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&language=en-US&external_source=imdb_id`;

    if (await cache.has(entryImg)) {
        return entryImg;
    } else {
        /**
        @type {
            {        
                movie_results: Array<{
                    id: number,
                    name: string,
                    media_type: 'movie',
                    poster_path: string,
                }>,
                tv_results: Array<{
                    id: number,
                    name: string,
                    media_type: 'tv',
                    poster_path: string,
                }>
                }
            }
        */
        const rawResults = await fetch(tmbdApiFind).then(res => res.json());
        const mergedResults = [...rawResults.movie_results, ...rawResults.tv_results];
    
        if (mergedResults.length === 1) {
            const result = mergedResults[0];
            // e.g. "poster_path":"/2MhDPbadE2ha83qiFwUHPgmKLnV.jpg"
            const posterPath = result.poster_path;
            const posterUrl = `https://image.tmdb.org/t/p/${posterSize}${posterPath}`;

            const imgUrl = posterUrl;    
            const imgData = await fetch(posterUrl).then(res => res.arrayBuffer());

            await cache.put(entryUrl, imgUrl);
            await cache.put(entryImg, imgData);
            return entryImg;
        }

        return null;
    }
}
