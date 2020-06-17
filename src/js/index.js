import '../css/reset.css';
import '../scss/style.scss';
import initAudioCallGame from './components/audioCallGame/audioCallGame';
import initPuzzleGame from './components/puzzleGame/puzzleGame';
import menuHandler from './components/header.components';



console.log('Hello');
initPuzzleGame();
menuHandler()
initAudioCallGame();

