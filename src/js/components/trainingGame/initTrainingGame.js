import renderTrainingGamePage from './renderTrainingGamePage';
import TrainingGame from './TrainingGame';
import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWorsAPI';
import { getRoundData, getWordDataById } from '../../API/dataAPI';

export default async function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());

  const settings = {
    newWordsPerDay: 20,
    maxCardsPerDay: 20,
    cardSettings: {
      showTranslation: true,
      showExplanationSentence: true,
      showExampleSentence: true,
      showTranscription: true,
      showAssociatedPicture: true
    },
    autoPronunciation: true,
    showSentencesTranslation: true,
    showIDontKnowButton: true,
    showDeleteButton: true,
    showHardButton: true,
    newWordsOnly: true,
    learnedWordsOnly: true,
  }

  /* console.log(`userID ${localStorage.getItem('userId')}`);
  console.log(`userToken ${localStorage.getItem('userToken')}`);

  const data = await getRoundData(userSettings.level, userSettings.round, 25);
  console.log(data);

  const allUserWords = await getAllUserWords();
  console.log(allUserWords);

  createUserWord({
    wordId: "5e9f5ee35eb9e72bc21af6a0",
    word: { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
  });

   deleteUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  getUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  updateUserWord({
    wordId: "5e9f5ee35eb9e72bc21af6a0",
    word: { "difficulty": "easy", "optional": {testFieldString: 'test', testFieldBoolean: true} }
  })

  const id = '5e9f5ee35eb9e72bc21af716';
  const data = await getWordDataById(id);
  console.log(data); */

 
  const trainingGame = new TrainingGame(settings);
  trainingGame.start();
  
  document.querySelector('.trainingGame__button.next').addEventListener('click', () => {
    trainingGame.checkInput(trainingGame.data);
  });

  document.addEventListener('keypress', (event) => {
    if (event.code === 'Enter' && document.querySelector('.game__training')) {
      trainingGame.checkInput(trainingGame.data);
    }
    else {
      trainingGame.checkInputLength();
      trainingGame.hideAnswer();
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

  document.querySelector('.trainingGame__button.dontKnow').addEventListener('click', () => {
    trainingGame.showWordWithoutTraining();
  });
}