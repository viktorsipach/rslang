import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';
import getUserSettings from '../../API/settingsTestFile';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());

  const settings = getUserSettings();
  const trainingGame = new TrainingGame({ settings });
  await trainingGame.getData();
  trainingGame.start();

  document.querySelector('.game__buttons.training-game').addEventListener('click', (event) => {
    if (event.target.classList.contains('next')) {
      trainingGame.checkInput(trainingGame.data);
    } else if (event.target.classList.contains('dontKnow')) {
      trainingGame.showWordWithoutTraining();
    }
  });

  document.querySelector('.difficulty__buttons').addEventListener('click', (event) => {
    if (event.target.classList.contains('again')) {
      console.log('again');
      trainingGame.addCardToRepeatList();
      trainingGame.renderCardData();
    } else if (event.target.classList.contains('easy')) {
      console.log('easy')
      trainingGame.renderCardData();
    } else if (event.target.classList.contains('normal')) {
      console.log('normal')
      trainingGame.renderCardData();
    } else if (event.target.classList.contains('hard')) {
      console.log('hard')
      trainingGame.renderCardData();
    }
  });

  document.addEventListener('keypress', (event) => {
    if(!document.querySelector('.game__buttons.training-game').classList.contains('hidden')) {
      if (event.code === 'Enter' && document.querySelector('.game__training')) {
        trainingGame.checkInput(trainingGame.data);
      }
      else {
        trainingGame.checkInputLength();
        trainingGame.hideAnswer();
      }
    }
  });

  document.querySelector('.card__input').addEventListener('click', () => {
    trainingGame.hideAnswer();
  });

  document.querySelector('.game__training').addEventListener('click', (event) => {
    if (event.target.closest('.menu__button') || event.target.closest('.card__button')) {
      const element = event.target.closest('.menu__button') || event.target.closest('.card__button');
      element.classList.toggle('active');
      if (event.target.closest('.auto-pronunciation')) {
        if (trainingGame.autoPronunciation) {
          trainingGame.autoPronunciation = false;
        } else {
          trainingGame.autoPronunciation = true;
        }
      }
      if (event.target.closest('.show-translation')) {
        if (trainingGame.cardSettings.showTranslation) {
          trainingGame.cardSettings.showTranslation = false;
        } else {
          trainingGame.cardSettings.showTranslation = true;
        }
      }
    }
  })

}