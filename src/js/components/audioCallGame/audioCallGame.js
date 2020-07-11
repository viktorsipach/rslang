import renderStartPage from './renderStartPage';
import StatisticsAPI from '../../API/statisticsAPI';
import renderSwitch from '../gameSwitcher/renderSwitch';
import { renderDropdown, renderGamePage } from './renderGamePage';
import { getRoundData } from '../../API/dataAPI';
import { getPartSpeech } from './partOfSpeech';
import { statisticsWords } from './statistics';
import UserSettingsMiniGame from '../../API/userSettingsMiniGameAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';

const arrTrueAnswer = [];
const arrFalseAnswer = [];
const reserveArr = ['больница', 'дверь', 'команда', 'нога', 'животное', 'оплата', 'компромисс', 'невинность', 'скорость', 'бремя'];
const progressStep = 5;
let option = true;
let arrAllWordsOption = [];
let myDataWords = [];
let numberWordCount = 0;
let levelGame = 1;
let roundGame = 1;
let progressHeight = 0;
let progressWidth = 0;
let switchOption = false;
let checkCheckBox = true;

function progressBar(height, width) {
  const bodyGame = document.querySelector('.game-progress');
  const progressBarTop = document.querySelector('.game__progress');

  bodyGame.style.transition = '0.6s';
  bodyGame.style.height = `${height}%`;

  progressBarTop.style.transition = '0.6s';
  progressBarTop.style.width = `${width}%`;
}

function clearAnswers() {
  arrTrueAnswer.length = 0;
  arrFalseAnswer.length = 0;
}

function optionAnswer(event, wordRus, wordEn, optionSound) {
  const gameBtn = document.querySelector('.game .game__btn.button');
  const getWordRus = event.target.parentElement;
  const getWordRusText = getWordRus.lastElementChild.outerText;
  const allWords = document.querySelectorAll('.words__item');
  const gameActive = document.querySelector('.game');

  option = optionSound;

  gameActive.classList.add('active');

  if (getWordRusText === wordRus) {
    arrTrueAnswer.push(wordEn);
    
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
    arrFalseAnswer.push(wordEn);

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
  progressHeight += progressStep;
  progressWidth += progressStep;
  progressBar(progressHeight, progressWidth);
}

function getWords(newArrObjectWords) {
  const numberOfRound = 20;
  const objectGameWords = [];
  for (let i = 0; i < numberOfRound; i += 1) {
    objectGameWords.push(newArrObjectWords[i]);
  }
  return objectGameWords;
}

function shuffleWords (array) {
  array.sort(() => Math.random() - 0.5);
}

function optionAnswerKeyPress(wordRus, wordEn, optionSound, wordText) {
  const gameBtn = document.querySelector('.game .game__btn.button');
  const allWords = document.querySelectorAll('.words__item');
  const gameActive = document.querySelector('.game');

  option = optionSound;

  gameActive.classList.add('active');

  if (wordText.outerText === wordRus) {
    arrTrueAnswer.push(wordEn);
    
    const audioElement = new Audio('../../../assets/audio/correct.mp3');

    if (option) {
      audioElement.play();
    }
    
    allWords.forEach(e => {
      e.classList.remove('true');
      e.classList.add('false');
      e.style.transition = '0.2s';
    });
    wordText.parentNode.classList.remove('false');
    wordText.parentNode.classList.add('true');
  } else {
    arrFalseAnswer.push(wordEn);

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
    wordText.parentNode.classList.add('line-through');
  }
  gameBtn.innerText = 'Далее';
  progressHeight += progressStep;
  progressWidth += progressStep;
  progressBar(progressHeight, progressWidth);
}

function keyPressCheck(event) {
  const wordEn = document.querySelector('.game__word').outerText;
  const wordRus = document.querySelector('.game__word_rus').outerText;
  const gameNumber = document.querySelectorAll('.words__item');
  const keyPress = event.key;
  const soundImg = document.querySelector('.game__iconSound');
  const gameBtn = document.querySelector('.game .game__btn.button');
  const game = document.querySelector('.game_audioCall');

  if (option) {
    soundImg.classList.remove('active');
  } else {
    soundImg.classList.add('active');
  }

  if (keyPress === 'Enter' && gameBtn.outerText === 'ДАЛЕЕ') {
    startGame(checkCheckBox);
  }

  if (!game.classList.contains('active')) {
    gameNumber.forEach(number => {
      if (number.firstChild.outerText === keyPress) {
        numberWordCount += 1;
        optionAnswerKeyPress(wordRus, wordEn, option, number.lastElementChild);
      } else if (keyPress === 'Enter' && gameBtn.outerText === 'НЕ ЗНАЮ') {
        optionAnswerKeyPress(wordRus, wordEn, option, gameBtn);
        numberWordCount += 1;
      }
    });
  }  
}

function pressKeyBoard() {
  document.addEventListener('keydown', keyPressCheck);
}

function removeListenerClose() {
  const close = document.querySelector('.close-btn');
  close.addEventListener('click', () => {
    document.removeEventListener('keydown', keyPressCheck);
  });
}

function setLevelAndRound(level, round) {
  document.getElementById('lvl-select').value = level;
  document.getElementById('rnd-select').value = round;
}

async function getUserSettings(nameGame) {
  const getSett = await UserSettingsMiniGame.getUserSettingsMiniGame(nameGame);
  levelGame = Number(getSett.level);
  roundGame = Number(getSett.round);

  await getDataAPI(levelGame, roundGame);
}

async function setUserSettings(nameGame, level, round) {
  await UserSettingsMiniGame.updateUserSettingsMiniGame(nameGame, level, round);
}

async function getUserDataForMiniGame(amountOfWords) {
  const FILTER_FOR_MINI_GAME_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
  const miniGameData = await getFilteredUserWords(FILTER_FOR_MINI_GAME_WORDS, amountOfWords);
  return miniGameData;
}

function checkCheckBoxOption() {
  numberWordCount = 0;
  progressHeight = 0;
  progressWidth = 0;
  clearAnswers();
  const checkCheckBoxBtn = document.querySelector('.game__audioCall_option-switch');
  if (checkCheckBoxBtn.checked) {
    checkCheckBox = true;
    startGame(checkCheckBox);
  } else {
    checkCheckBox = false;
    startGame(checkCheckBox);
  }
}

async function startGame(checkOptionCheckBox) {
  checkCheckBox = checkOptionCheckBox;
  let objectGameWords = [];
  let newArrObjectWords = [];
  const numberGameUserWords = 20;

  if (checkCheckBox && myDataWords.length > numberGameUserWords) {
    newArrObjectWords = myDataWords;
    shuffleWords(newArrObjectWords);
    objectGameWords = getWords(newArrObjectWords);
  } else {
    newArrObjectWords = arrAllWordsOption;
    objectGameWords = getWords(newArrObjectWords);
  }

  const nameGame = 'audiocall';

  getUserSettings(nameGame);

  if (numberWordCount === objectGameWords.length) {
    const numberRoundEnd = 30;
    const gameBtn = document.querySelector('.game .game__btn.button');
    gameBtn.innerText = 'Статистика';
    const result = `${arrTrueAnswer.length/objectGameWords.length * 100}%`;
    
    StatisticsAPI.miniGameStat(nameGame, result);
    statisticsWords(arrTrueAnswer, arrFalseAnswer);
    document.querySelector('.statistics-audioCall').classList.remove('modal-audioCall-hidden');
    document.querySelector('.modal__btn_audiocallGame').addEventListener('click', () => {
      clearAnswers();
      numberWordCount = 0;
      progressHeight = 0;
      progressWidth = 0;

      if (checkCheckBox) {
        startGame(checkCheckBox);
      } else {
        if (Number(roundGame) === numberRoundEnd) {
          levelGame += 1;
          roundGame = 0;
          setUserSettings(nameGame, levelGame, roundGame);
        }
      roundGame += 1;
      getDataSelectAPI(levelGame, roundGame);
      setUserSettings(nameGame, levelGame, roundGame);
      }
    });

  } else {
    const wordEn = objectGameWords[numberWordCount].word;
    const voiceEn = objectGameWords[numberWordCount].audio;
    const imageEn = objectGameWords[numberWordCount].image;
    const wordRus = objectGameWords[numberWordCount].wordTranslate;
    const wordPartSpeech = objectGameWords[numberWordCount].partOfSpeech;
    const endIndexWords = 4;
  
    let arrWordsRus = [];
  
    for (let i = 0; i < newArrObjectWords.length; i += 1) {
      if (wordPartSpeech === newArrObjectWords[i].partOfSpeech && wordRus !== newArrObjectWords[i].wordTranslate) {
        arrWordsRus.push(newArrObjectWords[i].wordTranslate);
      }
    }

    if (arrWordsRus.length < endIndexWords) {
      shuffleWords(reserveArr);
      reserveArr.forEach(e => arrWordsRus.push(e));
      arrWordsRus = arrWordsRus.slice(0, endIndexWords);
      shuffleWords(arrWordsRus);
    } else {
      shuffleWords(arrWordsRus);
      arrWordsRus = arrWordsRus.slice(0, endIndexWords);
    }

    arrWordsRus.push(wordRus);
    shuffleWords(arrWordsRus);
  
    document.querySelector('.game').remove();
    const pageContent = document.querySelector('.page');
    pageContent.append(renderGamePage(arrWordsRus, wordEn, voiceEn, imageEn, wordRus));
    pageContent.append(renderDropdown());
    
    if (!switchOption) {
      pageContent.append(renderSwitch());
      document.querySelector('.games-switcher').classList.add('game__audioCall_switch');
      document.querySelector('.game__audioCall_switch input').classList.add('game__audioCall_option-switch');
      switchOption = true;
    }

    if (myDataWords.length === 0) {
      const checkBoxOff = document.querySelector('.game__audioCall_option-switch');
      const title = document.querySelector('.games-switcher__title');
      title.innerText = 'У Вас нет слов';
      checkBoxOff.removeAttribute('checked');
      checkBoxOff.setAttribute('disabled', '');
      checkCheckBox = false;
    }

    if (checkCheckBox) {
      const numberLever = document.getElementById('lvl-select');
      const numberRound = document.getElementById('rnd-select');
      numberLever.setAttribute('disabled', '');
      numberRound.setAttribute('disabled', '');
    }

    progressBar(progressHeight, progressWidth);
    setLevelAndRound(levelGame, roundGame);
  
    const audioBtn = document.querySelector('.game__voice');
    const gameWords = document.querySelector('.game__words');
    const gameBtn = document.querySelector('.game .game__btn.button');
    const soundImg = document.querySelector('.game__iconSound');
    const checkCheckBoxBtn = document.querySelector('.game__audioCall_option-switch');
  
    if (option) {
      soundImg.classList.remove('active');
    } else {
      soundImg.classList.add('active');
    }

    checkCheckBoxBtn.addEventListener('click', checkCheckBoxOption);
  
    soundImg.addEventListener('click', (event) => {
      option = !option;
      event.target.classList.toggle('active');
    });
  
    audioBtn.addEventListener('click', () => {
      const audioElement = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${voiceEn}`);
      audioElement.play();
    });
  
    gameBtn.addEventListener('click', (event) => {
      if (event.target.outerText === 'НЕ ЗНАЮ') {
        optionAnswer(event, wordRus, wordEn, option);
        numberWordCount += 1;
      } else {
        startGame(checkCheckBox);
      }
    });
  
    gameWords.addEventListener('click', (event) => {
      if (event.target.parentElement.className === 'words__item') {
        numberWordCount += 1;
        optionAnswer(event, wordRus, wordEn, option);
      }
    });
  
    getLevelAndRound();
    pressKeyBoard();
    removeListenerClose();
  }
}

async function getPartOfSpeech(objectWords) {
  arrAllWordsOption = objectWords;
  const promises = [];

  if (objectWords) {
    objectWords.forEach((value, index) => {
      const wordCheck = objectWords[index].word;
      promises.push(getPartSpeech(wordCheck));
    });
    const wordsPartOfSpeech = await Promise.all(promises);
    if (wordsPartOfSpeech) {
      wordsPartOfSpeech.forEach((value, index) => {
        arrAllWordsOption[index].partOfSpeech = value[0].meanings[0].partOfSpeechCode;
      });
    }
  }
}

async function getDataAPI() {
  const level = levelGame;
  const round = roundGame;
  const wordsPerRound = 20;
  let data = [];

  data = await getRoundData(level, round, wordsPerRound);

  let objectWords = [];
  objectWords = data;

  getPartOfSpeech(objectWords);
}

async function getDataSelectAPI() {
  let level = levelGame;
  let round = roundGame;

  const wordsPerRound = 20;
  let data = [];

  level = Number(level) || 1;
  round = Number(round) || 1;
  data = await getRoundData(level, round, wordsPerRound);
  if (levelGame || roundGame ) setTimeout(startGame, 1000);

  let objectWords = [];
  objectWords = data;

  getPartOfSpeech(objectWords);
}

function getLevelAndRound() {
  const numberLever = document.getElementById('lvl-select');
  const numberRound = document.getElementById('rnd-select');
  const nameGame = 'audiocall';
  numberLever.onchange = () => {
    progressHeight = 0;
    progressWidth = 0;
    clearAnswers();
    numberWordCount = 0;
    levelGame = numberLever.value;
    getDataSelectAPI(levelGame, roundGame);
    setUserSettings(nameGame, levelGame, roundGame);
  }
  numberRound.onchange = () => {
    progressHeight = 0;
    progressWidth = 0;
    clearAnswers();
    numberWordCount = 0;
    roundGame = numberRound.value;
    getDataSelectAPI(levelGame, roundGame);
    setUserSettings(nameGame, levelGame, roundGame);
  }
}

export default async function initAudioCallGame() {
  const pageContent = document.querySelector('.page');
  const nameGame = 'audiocall';
  pageContent.append(renderStartPage());
  numberWordCount = 0;
  progressHeight = 0;
  progressWidth = 0;
  switchOption = false;
  checkCheckBox = true;
  myDataWords = await getUserDataForMiniGame(3600);
  myDataWords = myDataWords[0].paginatedResults;
  await getUserSettings(nameGame);
  clearAnswers();
  document.querySelector('.game__start').addEventListener('click', () => {
    startGame(checkCheckBox);
  });
}

export { getDataAPI }