# Joyless projects


## joyless-parser
Parse my "Joyless Markdown files" and export entries as JSON + builds a Lunr search index.
_#JavaScript #Node_

Notes:
- It expects a `TMDB_API_KEY` env variable.
- Example: Running from the CMD:
```bat
node joyless-parser/cli.js ^
    --input-dir "%HOMEPATH%/Documents/GitHub/reprimanded-notes/content/joyless" ^
    --things-output "%HOMEPATH%/www/joyless.things.json" ^
    --lunr-output "%HOMEPATH%/www/joyless.lunr.json" ^
    --dry
```


## joyless-web
Render the output of `joyless-parser` with basic search functionality (via Lunr). _#JavaScript #React_

Features:
- OpenSearch: Search directly from the omnibox (e.g. typing joylss > TAB > alice > ENTER)
- URL state
- [ ] List view and grid view
- [ ] Works offline


## `joyless-urns.json`
...


## [ ] joyless-shots-indexer
_#Java_

Uses:
- Blurhash
    * https://github.com/woltapp/blurhash
    * https://github.com/woltapp/react-blurhash
- Apache Commons Codec
- ImageIO
https://docs.oracle.com/javase/8/docs/api/javax/imageio/ImageIO.html

```java
class JoylessFile {}

class JoylessIndexer {
    public List<JoylessFile> scan(String dirPath);
}
```


## [ ] joyless-myanimelist-xml
Parse MAL exports. _#Java_



## [ ] joyless-betweenourworlds
_#Java_

Uses:
- Between Our Worlds https://betweenourworlds.org
- Apache Jena https://jena.apache.org/index.html
- HDT Java https://github.com/rdfhdt/hdt-java

---

END.
