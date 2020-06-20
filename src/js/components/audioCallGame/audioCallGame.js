import renderStartPage from './renderStartPage';
import renderGamePage from './renderGamePage';
import { getRoundData } from '../../API/dataAPI';

function randomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function optionAnswer(event, wordRus) {
  const gameBtn = document.querySelector('.game .game__btn.button')
  const getWordRus = event.target.parentElement;
  const getWordRusText = getWordRus.lastElementChild.outerText;
  const allWords = document.querySelectorAll('.words__item');
  const gameActive = document.querySelector('.game');
  gameActive.classList.add('active');

  if (getWordRusText === wordRus) {
    const audioElement = new Audio('../../../assets/audio/correct.mp3');
    audioElement.play();
    allWords.forEach(e => {
      e.classList.remove('true');
      e.classList.add('false');
      e.style.transition = '0.2s';
    });
    getWordRus.classList.remove('false');
    getWordRus.classList.add('true');
  } else {
    const audioElement = new Audio('../../../assets/audio/error.mp3');
    audioElement.play();
    allWords.forEach(e => {
      e.classList.add('false');
      e.style.transition = '0.2s';
      if (wordRus === e.lastElementChild.outerText) {
        e.classList.add('true');
      }
    });
    getWordRus.classList.add('line-through');
  }
  gameBtn.innerText = '=>';
}

function startGame(arrWordsRus, wordEn, voiceEn, imageEn, wordRus) {
  document.querySelector('.game').remove();
  const pageContent = document.querySelector('.page');
  pageContent.append(renderGamePage(arrWordsRus, wordEn, voiceEn, imageEn));

  const audioBtn = document.querySelector('.game__voice');
  const gameWords = document.querySelector('.game__words');
  const gameBtn = document.querySelector('.game .game__btn.button');

  audioBtn.addEventListener('click', () => {
    const audioElement = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${voiceEn}`);
    audioElement.play();
  });

  gameBtn.addEventListener('click', (event) => {
    if (event.target.outerText === 'НЕ ЗНАЮ') {
      optionAnswer(event, wordRus);
    }
  });

  gameWords.addEventListener('click', (event) => {
    if (event.target.parentElement.className === 'words__item') {
      optionAnswer(event, wordRus);
    }
  });
}

async function getDataAPI() {
  const level = 1;
  const round = 1;
  const wordsPerRound = 5;
  const data = await getRoundData(level, round, wordsPerRound);

  const numberIndex = randomNumber(0, 4);
  const wordEn = data[numberIndex].word;
  const voiceEn = data[numberIndex].audio;
  const imageEn = data[numberIndex].image;
  const wordRus = data[numberIndex].wordTranslate;

  const arrWordsRus = [];
  for (let i = 0; i < 5; i += 1 ) {
    arrWordsRus.push(data[i].wordTranslate);
  }
  startGame(arrWordsRus, wordEn, voiceEn, imageEn, wordRus);
}

export default function initAudioCallGame() {
  const pageContent = document.querySelector('.page');
  pageContent.append(renderStartPage());
  document.querySelector('.game__start').addEventListener('click', getDataAPI);
}