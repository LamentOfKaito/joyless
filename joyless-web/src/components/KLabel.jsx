import {memo} from 'react'

import './KLabel.css'

export default memo(function KLabel({k, v}) {

    switch (k) {
        case 'imdb':
            const id = v;
            const url = `https://www.imdb.com/title/${id}`
            return <a className="label imdb" href={url} target="_blank">IMDb</a>;
        
        case 'mal':
            const [malType, malId] = v.split(':');
            const malUrl = `https://myanimelist.net/${malType}/${malId}`
            return <a className="label mal" href={malUrl} target="_blank">MAL</a>;
        
        case 'opinion':
                return <span className="label opinion">{k}:{v}</span>

        default:
            return <span className="label">{k}{v? [':', v] : null}</span>
    }
})
