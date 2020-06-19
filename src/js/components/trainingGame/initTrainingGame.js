import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());

  const newWordsPerDay = 25;
  const maxCardsPerDay  = 10;
  const trainingGame = new TrainingGame({ newWordsPerDay, maxCardsPerDay });
  await trainingGame.getData();

  trainingGame.renderData(trainingGame.data);

  document.querySelector('.trainingGame__button.next').addEventListener('click', () => {
    trainingGame.checkInput(trainingGame.data);
  });

  document.querySelector('.trainingGame__button.dontKnow').addEventListener('click', () => {
    trainingGame.showWord();
  });

  document.addEventListener('keypress', (event) => {
    if (event.code === 'Enter' && document.querySelector('.game__training')) {
      trainingGame.checkInput(trainingGame.data);
    }
  });
}