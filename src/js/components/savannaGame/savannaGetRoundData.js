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

export default async function savannaRound(index) {
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