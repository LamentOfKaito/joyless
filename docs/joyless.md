# Joyless

My `joyless-XXXX.md` files actually serve as "game backlogs".

- Unless otherwise specified, it is a film and is in English.

- **Abbreviations**:
    * LP: Let's Play or Longplay

## Markdown style guide

- An unordered list can start with `-`, `*`, or `+`.
You should use those symbols in order, depending on the nesting level.
```md
- A
    * B
        + C
```

- When listing labels, put my "personal" labels at the end:
```md
- Whatever `[X][Y][Z][rewatchable][unfindable][opinion]`
```


## Labels

**My labels/URNs** AKA `kai-garden-urns` or `joyless-urns.json`

- Wayback Machine - Internet Archive
    `<a href="{url}"></a> [archived:{timestamp}]` => `http://web.archive.org/web/{timestamp}/{url}`
    The URL defaults to the first preceding link (usually its the only one of that line)

- `S` (season number) and `E` (episode number)

- `opinion:{myOpinion}` = loved, liked, ok, meh, disliked.
    * `loved`: ...
    * `liked`: ...
    * `ok`: fine, average, watchable
    * `meh`: mediocre
    * `disliked`: hated

- `rec-by:{person}` means this thing was "recommended to me by that person"

- `casts:{actors}`

- `unfindable` means that a thing could not be found (like The Broken).
An _Arr_ project (Sonarr, Radarr) could be used to find it.


## What URN to use

- Anime? **MAL**

- Manga? **MAL** and **mangaupdates** or **mangadex** if not completed

- Game?
    - VN? **VNDB**
    - Else **IGDB** or **IMDB**

- Film? **IMDB**

- Series? **IMDB**

- Music?
    - Vocaloid? **VOCADB**
    - Else **YouTube**
    - Possible: **musicbrainz** or **spotify**


## Name format

TBD.

Options:
- Title (Season 02, Part 1) - Author
- Title (Season 02, Part 1) by Author


## Technicalities

### Images

- [ ] How to set multiple images? (like local vs external/origin)
- [ ] What about blurhash?

---

END.
