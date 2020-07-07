import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWordsAPI';
import { getRoundData } from '../../API/dataAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';
import { getUserSettings } from '../../API/userSettingsAPI';

const FILTER_FOR_NEW_WORDS = encodeURIComponent('{"userWord.optional.status":"new"}');
const FILTER_FOR_TODAY_REPEAT_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
const FILTER_FOR_ALL_REPEAT_WORDS = encodeURIComponent('{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}]}');

async function createTrainingDataForDay(settings, amountOfCards) {
  console.log(`create user words, amount = ${amountOfCards}`);
  const TRAINING_WORDS = [];
  const promises = [];
  const words = await getRoundData(settings.level, settings.round, amountOfCards);
  // console.log(words);  
  words.forEach(async function createWord(word) {
    const currentDate = (new Date()).toLocaleString();
    promises.push(createUserWord({
      wordId: word.id,
      word: {
        'difficulty': 'normal',
        'optional': {
          status: 'new',
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

async function decreaseRepeatUserWordLeftDaysAmount(allRepeatWords) {
  allRepeatWords.forEach(async function decreaseWordDaysToRepeat(word) {
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
  console.log(`allUserWords , length ${allUserWords.length}`);
  console.log(allUserWords);

  // allUserWords.forEach((word) => {
  //   deleteUserWord({wordId: word.wordId});
  // });

  const settings = await getUserSettings();
  const trainingSettings = settings.optional.training;

  const settingsDate = settings.optional.training.date;
  const lastGameDate = new Date(settingsDate);

  // const today = new Date('07/07/2020');
  const today = new Date();

  const daysBetweenLastTriningAndToday = today.getDate() - lastGameDate.getDate();
  console.log(`daysBetweenLastTriningAndToday ${daysBetweenLastTriningAndToday}`);
  const gameData = [];


  if (allUserWords.length === 0) {
    console.log('FIRST DAY');
    await createTrainingDataForDay(trainingSettings, settings.wordsPerDay);
    const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.wordsPerDay);
    console.log(gameDataNew);
    if (gameDataNew) {
      gameDataNew[0].paginatedResults.forEach((el) => {
        gameData.push(el);
      });
    }
    return gameData;
  }
  if (daysBetweenLastTriningAndToday >= 1) {
    console.log('NEW DAY');
    console.log('decreaseRepeatUserWordLeftDaysAmount');
    const amountOfWordsForMinRequest = 1;
    let allRepeatWords = await getFilteredUserWords(FILTER_FOR_ALL_REPEAT_WORDS, amountOfWordsForMinRequest);
    const allRepeatWordsCount = allRepeatWords[0].totalCount[0].count;
    console.log(allRepeatWordsCount);
    allRepeatWords = await getFilteredUserWords(FILTER_FOR_ALL_REPEAT_WORDS, settings.wordsPerDay);
    console.log(allRepeatWords);
    await decreaseRepeatUserWordLeftDaysAmount(allRepeatWords); // await //

    const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettings.maxCardsPerDay - settings.wordsPerDay;
    console.log(`total Ws = ${trainingSettings.maxCardsPerDay}, new Ws = ${settings.wordsPerDay}, repeat Ws${AMOUNT_OF_WORDS_TO_REPEAT}`);

    await createTrainingDataForDay(trainingSettings, settings.wordsPerDay);
    const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.wordsPerDay);
    console.log(gameDataNew);
    const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
    console.log(gameDataRepeat);
    if (gameDataNew) {
      gameDataNew[0].paginatedResults.forEach((el) => {
        gameData.push(el);
      });
    }
    if (gameDataRepeat) {
      gameDataRepeat[0].paginatedResults.forEach((word) => {
        gameData.push(word);
      });
    }
    return gameData;
  } 
  if (trainingSettings.amountOfLearnedWordsPerDay !== settings.wordsPerDay){
    console.log('SAME DAY BUT!!! USER DON`T FINISHED TODAY WORDS');

    const AMOUNT_OF_LEFT_NEW_WORDS = settings.wordsPerDay - trainingSettings.amountOfLearnedWordsPerDay;
    const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettings.maxCardsPerDay - AMOUNT_OF_LEFT_NEW_WORDS;
    console.log(`total Ws = ${trainingSettings.maxCardsPerDay}, remain new Ws = ${trainingSettings.amountOfLearnedWordsPerDay}, repeat Ws${AMOUNT_OF_WORDS_TO_REPEAT}`);

    const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.wordsPerDay);
    console.log(gameDataNew);
    const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
    console.log(gameDataRepeat);
    if (gameDataNew) {
      gameDataNew[0].paginatedResults.forEach((el) => {
        gameData.push(el);
      });
    }
    if (gameDataRepeat) {
      gameDataRepeat[0].paginatedResults.forEach((word) => {
        gameData.push(word);
      });
    }
    return gameData;
  }

  let gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, 1);
  console.log(gameDataRepeat);
  const todayRepeatWordsCount = gameDataRepeat[0].totalCount[0].count;
  console.log(todayRepeatWordsCount);
  if (todayRepeatWordsCount > 0) {
    console.log('SAME DAY ONLY!!! REPEAT WORDS');
    gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, 1);
    console.log(gameDataRepeat);

    if (gameDataRepeat) {
      gameDataRepeat[0].paginatedResults.forEach((word) => {
        gameData.push(word);
      });
    }
    return gameData;
  }
  console.log('SAME DAY AND NOTHING!!! MORE TO LEARN AND REPEAT');  
  return undefined;
}
 