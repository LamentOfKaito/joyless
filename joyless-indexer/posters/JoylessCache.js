import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export default class JoylessCache {

    async get(entryName) {
        return null;
    }
    
    /**
     * Get the absolute path of a file.
     * 
     * @example
     * toAbsolutePath('imdb=tt4645368/yts.medium.jpg') ===
     * 'C:/Users/Kaito/AppData/Roaming/JoylessCache/posters/imdb=tt4645368/yts.medium.jpg';
     * 
     * @param {string} entryName
     * @returns {string}
     */
    toAbolutePath(entryName) {
        //@ts-ignore
        return path.resolve(process.env.APPDATA, 'JoylessCache', 'posters', entryName);
    }

    /**
     * @param {string} entryName
     * @param {ArrayBuffer} data
     * @return {Promise<boolean>} - true if successful
     */
    async put(entryName, data) {
        const entryAbsolutePath = this.toAbolutePath(entryName);
        const entryFolder = path.dirname(entryAbsolutePath);
        await mkdir(entryFolder, { recursive: true });
        await writeFile(entryAbsolutePath, Buffer.from(data))
        return true;
    }

    /**
     * @param {string} entryName
     * @returns {Promise<boolean>}
     */
    async has(entryName) {
        const entryAbsolutePath = this.toAbolutePath(entryName);
        const entryExists = existsSync(entryAbsolutePath);
        return entryExists;
    }

}
