import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());

  const newWordsPerDay = 25;
  const maxCardsPerDay  = 50;
  const trainingGame = new TrainingGame({ newWordsPerDay, maxCardsPerDay });
  await trainingGame.getData();

  trainingGame.renderData(trainingGame.data[0]);

  window.onload = function() {
    const input = document.querySelector('.card__input');
    input.setAttribute('size', input.getAttribute('placeholder').length);
  }
}