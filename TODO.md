# TODO

## Joyless Web

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

- [ ] UI: Use a customized scrollbar.

- [ ] UI: Add an animated loader.

- [ ] UI: Add an icon/favicon (purple heart? hexagon?).

- [ ] UI: Add shadow to searchbox also:
```css
* {
    box-sizing: border-box;
}
```

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
