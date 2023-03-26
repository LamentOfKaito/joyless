import { default as glob } from 'glob-promise';
import {readFile} from 'fs/promises';
import {basename} from 'path';

/**
 * @param {String} root 
 * @returns {Promise<Array<String>>}
 */
export async function getMarkdownFiles(root) {
    const globPattern = 'joyless-*.md';
    const filenameRegex = /^joyless-(\d\d\d\d|childhood|misc|todo.*)\.md$/;
    const valideFilename = RegExp.prototype.test.bind(filenameRegex);
    
    const paths = await glob(globPattern, {
        cwd: root,
        nodir: true,
        absolute: true,
    });

    return paths
        .filter(path => valideFilename(basename(path)))
}

/**
 * 
 * @param {string} root 
 * @returns {Promise<string>}
 */
export async function readAll(root) {
    const paths = await getMarkdownFiles(root);
    const contents = await Promise
        .all(
            paths.map(path => readFile(path, {encoding: 'utf8'}))
        );
    const allText = contents.join('\r\n');
    return allText;
}
