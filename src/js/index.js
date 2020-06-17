import '../css/reset.css';
import '../scss/style.scss';
import initAudioCallGame from './components/audioCallGame/audioCallGame';
import initPuzzleGame from './components/puzzleGame/puzzleGame';
import testDataAPI from './API/testGetRoundData';
import menuHandler from './components/header.components';
import initSavannaGame from './components/savannaGame/savannaGame';

console.log('Hello');
initPuzzleGame();
initAudioCallGame();

menuHandler();



initSavannaGame();
testDataAPI();
