import renderStartPage from './renderStartPage';
import renderMainPage from './renderMainPage';
import Game from './Game';
import { checkActiveHints } from './utils';

export default function initPuzzleGame() {
  

  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderStartPage());

  document.querySelector('.start__button').addEventListener('click', () => {
    PAGECONTAINER.innerHTML = '';
    PAGECONTAINER.append(renderMainPage());
    
    const level = 1;
    const round = 1;

    const game = new Game( { level, round });
    game.startNewLevelRound();


    // click events
    document.querySelector('.game__puzzle').addEventListener('click', (event) => {
      const SELECTLEVELOPTION = document.getElementById('selectLevel');
      const SELECTROUNDOPTION = document.getElementById('selectRound');
 
      if (event.target.closest('.select__round')) {
        game.round = parseInt(SELECTROUNDOPTION.value, 10);
        game.startCurrentLevelRound();
      }
      if (event.target.closest('.select__level')) {
        game.level = parseInt(SELECTLEVELOPTION.value, 10);
        game.round = 1;
        game.startNewLevelRound();
      }

      if (event.target.closest('.menu__button.auto-pronunciation')) {
        if (localStorage.getItem('autoPronunciation') === 'true') {
          localStorage.setItem('autoPronunciation', 'false');
        } else {
          localStorage.setItem('autoPronunciation', 'true');
        }
      } else if (event.target.closest('.menu__button.translation')) {
        if (localStorage.getItem('translation') === 'true') {
          localStorage.setItem('translation', 'false');
        } else {
          localStorage.setItem('translation', 'true');
        }
      } else if (event.target.closest('.menu__button.sentence-pronunciation')) {
        if (localStorage.getItem('sentencePronunciation') === 'true') {
          localStorage.setItem('sentencePronunciation', 'false');
        } else {
          localStorage.setItem('sentencePronunciation', 'true');
        }
      } else if (event.target.closest('.menu__button.bck-image')) {
        if (localStorage.getItem('bckImage') === 'true') {
          localStorage.setItem('bckImage', 'false');
        } else {
          localStorage.setItem('bckImage', 'true');
        }
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
          if (game.currentSentenceNumber < 10) {
            game.startSentence();
          } else if (game.round < game.roundsInLevel) {
            game.round += 1;
            SELECTROUNDOPTION.value = game.round;
            game.startCurrentLevelRound();
          } else if (game.level < 6) {
            game.level += 1;
            game.round = 1;
            SELECTLEVELOPTION.value = game.level;
            SELECTROUNDOPTION.value = game.round;
            game.startNewLevelRound();
          } else {
            document.querySelector('.hints__sentence').textContent = 'Congratulations! You have completed all levels!';
            game.isFinished = true;
          }
        }
      } else if (event.target.classList.contains('results') && event.target.classList.contains('puzzleGame__button')) {
        game.showRoundStatistic();
        
        document.querySelector('.puzzle__statistic').addEventListener('click', (eventStatisticPage) => {
          if (eventStatisticPage.target.classList.contains('continue')) {
            const statisticElement = document.querySelector('.puzzle__statistic');
            statisticElement.parentNode.removeChild(statisticElement);

            if (game.round < game.roundsInLevel) {
              game.round += 1;
              SELECTROUNDOPTION.value = game.round;
              game.startCurrentLevelRound();
            } else if (game.level < 6) {
              game.level += 1;
              game.round = 1;
              SELECTLEVELOPTION.value = game.level;
              SELECTROUNDOPTION.value = game.round;
              game.startNewLevelRound();
            } else {
              document.querySelector('.hints__sentence').textContent = 'CONGRATULATIONS! You have completed all levels!';
              game.isFinished = true;
            }
          }
        });
        
        // if (game.round < game.roundsInLevel) {
        //   game.round += 1;
        //   SELECTROUNDOPTION.value = game.round;
        //   game.startCurrentLevelRound();
        // } else if (game.level < 6) {
        //   game.level += 1;
        //   game.round = 1;
        //   SELECTLEVELOPTION.value = game.level;
        //   SELECTROUNDOPTION.value = game.round;
        //   game.startNewLevelRound();
        // } else {
        //   document.querySelector('.hints__sentence').textContent = 'CONGRATULATIONS! You have completed all levels!';
        //   game.isFinished = true;
        // }
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