import Game from './Game';
import renderStartPage from './renderStartPage';
import renderMainPage from './renderMainPage';
import { checkActiveHints, checkLocalStorageItem } from './utils';
import userSettingsMiniGame from '../../API/userSettingsMiniGameAPI';

let game;

async function startGame() {
  const gameName = 'puzzle';
  const gameProgress = await userSettingsMiniGame.getUserSettingsMiniGame(gameName);
  const {level} = gameProgress;
  const {round} = gameProgress;
  game = new Game( { level, round });
  game.startNewLevelRound();
}

export default function initPuzzleGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderStartPage());


  document.querySelector('.start__button').addEventListener('click', () => {
    PAGECONTAINER.innerHTML = '';
    PAGECONTAINER.append(renderMainPage());
    const SELECTLEVELOPTION = document.getElementById('selectLevel');
    const SELECTROUNDOPTION = document.getElementById('selectRound');
    startGame();

    // change events
    document.querySelector('.menu__left').addEventListener('change', (event) => {
      if (event.target.closest('.select__round')) {
        game.round = parseInt(SELECTROUNDOPTION.value, 10);
        game.startCurrentLevelRound();
      }
      if (event.target.closest('.select__level')) {
        game.level = parseInt(SELECTLEVELOPTION.value, 10);
        game.round = 1;
        game.startNewLevelRound();
      }
    });

    // click events
    document.querySelector('.game__puzzle').addEventListener('click', (event) => {
      if (event.target.closest('.menu__button.auto-pronunciation')) {
        checkLocalStorageItem('autoPronunciation');
      } else if (event.target.closest('.menu__button.translation')) {
        checkLocalStorageItem('translation');
      } else if (event.target.closest('.menu__button.sentence-pronunciation')) {
        checkLocalStorageItem('sentencePronunciation');
      } else if (event.target.closest('.menu__button.bck-image')) {
        checkLocalStorageItem('bckImage');
      }
      checkActiveHints();

      if (event.target.closest('.data__sentence') && event.target.closest('.data__word')) {
        let element = event.target;
        if (element.classList.contains('left') || element.classList.contains('right') || element.classList.contains('text')) {
          element = event.target.parentNode;
        }
        document.querySelector('.result__sentence.current').append(element);
      } else if (event.target.closest('.result__sentence') && event.target.closest('.data__word')) {
        let element = event.target;
        if (element.classList.contains('left') || element.classList.contains('right') || element.classList.contains('text')) {
          element = event.target.parentNode;
        }
        document.querySelector('.data__sentence').append(element);
      } else if (event.target.classList.contains('dontKnow')) {
        game.buildCurrentSentence();
      } else if (event.target.classList.contains('check')) {
        game.checkCurrentSentence();
      } else if (event.target.classList.contains('continue')) {
        if (!game.isFinished) {
          if (game.currentSentenceNumber < game.wordsPerRound) {
            game.startSentence();
          } else {
            game.sendLongTermStatistics();
            game.updateLevelRound();
            game.sendLevelRoundInfo();
            game.checkGameProgress();
          }
        }
      } else if (event.target.classList.contains('results') && event.target.classList.contains('puzzleGame__button')) {
        game.sendLongTermStatistics();
        game.showRoundStatistic();
        
        document.querySelector('.puzzle__statistic').addEventListener('click', (eventStatisticPage) => {
          if (eventStatisticPage.target.classList.contains('continue')) {
            const statisticElement = document.querySelector('.puzzle__statistic');
            statisticElement.parentNode.removeChild(statisticElement);
            if (!game.isFinished) {
              game.updateLevelRound();
              game.sendLevelRoundInfo();
              game.checkGameProgress();
            }
          }
        });
      }

      if (event.target.classList.contains('icon__sound')) {
        if (document.querySelector('.menu__button.sentence-pronunciation').classList.contains('active')) {
          game.pronounceCurrentSentence();
        }
      }
      game.checkGameStatus();
    });

    // drag events
    document.ondragstart = function onDragStart(event) {
      event.dataTransfer.setData('text/plain', event.target.dataset.word);
      if (event.target.parentNode.classList.contains('result__sentence')) {
        event.dataTransfer.setData('text/container', 'result__sentence');
      } else if (event.target.parentNode.classList.contains('data__sentence')) {
        event.dataTransfer.setData('text/container', 'data__sentence');
      }  
    };

    document.ondragover = function onDragOver(event) {
      event.preventDefault();
      const element = event.target;
      const wordElements = document.querySelectorAll('.result__sentence.current>.word-container');
      wordElements.forEach((el) => el.classList.remove('dragOver'));
      if (element.classList.contains('word-container') && element.closest('.result__sentence.current')) {
        element.classList.add('dragOver');
      }  else if (element.classList.contains('left') || element.classList.contains('right') || element.classList.contains('text')) {
        if (element.closest('.result__sentence.current')) {
          element.parentElement.classList.add('dragOver');
        }
      }      
    };

    document.ondrop = function onDrop(event) {
      event.preventDefault();
      const element = event.target;
      const dataElement = event.dataTransfer.getData('text/plain');
      const dataContainer = event.dataTransfer.getData('text/container');
      let dropEndElement;
      let dropStartElement;
      if (element.closest('.result__sentence.current')) {
        if (dataContainer === 'result__sentence') {
          dropStartElement = document.querySelector(`.result__sentence.current>[data-word=${dataElement}]`);  
        } else if (dataContainer === 'data__sentence') {
          dropStartElement = document.querySelector(`.data__sentence>[data-word=${dataElement}]`);
        }
        if (element.classList.contains('data__word')) {
          dropEndElement = element.parentNode; 
          const siblingElement = element;
          dropEndElement.insertBefore(dropStartElement,  siblingElement);
          siblingElement.classList.remove('dragOver');
        } else if (element.classList.contains('left') || element.classList.contains('right') || element.classList.contains('text')) {
          dropEndElement = element.parentNode.parentNode; 
          const siblingElement = element.parentElement;
          dropEndElement.insertBefore(dropStartElement,  siblingElement);
          siblingElement.classList.remove('dragOver');
        } else {
          dropEndElement = event.target;
          dropEndElement.append(dropStartElement);
        }
      }
      game.checkGameStatus();
    };
  });
}