import { default as glob } from 'glob-promise';
import { readFile } from 'fs/promises';
import { basename } from 'path';

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

    const validPaths = paths.filter(path => valideFilename(basename(path)));
    const sortedPaths = sortJoylessPaths(validPaths);

    return sortedPaths;
}

/**
 * Sort:
 * - YEAR (descending!)
 * - others (asc or desc)
 * - TODOs (asc or desc)
 * 
 * @todo Refactor!
 * 
 * @param {Array<string>} paths
 * @returns {Array<string>}
 */
export function sortJoylessPaths(paths) {
    const isYear = (str) => /joyless-(\d\d\d\d)\.md$/.test(str);
    const isTodo = (str) => /joyless-todo.*\.md$/.test(str);

    const yearFiles = [];
    const otherFiles = [];
    const todoFiles = [];

    paths.forEach(path => {
        if (isYear(path)) {
            yearFiles.push(path);
        } else if (isTodo(path)) {
            todoFiles.push(path);
        } else {
            otherFiles.push(path);
        }
    });

    yearFiles.sort((a, b) => a < b ? 1 : -1);

    const result = [...yearFiles, ...otherFiles, ...todoFiles];
    return result;
}


/**
 * 
 * @param {string} root 
 * @returns {Promise<string>}
 */
export async function readAll(root) {
    const paths = await getMarkdownFiles(root);
    console.log({paths});
    const contents = await Promise
        .all(
            paths.map(path => readFile(path, { encoding: 'utf8' }))
        );
    const allText = contents.join('\r\n');
    return allText;
}
