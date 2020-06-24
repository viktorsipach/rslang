import renderStartPage from './renderStartPage';
import renderGamePage from './renderGamePage';
import { getRoundData } from '../../API/dataAPI';
import { getPartSpeech } from './partOfSpeech';

let option = true;

function randomNumber(min, max) {
  const num = 10;
  const rand = min + Math.random() * (max + num - min);
  return Math.floor(rand);
}

function optionAnswer(event, wordRus, optionSound) {
  const gameBtn = document.querySelector('.game .game__btn.button')
  const getWordRus = event.target.parentElement;
  const getWordRusText = getWordRus.lastElementChild.outerText;
  const allWords = document.querySelectorAll('.words__item');
  const gameActive = document.querySelector('.game');
  option = optionSound;

  gameActive.classList.add('active');

  if (getWordRusText === wordRus) {
    const audioElement = new Audio('../../../assets/audio/correct.mp3');

    if (option) {
      audioElement.play();
    }
    
    allWords.forEach(e => {
      e.classList.remove('true');
      e.classList.add('false');
      e.style.transition = '0.2s';
    });
    getWordRus.classList.remove('false');
    getWordRus.classList.add('true');
  } else {
    const audioElement = new Audio('../../../assets/audio/error.mp3');

    if (option) {
      audioElement.play();
    }

    allWords.forEach(e => {
      e.classList.add('false');
      e.style.transition = '0.2s';
      if (wordRus === e.lastElementChild.outerText) {
        e.classList.add('true');
      }
    });
    getWordRus.classList.add('line-through');
  }
  gameBtn.innerText = 'Далее';
}

function startGame(arrWordsRus, wordEn, voiceEn, imageEn, wordRus) {
  document.querySelector('.game').remove();
  const pageContent = document.querySelector('.page');
  pageContent.append(renderGamePage(arrWordsRus, wordEn, voiceEn, imageEn, wordRus));

  const audioBtn = document.querySelector('.game__voice');
  const gameWords = document.querySelector('.game__words');
  const gameBtn = document.querySelector('.game .game__btn.button');
  const soundImg = document.querySelector('.game__iconSound');

  if (option) {
    soundImg.classList.remove('active');
  } else {
    soundImg.classList.add('active');
  }

  soundImg.addEventListener('click', (event) => {
    if (option) {
      option = false;
    } else {
      option = true;
    }
    event.target.classList.toggle('active');
});

  audioBtn.addEventListener('click', () => {
    const audioElement = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${voiceEn}`);
    audioElement.play();
  });

  gameBtn.addEventListener('click', (event) => {
    if (event.target.outerText === 'НЕ ЗНАЮ') {
      optionAnswer(event, wordRus, option);
    } else {
      getDataAPI();
    }
  });

  gameWords.addEventListener('click', (event) => {
    if (event.target.parentElement.className === 'words__item') {
      optionAnswer(event, wordRus, option);
    }
  });
}

async function getDataAPI() {
  const level = 1;
  const round = 1;
  const wordsPerRound = 150;
  const data = await getRoundData(level, round, wordsPerRound);

  const numberIndex = randomNumber(0, wordsPerRound);
  const wordEn = data[numberIndex].word;
  const voiceEn = data[numberIndex].audio;
  const imageEn = data[numberIndex].image;
  const wordRus = data[numberIndex].wordTranslate;

  const dataTest = await getPartSpeech(wordEn);
  const partOfSpeechEnWord = dataTest[0].meanings[0].partOfSpeechCode;

  const arrWordsRus = [];
  
  const promises = [];

  if (data) {
    data.forEach((value, index) => {
      const wordCheck = data[index].word;
      promises.push(getPartSpeech(wordCheck));
    });
    const wordsPartOfSpeech = await Promise.all(promises);
    if (wordsPartOfSpeech) {
      wordsPartOfSpeech.forEach(e => {
        if (partOfSpeechEnWord === e[0].meanings[0].partOfSpeechCode) {
          if (wordRus !== e[0].meanings[0].translation.text) {
            arrWordsRus.push(e[0].meanings[0].translation.text);
          }
        }
      });
    }
  }
  startGame(arrWordsRus, wordEn, voiceEn, imageEn, wordRus);
}

export default function initAudioCallGame() {
  const pageContent = document.querySelector('.page');
  pageContent.append(renderStartPage());
  document.querySelector('.game__start').addEventListener('click', getDataAPI);
}