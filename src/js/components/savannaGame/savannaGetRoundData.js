import { getRoundData } from '../../API/dataAPI';
import RenderSavannaMainPage from './renderSavannaMainPage';
import { count, countHealth, fallWord, savannaHealth, savannaGameplayMouse, savannaGameplayKeyboard } from './savannaGameplay';

const maxlevels = 6;
const maxRoundsPerLevel = 30;
let changeLevel = false;

async function savannaRoundDataAPI(level, round) {
  const wordsPerRound = 20;
  const data = await getRoundData(level, round, wordsPerRound);
  return data;
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

  savannaHealth(countHealth);
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
  const savannaShortStatistics = document.querySelector('.savanna__short-statistics');

  savannaShortStatistics.innerHTML = `
  <div class="savanna__total">
    <p>Error: <span class="savanna__error">20</span></p>
    <p>Correct: <span class="savanna__correct">0</span></p>
  </div>
  <div class="savanna__words"></div>
  <div class="savanna__action">
    <button class="button savanna__btn">продолжить тренировку</button>
    <button class="button savanna__btn">выход</button>
  </div>
  `;
  
  const savannaWords = document.querySelector('.savanna__words');

  generateWordsRound(words).forEach(el => {
    savannaWords.append(el.renderResults());
  }) 
}

async function savannaRound(index, lev, rou) {
  const data = await savannaRoundDataAPI(lev, rou);
  changeLevel = false;
  generateTemplateMain(data, index);
  fallWord(data);
  RenderSavannaShortStatistic(data);
  savannaGameplayMouse(data);
  savannaGameplayKeyboard(data);
}

const changeLevelAndRound = () => {
  const selectLevel = document.querySelector('#selectLevel');
  const selectRound = document.querySelector('#selectRound');
  let round;
  let level;
  document.querySelector('.savanna__hints').addEventListener('change', (event) => {
    if (event.target.closest('.select__round')) {
      round = parseInt(selectRound.value, 10);
      level = parseInt(selectLevel.value, 10);
    }
    if (event.target.closest('.select__level')) {
      level = parseInt(selectLevel.value, 10);
      round = 1;
      selectRound.value = '1';
    }
    changeLevel = true;
    savannaRound(0, level, round);
  });
}

export { changeLevel, generateHeader, generateTemplateMain, savannaRound, changeLevelAndRound, RenderSavannaShortStatistic };