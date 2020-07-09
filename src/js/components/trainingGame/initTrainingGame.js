import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';
import SettingsPageAPI from '../../API/settingsPageAPI';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());
  SettingsPageAPI.settingsTrainingPage('render');
 
  const trainingGame = TrainingGame;
  await trainingGame.getData();
  await trainingGame.initGame();
  trainingGame.start();

  document.querySelector('.game__buttons.training-game').addEventListener('click', async (event) => {
    if (event.target.classList.contains('next')) {
      trainingGame.checkInput(trainingGame.data);
    } else if (event.target.classList.contains('dontKnow')) {
      trainingGame.showWordWithoutTraining();
      trainingGame.wordDifficulty = 'hard';
      await trainingGame.updateWord();
    }
  });

  document.querySelector('.difficulty__buttons').addEventListener('click', async (event) => {
    if (event.target.classList.contains('again')) {
      trainingGame.addCardToRepeatList();
      trainingGame.wordDifficulty = 'hard';
    } else if (event.target.classList.contains('easy')) {
      trainingGame.wordDifficulty = 'easy';
    } else if (event.target.classList.contains('normal')) {
      trainingGame.wordDifficulty = 'normal';
    } else if (event.target.classList.contains('hard')) {
      trainingGame.wordDifficulty = 'hard';
    }
    await trainingGame.updateWord();
    trainingGame.renderCardData();
  });

  document.querySelector('.dictionary__buttons').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
      trainingGame.wordStatus = 'delete';
      trainingGame.showWordWithoutTraining();
      trainingGame.wordDifficulty = 'hard';
      trainingGame.updateWord();
    } else if (event.target.classList.contains('tricky')) {
      trainingGame.wordStatus = 'tricky';
    }
  })

  function keyBoardHelper(event) {
    if (trainingGame.data.length > 0) {
      if(!document.querySelector('.game__buttons.training-game').classList.contains('hidden')) {
        if (event.code === 'Enter' && document.querySelector('.game__training')) {
          trainingGame.checkInput(trainingGame.data);
        }
        else {
          trainingGame.checkInputLength();
          trainingGame.hideAnswer();
        }
      }
    }
   
  }

  document.addEventListener('keypress', keyBoardHelper); 

  const CLOSE_BUTTON = document.querySelector('.close-btn');
  CLOSE_BUTTON.addEventListener('click', () => {
    document.removeEventListener('keypress', keyBoardHelper);
  });

  document.querySelector('.card__input').addEventListener('click', () => {
    trainingGame.hideAnswer();
  });

  document.querySelector('.game__training').addEventListener('click', (event) => {
    if (event.target.closest('.menu__button') || event.target.closest('.card__button')) {
      const element = event.target.closest('.menu__button') || event.target.closest('.card__button');
      element.classList.toggle('active');
      if (event.target.closest('.auto-pronunciation')) {
        
        SettingsPageAPI.settingsTrainingPage('auto-pronunciation');

        if (trainingGame.autoPronunciation) {
          trainingGame.autoPronunciation = false;
        } else {
          trainingGame.autoPronunciation = true;
        }
      }
      if (event.target.closest('.show-translation')) {

        SettingsPageAPI.settingsTrainingPage('show-translation');

        if (trainingGame.cardSettings.showTranslation) {
          trainingGame.cardSettings.showTranslation = false;
        } else {
          trainingGame.cardSettings.showTranslation = true;
        }
      }
    }
  });
}
