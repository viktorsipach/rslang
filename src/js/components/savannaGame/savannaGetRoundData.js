import { initMainPage, removeActiveClassNav }  from '../mainPage/mainPage.component'
import { getRoundData } from '../../API/dataAPI';
import Image from '../../../assets/img/savanna/savanna-main1.jpg';
import RenderSavannaMainPage from './renderSavannaMainPage';
import renderSwitch from '../gameSwitcher/renderSwitch';
import { startColorGreen, startColorBlue, startColorRed, countHealth, fallWord, savannaHealth, newStart, savannaGameplayMouse, preloader, playSoundGame } from './savannaGameplay';
import UserSettingsMiniGame from '../../API/userSettingsMiniGameAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';

const maxlevels = 6;
const maxRoundsPerLevel = 30;
let changeLevel = false;
let level = 1;
let round = 1;
const nameGame = 'savanna';
let startGame = true;
let changeCheckBox = true;
let userWords = true;
const wordsPerRound = 20;
const timeToFallWord = 2950;

async function savannaRoundDataAPI(level, round) {
  // const wordsPerRound = 20;
  const data = await getRoundData(level, round, wordsPerRound);
  return data; 
}

async function getUserDataForMiniGame(amountOfWords) {
  const FILTER_FOR_MINI_GAME_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
  const miniGameData = await getFilteredUserWords(FILTER_FOR_MINI_GAME_WORDS, amountOfWords);
  return miniGameData;
}

const setLevelAndRound = (level, round) => {
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');
  selectLevel.value = level;
  selectRound.value = round;
}

const disabledLevelAndRound = (change) => {
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');
  if (change) {
    selectLevel.setAttribute('disabled', '');
    selectRound.setAttribute('disabled', '');
  } else {
    selectLevel.removeAttribute('disabled');
    selectRound.removeAttribute('disabled');
  }
  
}

async function getUserSettings(nameGame) {
  const getSett = await UserSettingsMiniGame.getUserSettingsMiniGame(nameGame);
  level = Number(getSett.level);
  round = Number(getSett.round);

  const data = await savannaRoundDataAPI(level, round);
  setLevelAndRound(level, round);
  return data;
}

async function setUserSettings(nameGame, level, round) {
  await UserSettingsMiniGame.updateUserSettingsMiniGame(nameGame, level, round);
}

const getRandomTranslateAnswer = (data, ind) => {
  const arrTranslate = [];
  data.forEach(el => {
    arrTranslate.push(el.wordTranslate);
  })

  let randomAnswer = arrTranslate.sort(() => .5 - Math.random()).slice(0,4);

  if (randomAnswer.indexOf(data[ind].wordTranslate) !== -1) {
    return randomAnswer;
  } else {
    randomAnswer.splice(0,1);
    randomAnswer.splice(0,0,data[ind].wordTranslate);
    randomAnswer = randomAnswer.sort(() => .5 - Math.random());
  }
  return randomAnswer;
}  

const generateHeader = () => {
  const templateHeader = new RenderSavannaMainPage();
  const savanna = document.querySelector('.savanna');
  savanna.innerHTML = '';
  savanna.append(templateHeader.renderHeader());

  playSoundGame();

  const selectLevels = document.querySelector('#selectLevel');
  const selectRounds = document.querySelector('#selectRound');
  const frLevel = document.createDocumentFragment();
  const savannaCheck = document.querySelector('.savanna__hints');
  for (let i = 1; i <= maxlevels; i += 1) {
    const optLev = document.createElement('option');
    optLev.value = i;
    optLev.textContent = i;
    frLevel.append(optLev);
  }
  selectLevels.innerHTML = '';
  selectLevels.append(frLevel);

  const frRound = document.createDocumentFragment();
  for (let i = 1; i <= maxRoundsPerLevel; i += 1) {
    const optRou = document.createElement('option');
    optRou.value = i;
    optRou.textContent = i;
    frRound.append(optRou);
  }
  selectRounds.innerHTML = '';
  selectRounds.append(frRound);
  savannaCheck.after(renderSwitch());
  document.querySelector('.games-switcher').classList.add('savanna-switcher');
  document.querySelector('.games-switcher__title').classList.add('savanna-switcher__title');
  document.querySelector('.games-switcher__title').textContent = 'выберите играть в мои слова';
  document.querySelector('.switch').classList.add('savanna-switch');
  document.querySelector('.slider').classList.add('savanna-slider');
  startGame = true;
  changeCheckBox = true;
  disabledLevelAndRound(changeCheckBox);
}

const generateTemplateMain = (words, idx) => {
  let resultTranslateAnswer = getRandomTranslateAnswer(words, idx);
  const templateMain = new RenderSavannaMainPage(words[idx].word, words[idx].wordTranslate, resultTranslateAnswer);
  const savannaPlay = document.querySelector('.savanna__play');
  savannaPlay.innerHTML = '';
  savannaPlay.append(templateMain.renderMain());
}

const generateWordsRound = (data) => {
  let roundWords = [];
  data.forEach(elem => {
    roundWords.push(new RenderSavannaMainPage(elem.word, elem.wordTranslate))
  })
  return roundWords;
}

const RenderSavannaShortStatistic = (words) => {
  const savanna = document.querySelector('.savanna');
  const savannaShortStatistics = document.querySelector('.savanna__short-statistics');
  const numberRoundEnd = 30;
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');

  savannaShortStatistics.innerHTML = `
  <div class="savanna__total">
    <p>Error: <span class="savanna__error">20</span></p>
    <p>Correct: <span class="savanna__correct">0</span></p>
  </div>
  <div class="savanna__words"></div>
  <div class="savanna__action">
    <button class="button savanna__btn" id="savanna__further">продолжить тренировку</button>
    <button class="button savanna__btn" id="savanna__close">выход</button>
  </div>
  `;
  
  const savannaWords = document.querySelector('.savanna__words');

  generateWordsRound(words).forEach(el => {
    savannaWords.append(el.renderResults());
  });
  
  document.querySelector('#savanna__further').addEventListener('click', () => { 
    if (Number(round) === numberRoundEnd) {
      level += 1;
      round = 1;
      setUserSettings(nameGame, level, round);
    }
    round += 1;
    setUserSettings(nameGame, level, round);
    selectLevel.value = `${level}`;
    selectRound.value = `${round}`;
    changeLevel = true;
    newStart();
    preloader();
    savannaRound(0, level, round, startGame, changeCheckBox);
    savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
  }); 
  const closeBtn = document.querySelector('#savanna__close');
  closeBtn.addEventListener('click', () => {
    setUserSettings(nameGame, level, round);
    removeActiveClassNav();
    initMainPage();
  })
}

async function savannaRound(index, lev, rou, start, changeSwitch) {
  let data = [];
  if (changeSwitch) {
    let dataAPI = await getUserDataForMiniGame(3600);
    if (dataAPI[0].paginatedResults.length < wordsPerRound) {
      userWords = true;
      const savannaPlay = document.querySelector('.savanna__play');
      savannaPlay.innerHTML = '<span class="savanna__play_title">У вас не достаточно изученных слов для игры. Нажмите на кнопку "мои слова" и выберите уровень и раунд.</span>';
    } else {
      data = dataAPI[0].paginatedResults.sort(() => 0.5 - Math.random()).slice(0,20);
      changeLevel = false;
      userWords = false;
      generateTemplateMain(data, index);
      savannaHealth(countHealth);
      setTimeout(() => {
        fallWord(data);
      }, timeToFallWord);
      RenderSavannaShortStatistic(data);
      savannaGameplayMouse(data);
    }
  } else {
    if (start) {
      data = await getUserSettings(nameGame);
      startGame = false;
    } else {
      data = await savannaRoundDataAPI(lev, rou);
    }
    changeLevel = false;
    userWords = false;
    generateTemplateMain(data, index);
    savannaHealth(countHealth);
    setTimeout(() => {
      fallWord(data);
    }, timeToFallWord);
    
    RenderSavannaShortStatistic(data);
    savannaGameplayMouse(data);
  }
}

const changeUserWords = () => {
  const savanna = document.querySelector('.savanna');
  const switchCheck = document.querySelector('.savanna-switch input');
  const savannaPlay = document.querySelector('.savanna__play');
  switchCheck.addEventListener('click', () => {
    if (!switchCheck.checked) {
      changeCheckBox = false;
      savannaPlay.innerHTML = '';
      userWords = true;
      newStart();
      preloader();
      savannaRound(0, level, round, startGame, changeCheckBox);
      disabledLevelAndRound(changeCheckBox);
    } else {
      userWords = true;
      changeCheckBox = true;
      savannaPlay.innerHTML = '';
      newStart();
      preloader();
      savannaRound(0, level, round, startGame, changeCheckBox);
      disabledLevelAndRound(changeCheckBox);
    }
    savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
  })
}

const changeLevelAndRound = () => {
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');
  document.querySelector('.savanna__hints').addEventListener('change', (event) => {
    if (event.target.closest('.select__round')) {
      round = parseInt(selectRound.value, 10);
      level = parseInt(selectLevel.value, 10);
      setUserSettings(nameGame, level, round);
    }
    if (event.target.closest('.select__level')) {
      level = parseInt(selectLevel.value, 10);
      round = 1;
      selectRound.value = '1';
      setUserSettings(nameGame, level, round);
    }
    changeLevel = true;
    newStart();
    preloader();
    savannaRound(0, level, round, startGame, changeCheckBox);
  });
}

export { userWords, changeCheckBox, startGame, nameGame, level, round, changeLevel, getUserSettings, generateHeader, generateTemplateMain, savannaRound, changeLevelAndRound, RenderSavannaShortStatistic, changeUserWords };