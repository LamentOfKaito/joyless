import { nanoid } from 'nanoid';

export class Shortkey {

    /**
     * @todo Use Set?
     * @type {Array<string>}
     * @private
     */
    static usedIds = [];

    /**
     * Generate a random id
     * @return {string}
     */
    static generateId() {
        let id;
        do {
            id = nanoid(3);
        } while (Shortkey.existsId(id));

        Shortkey.usedIds.push(id);

        // A valid HTML id needs to start with a letter
        return 'K' + id;
    }

    /**
     * @param {string} id
     * @return {boolean}
     * @private
     */
    static existsId(id) {
        return Shortkey.usedIds.includes(id);
    }

}
