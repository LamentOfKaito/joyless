# Joyless projects


## joyless-parser
Parse my "Joyless Markdown files" and export entries as JSON + builds a Lunr search index.
#JavaScript #Node

Notes:
- Requires `TMDB_API_KEY` env variable.


## joyless-web
#JavaScript #React
Search.

- Search
- Shots Indexer (Java)
- Web


## [ ] joyless-shots-indexer
#Java

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
#Java
Parse MAL exports.


## [ ] joyless-betweenourworlds
#Java

Uses:
- Between Our Worlds https://betweenourworlds.org
- Apache Jena https://jena.apache.org/index.html
- HDT Java https://github.com/rdfhdt/hdt-java

---

END.
