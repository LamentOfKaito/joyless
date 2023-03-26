import getYtsPoster from "./posters/getYtsPoster";
import getTmbdPoster from './posters/getTmbdPoster';
import getMalPoster from './posters/getMalPoster';

(async function testGetPosters() {
    // The Shining
    console.log(await getYtsPoster('tt0081505'));

    // ---

    // Electric Dreams
    console.log(await getTmbdPoster('tt5711280'));
    // Mortal Engines
    console.log(await getTmbdPoster('tt1571234'));
    
    // ---

    // Cyberpunk: Edgerunners
    console.log(await getMalPoster('anime', '42310'));
    // Ajin
    console.log(await getMalPoster('manga', '49865'));
})();
