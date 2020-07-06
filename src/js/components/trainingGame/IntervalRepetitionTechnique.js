import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWordsAPI';
import { getRoundData } from '../../API/dataAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';
import { getUserSettings } from '../../API/userSettingsAPI';

const FILTER_FOR_NEW_WORDS = encodeURIComponent('{"userWord.optional.status":"new"}');
const FILTER_FOR_REPEAT_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');


async function createTrainingDataForDay(settings, amountOfCards) {
  const words = await getRoundData(settings.level, settings.round, amountOfCards);
  console.log(words);
  
  const TRAINING_WORDS = [];
  const promises = [];
  
  words.forEach(async function createWord(word) {
    const currentDate = (new Date()).toLocaleString();
    promises.push(createUserWord({
      wordId: word.id,
      word: {
        'difficulty': 'normal',
        'optional': {
          status: 'tricky',
          lastRepeatDate: currentDate,
          difficultyCoef: 0,
          repeatCount: 0,
          daysLeftToRepeat: 0,
          errorsCount: 0,
        }
      }
    }));
  });
  const PROMISES_RESULT = await Promise.all(promises);
  PROMISES_RESULT.forEach((el) => {
    TRAINING_WORDS.push(el);
  });
  return TRAINING_WORDS;
}

async function decreaseAllUserWordLeftDaysAmount(allUserWords) {
  allUserWords.forEach(async function decreaseWordDaysToRepeat(word) {
    const userWord = await getUserWord({ wordId: word.wordId });
    const {difficulty} = userWord;
    const {lastRepeatDate} = userWord.optional;
    const {difficultyCoef} = userWord.optional;
    const {repeatCount} = userWord.optional;
    let {daysLeftToRepeat} = userWord.optional;
    if (daysLeftToRepeat > 0) {
      daysLeftToRepeat -= 1;
    }
    const {errorsCount} = userWord.optional;

    updateUserWord({
      wordId: word.wordId,
      word: {
       'difficulty': difficulty,
        'optional': {
          status: 'repeat',
          lastRepeatDate,
          difficultyCoef,
          repeatCount,
          daysLeftToRepeat,
          errorsCount,
        }
      }
    })
  });
}

export default async function getTrainingGameData() {
  const allUserWords = await getAllUserWords();
  console.log(allUserWords.length);
  console.log(allUserWords);

  // allUserWords.forEach((word) => {
  //   deleteUserWord({wordId: word.wordId});
  // });

  const settings = await getUserSettings();
  const trainingSettings = settings.optional.training;

  const settingsDate = settings.optional.training.date;
  const lastGameDate = new Date(settingsDate);

  const today = new Date('07/07/2020');
  // const today = new Date();

  const daysBetweenLastTriningAndToday = today.getDate() - lastGameDate.getDate();
  console.log(daysBetweenLastTriningAndToday);

  if (daysBetweenLastTriningAndToday >= 1 || allUserWords.length === 0) {
    console.log('new day');
    await decreaseAllUserWordLeftDaysAmount(allUserWords);
    const gameData = [];
    const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettings.maxCardsPerDay - trainingSettings.newWordsPerDay;
    console.log(`total Ws = ${trainingSettings.maxCardsPerDay}, new Ws = ${trainingSettings.newWordsPerDay}, repeat Ws${AMOUNT_OF_WORDS_TO_REPEAT}`);
    await createTrainingDataForDay(trainingSettings, trainingSettings.newWordsPerDay);
    const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, trainingSettings.newWordsPerDay);
    console.log(gameDataNew);
    const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
    console.log(gameDataRepeat);
    gameDataNew[0].paginatedResults.forEach((el) => {
      gameData.push(el);
    });
    gameDataRepeat[0].paginatedResults.forEach((word) => {
      gameData.push(word);
    })
    return gameData;
  } 
  console.log('same day');  
  return undefined;
}
 
