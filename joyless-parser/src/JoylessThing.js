class Thing {

    /** @type {string} */
    id;

    /** @type {string} */
    name;

    /** @type {Array<string>} */
    breadcrumb;

    image = {
        url: '',
        blurhash: ''
    };
}

/**
 * @todo Turn into a `.d.ts` or into a `.schema.json`
 */
export default class JoylessThing extends Thing {

    /**
     * Metadata string, gets parsed into `labels`.
     * @type {string?}
     */
    rawMetadata;
    
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
