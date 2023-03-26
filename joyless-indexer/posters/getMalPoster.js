import { load } from 'cheerio';
import JoylessCache from './JoylessCache.js';

const cache = new JoylessCache();

export default async function getMalPoster(malType, malId) {
    const entryName = `mal=${malType}=${malId}/mal`;
    const entryImg = `${entryName}.jpg`;
    const entryUrl = `${entryName}.url`;

    if (await cache.has(entryImg)) {
        return entryImg;
    } else {
        const malUrl = `https://myanimelist.net/${malType}/${malId}`
        const malHtml = await fetch(malUrl).then(res => res.text());
        const cheerioSelect = load(malHtml);
        const imgUrl = cheerioSelect('meta[property=og:image]').attr('content');
        if (!imgUrl) {
            return null;
        }

        const imgData = await fetch(imgUrl).then(res => res.arrayBuffer());

        await cache.put(entryUrl, imgUrl);
        await cache.put(entryImg, imgData);
        return entryName;
    }


}
