import '../css/reset.css';
import '../scss/style.scss';
import FindWordsGame from './components/findWords/findWordsGame';
import initAudioCallGame from './components/audioCallGame/audioCallGame';
import initPuzzleGame from './components/puzzleGame/puzzleGame';
import testDataAPI from './API/testGetRoundData';
import initApp from './components/app/app.components';

const findWordsGame = new FindWordsGame();
findWordsGame.initFindWordsGame();

console.log('Hello');
// initPuzzleGame();
// initAudioCallGame();

// menuHandler();
initApp()

testDataAPI();
