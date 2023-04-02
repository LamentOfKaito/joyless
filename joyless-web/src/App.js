import './App.css';
import {useEffect, useRef, useState} from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import useUrlState from '@ahooksjs/use-url-state'
import lunr from 'lunr';

import KThing from './components/KThing'

/**
 * 
 * @param {lunr.Index} idx 
 * @param {string} query 
 * @param {Array<Object>} things 
 * @returns {Array<Object>}
 */
function searchThings(idx, query, things) {
    if (!idx || !query) {
      return things;
    } else {
      try {
        const ids = idx.search(query).map(lunrResult => lunrResult.ref);
        const result = things.filter(thing => ids.includes(thing.id));
        return result;  
      } catch (e) {
        return things;
      }
    }
}

function App() {
  const searchRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [things, setThings] = useState([]);
  const [lunrIndex, setLunrIndex] = useState(null);
  const [meta, setMeta] = useState(null);

  const [urlState, setUrlState] = useUrlState({q: ''});
  const query = urlState.q;

  useEffect(function onLoad(){
    searchRef.current.focus();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const fetchedThings = await fetch('joyless.things.json').then(res => res.json());
      setThings(fetchedThings);
  
      const fetchedIndex = await fetch('joyless.lunr.json').then(res => res.json());
      const idx = lunr.Index.load(fetchedIndex);
      setLunrIndex(idx);
 
      fetch('joyless.meta.json').then(res => res.json()).then(x => setMeta(x));

      setLoaded(true);
    }
    fetchData();
  }, []);

  // TODO: Add useMemo?
  const filteredThings = searchThings(lunrIndex, query, things);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className='title'>Kaito's Joyless junk</h1>
        <p className="subtitle" style={{visibility: meta?.updatedOn ? 'visible' : 'hidden' }} >
          Last updated: {meta?.updatedOn}
        </p>
        <div className="searchbar">
            <input type="search" placeholder="Unicorn is:film opinion:liked opinion:loved"
                ref={searchRef}
                value={query}
                onChange={event => setUrlState({q: event.target.value})}
                />
        </div>
      </header>

      <main>
        {loaded ?
          <ul>
            {
              filteredThings.map(thing => <li key={thing.id}><KThing thing={thing}></KThing></li>)
            }
          </ul>
          :
          <div className='loader'>Loading...</div>
          
        }
      </main>
    </div>
  );
}

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
