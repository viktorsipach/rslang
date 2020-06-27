import { getRoundData } from '../../API/dataAPI';
import RenderSavannaMainPage from './renderSavannaMainPage';
import { countHealth, fallWord, savannaHealth, savannaGameplayMouse } from './savannaGameplay';

async function savannaRoundDataAPI() {
  const level = 1;
  const round = 1;
  const wordsPerRound = 10;
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

async function savannaRound(index) {
    const data = await savannaRoundDataAPI();
    const savanna = document.querySelector('.savanna');

    let resultTranslateAnswer = getRandomTranslateAnswer(data, index);

    const templateMain = new RenderSavannaMainPage(data[index].word, data[index].wordTranslate, resultTranslateAnswer);

    savanna.innerHTML = '';
    savanna.append(templateMain.render());
    savannaHealth(countHealth);
    fallWord();

    savannaGameplayMouse(data, index);
}

const generateWordsRound = (data) => {
  let roundWords = [];
  data.forEach(elem => {
    roundWords.push(new RenderSavannaMainPage(elem.word, elem.wordTranslate))
  })
  return roundWords;
}

async function RenderSavannaShortStatistic() {
  const data = await savannaRoundDataAPI();
  const savannaShortStatistics = document.querySelector('.savanna__short-statistics');

  savannaShortStatistics.innerHTML = `
  <div class="savanna__total">
    <p>Error: <span class="savanna__error">10</span></p>
    <p>Correct: <span class="savanna__correct">0</span></p>
  </div>
  <div class="savanna__words"></div>
  <div class="savanna__action">
    <button class="button savanna__btn">продолжить тренировку</button>
    <button class="button savanna__btn">выход</button>
  </div>
  `;
  
  const savannaWords = document.querySelector('.savanna__words');

  generateWordsRound(data).forEach(el => {
    savannaWords.append(el.renderResults());
  }) 
}

export { savannaRound, RenderSavannaShortStatistic };