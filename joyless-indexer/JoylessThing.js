class Thing {

    /** @type {string} */
    id;

    /** @type {string} */
    name;

    image = {
        url: '',
        blurhash: ''
    }
}

export default class JoylessThing extends Thing {

    /**
     * @type {string?}
     */
    metadata;
    
    /** @type {{[k:string]: string}} */
    labels;

    /** @type {Array<string>} */
    notes;

    /** @type {boolean} */
    checked;

    /** @type {'todo'|'doing'|'done'} */
    status;

    /**
     * @type {string?}
     */
    poster;
}
