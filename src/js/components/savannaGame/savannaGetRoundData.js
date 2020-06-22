import { getRoundData } from '../../API/dataAPI';
import RenderSavannaMainPage from './renderSavannaMainPage';
import { savannaGameplayMouse } from './savannaGameplay';

async function savannaRoundDataAPI() {
  const level = 1;
  const round = 1;
  const wordsPerRound = 10;
  const data = await getRoundData(level, round, wordsPerRound);
//   console.log(data);
  return data;
}

const getRandomTranslateAnswer = (data, ind) => {
  const arrTranslate = [];
  data.forEach(el => {
    arrTranslate.push(el.wordTranslate);
  })
  // console.log(arr);

  let randomAnswer = arrTranslate.sort(() => .5 - Math.random()).slice(0,4);

  // console.log(random);
  // console.log(randomAnswer.indexOf(data[ind].wordTranslate));
  if (randomAnswer.indexOf(data[ind].wordTranslate) !== -1) {
      // console.log(randomAnswer);
  } else {
      // console.log(randomAnswer);
      randomAnswer.splice(0,1);
      // console.log(randomAnswer);
      randomAnswer.splice(0,0,data[ind].wordTranslate);
      // console.log(randomAnswer);
      randomAnswer = randomAnswer.sort(() => .5 - Math.random());
      // console.log(randomAnswer);
  }

  return randomAnswer;
}

async function savannaRound(index) {
    const data = await savannaRoundDataAPI();
    const savanna = document.querySelector('.savanna');

    // console.log(data);

    let resultTranslateAnswer = getRandomTranslateAnswer(data, index);
    // console.log(resultTranslateAnswer);

    const templateMain = new RenderSavannaMainPage(data[index].word, data[index].wordTranslate, resultTranslateAnswer);

    savanna.innerHTML = '';
    savanna.append(templateMain.render());

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

  const savannaTotal = document.createElement('div');
  const error = document.createElement('p');
  const savannaError = document.createElement('span');
  const correct = document.createElement('p');
  const savannaCorrect = document.createElement('span');
  const savannaWords = document.createElement('div');
  const savannaAction = document.createElement('div');
  const buttonGo = document.createElement('button');
  const buttonExit = document.createElement('button');

  savannaTotal.className = 'savanna__total';
  savannaError.className = 'savanna__error';
  savannaCorrect.className = 'savanna__correct';
  savannaWords.className = 'savanna__words';
  savannaAction.className = 'savanna__action';
  buttonGo.className = 'button';
  buttonGo.classList.add('savanna__btn');
  buttonExit.className = 'button';
  buttonExit.classList.add('savanna__btn')

  error.innerHTML = 'Error: ';
  savannaError.innerHTML = '10';
  correct.innerHTML = 'Correct: ';
  savannaCorrect.innerHTML = '0';
  error.append(savannaError);
  correct.append(savannaCorrect);
  savannaTotal.append(error);
  savannaTotal.append(correct);

  generateWordsRound(data).forEach(el => {
    savannaWords.append(el.renderResults());
  })

  buttonGo.innerHTML = 'продолжить тренировку';
  buttonExit.innerHTML = 'выход';
  savannaAction.append(buttonGo);
  savannaAction.append(buttonExit);

  savannaShortStatistics.append(savannaTotal);
  savannaShortStatistics.append(savannaWords);
  savannaShortStatistics.append(savannaAction);
}

export { savannaRound, RenderSavannaShortStatistic };