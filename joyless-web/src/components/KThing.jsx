import {memo} from 'react'

import KLabel from './KLabel'
import './KThing.css'

export default memo(function KThing({thing}) {
    const todoModifier = thing.checked ? '' : 'kthing--todo';

    return (
        <article id={thing.id} className={`kthing ${todoModifier}`}>
            <div className='kthing__right'>
            {thing.poster ?
                    // Lazy loading.
                    <img className='kthing__poster' alt='' loading='lazy' src={`./posters/${thing.poster}`} />
                    :
                    <img className='kthing__poster' alt='' src={`./poster-placeholder.jpg`} />
            }
            </div>
            <div className='kthing__left'>
                <h2 className='kthing__name'>{thing.name}</h2>

                <span className='kthing__labels'>
                    {Object.entries(thing.labels).map(([k,v], i) => <KLabel key={i} k={k} v={v}></KLabel>)}
                </span>

                <p className='kthing__notes' dangerouslySetInnerHTML={{__html:thing.notesHtml}}></p>
            </div>
        </article>
    );
})
