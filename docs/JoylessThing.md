# JoylessThing

## JoylessSchema

- Idea: `JoylessLine` is a schema `Review` with `About` links.

```
schema {
    sameAs
        for each label in labels where name is a urn
}
```

## Comparable

```java
JoylessThing implements Comparable {

    public Set<KeyVal> getIds() {
        return this.labels.filter(key in imdb mal vndb steam mangaupdates)
    }

    boolean equals(Object o) {
        this.getIds().some key is included in o.getIds()
    }

}
```

---

END.
