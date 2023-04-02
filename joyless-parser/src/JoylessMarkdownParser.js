import { unified } from 'unified';
import { visitParents } from 'unist-util-visit-parents';
import remarkMarkdown from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'

import JoylessThing from './JoylessThing.js';
import { Shortkey } from './Shortkey.js';


/**
 * @param {Object} mdast 
 * @returns {string} HTML
 */
const htmlifyMdast = (mdast) => {
    return unified()
        /*
        // The following returns an error for some reason:
        // > Error: Cannot compile unknown node `list`
        .use(remarkRehype)
        .use(rehypeExternalLinks, {target: '_blank', rel: ['nofollow']})
        .use(rehypeStringify)
        */
        .use(remarkHtml)
        .stringify(mdast)
        .replace(/\<a /g, '<a target="_blank" rel="nofollow" ')
        ;
};

/**
 * Parse the `code` part
 * `[key:value][ANOTHERKEY:value][key with no value]`
 * 
 * @todo Write a real parser
 * 
 * @param {string} str 
 * @returns {{[k:string]: string}} entries
 */
export function parseMetadataString(str) {
    if (!str) {
        return {};
    }

    const entries = str
        .slice(1, -1)
        .split('][')
        .map((part) => {
            const i = part.indexOf(':');
            let key, val;
            if (i < 0) {
                key = part;
                val = '';
            } else {
                key = part.slice(0, i).toLocaleLowerCase();
                val = part.slice(i + 1);
            }
            return [key, val];
        });

    const labels = Object.fromEntries(entries);

    return labels;
}

/**
 * Uses `npm:remark`
 */
export default class JoylessMarkdownParser {

    /**
     * @returns {Object} AST
     */
    static parseMarkdown(text) {
        const ast = unified().use(remarkMarkdown).use(remarkGfm).parse(text);
        return ast;
    }

    /**
     * 
     * @param {Object} mdast 
     * @returns {Array<JoylessThing>}
     */
    static getThings(mdast) {
        const things = [];

        visitParents(mdast, (node, parents) => {
            if (node.type === 'listItem') {
                // ignore sublists
                const isHighestLevel = !parents.find(p => p.type === 'listItem');
                if (!isHighestLevel) {
                    return;
                }

                const thing = {};
                thing.id = Shortkey.generateId();

                /**
                 * Was the line checked?
                 * 
                 * "- Whatever" => `null`
                 * 
                 * "- [ ] Whatever"  => `false`
                 * 
                 * "- [x] Whatever" => `true`
                 * 
                 * @type {boolean}
                 */
                thing.checked = node.checked !== false;

                //thing.ast = node;
                const para = node.children[0];
                const [text, inlineCode] = para.children;
                thing.name = text.value;
                const metadata = inlineCode?.value || '';
                thing.labels = parseMetadataString(metadata);

                const otherChildren = node.children.slice(1);
                if (otherChildren.length === 1) {
                    thing.notesHtml = htmlifyMdast(otherChildren[0]);
                } else {
                    thing.notesHtml = undefined;
                }
                things.push(thing);
            }
        });

        return things;
    }

    /**
     * 
     * - [ ] `filename` is used for the id?
     * 
     * @param {string} content 
     * @returns 
     */
    static parseThings(content) {
        return JoylessMarkdownParser.getThings(JoylessMarkdownParser.parseMarkdown(content));
    }

}
