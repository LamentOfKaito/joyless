import { select } from 'unist-util-select'
import { findAllBefore } from 'unist-util-find-all-before'
import { toString } from 'mdast-util-to-string'
// For testing
import { fromMarkdown } from 'mdast-util-from-markdown'
import { parents } from 'unist-util-parents'
import assert from 'assert'

/**
 * Generate a heading-based breadcrumb for a given element.
 *
 * How it works:
 * - Get the oldest ancestor that is directly under `root`.
 * - Get all preceeding silbing nodes that are of type `heading`.
 * - Let the output be the last occurrence of each `heading`, from depth 1 to `maxHeadingDepth`.
 *
 * Something like [Breadcrumbs for markdown files (heading based) - JetBrains issue](https://youtrack.jetbrains.com/issue/IDEA-285907).
 *
 * @param {Node} tree Tree wrapped with `parents`.
 * @param {Node} node Node with parents.
 * @param {number} maxHeadingDepth Max heading depth.
 * @returns {Array<string>} headings
 */
export function getBreadcrumb(tree, node, maxHeadingDepth = 3) {
    const ancestor = getHighestAncestor(node);
    const test = node => node.type === 'heading';
    const headingsBefore = findAllBefore(tree, ancestor, test);

    const output = [];
    // We keep track of the last found heading, so we don't get wrong readings.
    // We want to get "H1b > H2b" and not the wrong breadcrumb "H1b > H2b > H3a"
    // when given a list like `H1a, H2a, H3a, H1b, H2b, H1c`.
    let lastHeadingIndex = -1;
    for (let d = 1; d <= maxHeadingDepth; d++) {
        const foundIndex = headingsBefore.findLastIndex((node, i) => i > lastHeadingIndex && node.depth === d);
        if (foundIndex > -1) {
            const found = headingsBefore.at(foundIndex);
            output.push(toString(found));
            lastHeadingIndex = foundIndex;
        }
    }
    return output;
}


/**
 * Get the highest/oldest ancestor other than root.
 *
 * For it to work, we need to use one of these packages:
 * - 'unist-util-visit-parents' to get the `ancestors` array.
 * - 'unist-util-parents' to add references to `.parent`s.
 *
 * @todo Rename this function?
 *
 * @param {Node} child current node
 * @param {Array<Node>|null} ancestors
 * @returns {Node} first parent (other than root).
*/
function getHighestAncestor(child, ancestors = null) {
    if (ancestors !== null) {
        if (ancestors.length > 1) {
            return ancestors[1];
        } else {
            return child;
        }
    }

    if (child.parent) {
        let curr = child;
        while (curr.parent.type !== 'root') {
            curr = curr.parent;
        }
        return curr;
    }

    throw new Error('Either the "ancestors" array or "parent" attributes must be defined.');
}


// TEST

const text = `
# Joyless A

[GitHub](https://github.com)

## Oop

### XXX
- X


# Joyless B

## Alpha

---

## Beta

### Baby
- [ ] Thing **target**
- [x] Thang

# Joyless C

_imagine_

END.
`

const markdownTree = parents(fromMarkdown(text));

{
    const linkNode = select('link', markdownTree);
    const actual = getBreadcrumb(markdownTree, linkNode, 3);
    const expected = ['Joyless A'];
    assert.deepStrictEqual(actual, expected);
}

{
    const strongNode = select('strong', markdownTree);
    const actual = getBreadcrumb(markdownTree, strongNode, 2);
    const expected = ['Joyless B', 'Beta'];
    assert.deepStrictEqual(actual, expected);
}

{
    const emphasisNode = select('emphasis', markdownTree);
    const actual = getBreadcrumb(markdownTree, emphasisNode, 3);
    const expected = ['Joyless C'];
    assert.deepStrictEqual(actual, expected);
}
