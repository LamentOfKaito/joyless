import {memo} from 'react'

import KLabel from './KLabel'
import './KThing.css'

export default memo(function KThing({thing}) {
    const statusModifier = `thing--${thing.status}`;

    return (
        <article id={thing.id} className={`thing ${statusModifier}`}>
            <div className='thing__poster-container'>
            {thing.poster ?
                    // Lazy loading.
                    <img className='thing__poster' alt='' loading='lazy' src={`./posters/${thing.poster}`} />
                    :
                    <img className='thing__poster' alt='' src={`./poster-placeholder.jpg`} />
            }
            </div>
            <div className='thing__details-container'>
                <h2 className='thing__name'>{thing.name}</h2>

                <span className='thing__labels'>
                    {Object.entries(thing.labels).map(([k,v], i) => <KLabel key={i} k={k} v={v}></KLabel>)}
                </span>

                <p className='thing__notes' dangerouslySetInnerHTML={{__html:thing.notesHtml}}></p>
            </div>
        </article>
    );
})
