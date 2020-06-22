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

      if (event.target.closest('.data__sentence') && event.target.classList.contains('data__word')) {
        document.querySelector('.result__sentence>.word-container:empty').append(event.target);
      } else if (event.target.closest('.result__sentence') && event.target.classList.contains('data__word')) {
        document.querySelector('.data__sentence>.word-container:empty').append(event.target);
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
      } else if (event.target.classList.contains('results') && event.target.classList.contains('game__button')) {
        game.showRoundStatistic();
        
        document.querySelector('.puzzle__statistic').addEventListener('click', (eventStatisticPage) => {
          if (eventStatisticPage.target.classList.contains('continue')) {
            const statisticElement = document.querySelector('.puzzle__statistic');
            statisticElement.parentNode.removeChild(statisticElement);
          }
        });
        
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
    };

    document.ondragover = function onDragOver(event) {
      event.preventDefault();
      const elements = document.querySelectorAll('.result__sentence.current>.word-container');
      elements.forEach((el) => el.classList.remove('dragOver'));
      if (event.target.classList.contains('word-container') && event.target.closest('.result__sentence.current')) {
        event.target.classList.add('dragOver');
      } else if (event.target.classList.contains('data__word') && event.target.closest('.result__sentence.current')) {
        event.target.parentElement.classList.add('dragOver');
      }
    };

    document.ondrop = function onDrop(event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      const dropStartElement = document.querySelector(`[data-word=${data}]`);
      const dropStartContainer = dropStartElement.parentElement;
      const dropEndElement = event.target;
      if (event.target.classList.contains('word-container') && event.target.closest('.result__sentence')) {
        dropEndElement.append(dropStartElement);
        dropEndElement.classList.remove('dragOver');
      } else if (event.target.classList.contains('data__word') && event.target.closest('.result__sentence')) {
        const dropEndContainer = dropEndElement.parentElement;
        dropEndContainer.append(dropStartElement);
        dropStartContainer.append(dropEndElement);
        dropEndContainer.classList.remove('dragOver');
      }
      game.checkGameStatus();
    };
  });
}