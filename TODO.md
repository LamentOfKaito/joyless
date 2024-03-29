# TODO

- [ ] Infer typescript types from JSON schema?

- [ ] Infer labels
```js
const colorlessLabels = new Set('lgbt gay lesbian yaoi shounen-ai bl'.split(' '));

if (colorlessLabels.has(label)) {
    labels.colorless = '';
}
```

- Deduce types
```js
const mainTypes = new Set('film series anime manga game music'.split(' '));
const hasMainType = (thing) => Object.keys(thing.labels).some(k => mainTypes.has(k));
if (!hasMainType(thing)) {
    let deducedType;
    // Todo deduce type from other labels
    if (hasL('vndb') || hasL('igdb')) {
        deducedType === 'game';
    } else if (hasL('mal')) {
        deducedType = thing.labels['mal'].startsWith('manga') ? 'manga' : 'anime';
    } else if (hasL('musicbrainz') {
        deducedType === 'music';
    } else if (hasL('imdb')) {
        // could be 'film', 'series', or even 'game'
        // we need to query the IMDb API.
    } else {
        deducedType = null;
    }
        
    if (deducedType) {
        thing.labels[deducedType] = '';
    }
}
```

## General

- [ ] Replace Lunr.
    * Its syntax does not allow for OR logic `+is:(liked OR loved)`
    * Does not support weights. I want title to have more significance than alt or is tags 
    * Does not support exact matching 
    `is:animation` should not return `is:anime` results


## Joyless Web

- [ ] Add denounce to search

- [ ] Add min of 2 or 3 chars

- [ ] Refactor: Can use CSS nesting?

- [ ] Remove `ahooks/use-url-state`

- [ ] UI: Add cards view (as opposed to the default list view)

- [~] UI/Feat: Show Thing status as badge.
See joyless-nu#MyStatus

- [ ] data/Perf:
    - [x] Change ids' length from 11 to 4 (3 + 1) characters.
    - [x] Change `JoylessThing.notesHtml` from `null` to `undefined` so it will be omited when JSON stringified.
    - [x] Remove `JoylessThing.metadata`, we are using `labels` only (parsed `metadata` string).

- [ ] UX/Perf: use `debounce` when setting the query input.

- [ ] UI: Add a search icon next to the search bar.

- [ ] Refactor: Create `<KThingPlaceholder icon or type={?} />`.

- [ ] Refactor: Create `useLunr`/`react-use-lunr` a la `react-use-flexsearch`.
    https://github.com/angeloashmore/react-use-flexsearch/

- [ ] UI: Use a customized scrollbar.

- [ ] UI: Add an animated loader.

- [x] UI: Add an icon/favicon (purple heart? hexagon?).
    * Placeholder icon: Alien Monster twemoji [`1f47e.svg`](https://github.com/twitter/twemoji/blob/master/assets/svg/1f47e.svg)

- [ ] UI: Add shadow to searchbox.


## Joyless Parser & Deployment

- [ ] HOW TO DEAL WITH POSTERS?
    * Current approach: Only build locally and push to GitHub/Vercel.
    * [ ] Database? Flat database posters-cache.json (saved with notes)? Remote database like Mongo Atlas?
    * [ ] Can use "Incremental Static Regeneration"? (Whatever that means)

- [ ] Split `cli.js` into `export-data` and `cache-posters`.
We prob should not download images when we build on Vecel. (This increases build time, which may cause it to fail.)

- [~] Make the site auto-deploy:
    - On push to notes@master (https://vercel.com/docs/concepts/deployments/deploy-hooks)
    - [~] Add `/vercel.json`
    - [~] See `./build-all.js`

---

END.
