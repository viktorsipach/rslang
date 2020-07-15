import renderSavannaStartPage from './renderSavannaStartPage';
import Image from '../../../assets/img/savanna/savanna-main1.jpg';
import { changeCheckBox, startGame, nameGame, level, round, savannaRound, generateHeader, changeLevelAndRound, changeUserWords } from './savannaGetRoundData';
import { preloader } from './savannaGameplay';

const initSavannaGame = () => {
    const page = document.querySelector('.page');
    const savanna = document.createElement('div');
    const savannaShortStatistics = document.createElement('div');
    const template = renderSavannaStartPage(); 

    savanna.className = 'savanna'; 
    savannaShortStatistics.className = 'savanna__short-statistics';

    savanna.append(template);

    page.innerHTML = '';
    page.append(savanna);
    page.append(savannaShortStatistics); 

    const start = document.querySelector('.button__savanna');

    start.addEventListener('click', () => {
        savanna.style.cssText = `background: linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
        savanna.innerHTML = '';        
        generateHeader();
        changeUserWords();
        savannaRound(0, level, round, startGame, changeCheckBox);
        changeLevelAndRound();
        preloader();
    })
    
}

export default initSavannaGame;