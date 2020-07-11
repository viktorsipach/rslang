import { getRoundData } from '../../API/dataAPI';
import Image from '../../../assets/img/savanna/savanna-main1.jpg';
import RenderSavannaMainPage from './renderSavannaMainPage';
import { startColorGreen, startColorBlue, startColorRed, countHealth, fallWord, savannaHealth, newStart, savannaGameplayMouse, savannaGameplayKeyboard, preloader } from './savannaGameplay';
import UserSettingsMiniGame from '../../API/userSettingsMiniGameAPI';

const maxlevels = 6;
const maxRoundsPerLevel = 30;
let changeLevel = false;
let level = 1;
let round = 1;
const nameGame = 'savanna';
let startGame = true;

async function savannaRoundDataAPI(level, round) {
  const wordsPerRound = 20;
  const data = await getRoundData(level, round, wordsPerRound);
  return data; 
}

const setLevelAndRound = (level, round) => {
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');
  selectLevel.value = level;
  selectRound.value = round;
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

  const selectLevels = document.querySelector('#selectLevel');
  const selectRounds = document.querySelector('#selectRound');
  const frLevel = document.createDocumentFragment();
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
  startGame = true;
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
    <button class="button savanna__btn">выход</button>
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
    savannaRound(0, level, round, startGame);
    savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
  }); 
}

async function savannaRound(index, lev, rou, start) {
  let data = [];
  if (start) {
    data = await getUserSettings(nameGame);
    startGame = false;
  } else {
    data = await savannaRoundDataAPI(lev, rou);
  }
  changeLevel = false;
  generateTemplateMain(data, index);
  savannaHealth(countHealth);
  setTimeout(() => {
    fallWord(data);
  }, 2950);
  
  RenderSavannaShortStatistic(data);
  savannaGameplayMouse(data);
  // savannaGameplayKeyboard(data);
  // function foo() {
  //   savannaGameplayKeyboard(data);
  // }
  // document.addEventListener('keyup', foo);
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
    savannaRound(0, level, round, startGame);
  });
}

export { startGame, nameGame, level, round, changeLevel, getUserSettings, generateHeader, generateTemplateMain, savannaRound, changeLevelAndRound, RenderSavannaShortStatistic };