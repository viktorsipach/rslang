import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';
import SettingsPageAPI from '../../API/settingsPageAPI';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(await renderTrainingGamePage());
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
  });

  document.querySelector('.card__input').addEventListener('input', ()=> {
    if (trainingGame.data.length > 0) {
      if(!document.querySelector('.game__buttons.training-game').classList.contains('hidden')) {
        trainingGame.checkInputLength();
        trainingGame.hideAnswer();
      }
    }
  });

  function keyBoardHelper(event) {
    if (trainingGame.data.length > 0) {
      if(!document.querySelector('.game__buttons.training-game').classList.contains('hidden')) {
        if ((event.code === 'Enter' || event.keyCode === 13) && document.querySelector('.game__training')) {
          trainingGame.checkInput(trainingGame.data);
        }
      }
    }
  }

  document.addEventListener('keydown', keyBoardHelper); 

  const CLOSE_BUTTON = document.querySelector('.close-btn');
  CLOSE_BUTTON.addEventListener('click', () => {
    document.removeEventListener('keydown', keyBoardHelper);
    trainingGame.sound.src = '';
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
          trainingGame.sound.src = '';
          trainingGame.renderCardData();
        } else {
          trainingGame.autoPronunciation = true;
          trainingGame.sound.play();
        }
      }

      if (event.target.closest('.show-translation')) {
        SettingsPageAPI.settingsTrainingPage('show-translation');
        if (trainingGame.cardSettings.showTranslation) {
          document.querySelector('.card__translation').textContent = '';
          trainingGame.cardSettings.showTranslation = false;
        } else {
          trainingGame.cardSettings.showTranslation = true;
          if (trainingGame.isAnswerCorrect || trainingGame.isWordWithoutTraining) {
            document.querySelector('.card__translation').textContent = trainingGame.cardData.wordTranslate;
          }
        }
      }

      if (event.target.closest('.show-sentences-translation')) {
        SettingsPageAPI.settingsTrainingPage('show-sentences-translation');
        const EXPLANATION_SENTENCE_TRANSLATION = document.querySelector('.card__explanation-sentence-translation');
        const EXAMPLE_SENTENCE_TRANSLATION = document.querySelector('.card__example-sentence-translation');
        if (trainingGame.showSentencesTranslation) {
          trainingGame.showSentencesTranslation = false;
          EXPLANATION_SENTENCE_TRANSLATION.classList.add('hidden');
          EXAMPLE_SENTENCE_TRANSLATION.classList.add('hidden');
        } else {
          trainingGame.showSentencesTranslation = true;
          if (trainingGame.cardSettings.showExampleSentence && (trainingGame.isAnswerCorrect || trainingGame.isWordWithoutTraining)) {
            EXAMPLE_SENTENCE_TRANSLATION.classList.remove('hidden');
          }
          if (trainingGame.cardSettings.showExplanationSentence && (trainingGame.isAnswerCorrect || trainingGame.isWordWithoutTraining)) {
            EXPLANATION_SENTENCE_TRANSLATION.classList.remove('hidden');
          }
        }
      }
    }
  });
}
