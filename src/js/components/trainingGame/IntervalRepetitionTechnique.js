import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWordsAPI';
import { getRoundData } from '../../API/dataAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';
import { getUserSettings, resetTodayProgressSettings } from '../../API/userSettingsAPI';

const FILTER_FOR_NEW_WORDS = encodeURIComponent('{"userWord.optional.status":"new"}');
const FILTER_FOR_TODAY_REPEAT_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
const FILTER_FOR_ALL_REPEAT_WORDS = encodeURIComponent('{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}]}');

async function createTrainingDataForDay(settings, amountOfCards) {
  console.log('createTrainingDataForDay');
  console.log(`amountOfCards ${amountOfCards}`);
  const TRAINING_WORDS = [];
  const promises = [];
  const words = await getRoundData(settings.level, settings.round, amountOfCards);
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
    const idProperty = '_id';
    const userWord = await getUserWord({ wordId: word[`${idProperty}`] });
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
      wordId: word[`${idProperty}`],
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
  console.log(`allUserWords.length ${allUserWords.length}`);
  console.log(allUserWords);
  const nextDateShift = 1;
  const dateShiftForNextMonth = -25;

  // allUserWords.forEach((word) => {
  //   deleteUserWord({wordId: word.wordId});
  // });

  const settings = await getUserSettings();
  const trainingMainSettings = settings.optional.training.mainSettings;
  const trainingSettingsPage = settings.optional.training.settingsPage;
  const settingsDate = trainingMainSettings.date;
  const lastGameDate = new Date(settingsDate);

  const {amountOfRepeatedWordsPerDay} = settings.optional.training.trainingProgress;

  // const today = new Date('07/11/2020');
  const today = new Date();

  const daysBetweenLastTriningAndToday = today.getDate() - lastGameDate.getDate();
  const gameData = [];

  if (allUserWords.length === 0) {
    console.log('FIRST DAY');
    console.log(`amount to create ${settings.wordsPerDay}`);
    await resetTodayProgressSettings();
    if (trainingSettingsPage.newWordsOnly) {
      await createTrainingDataForDay(trainingMainSettings, settings.wordsPerDay);
      const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.wordsPerDay);
      console.log(gameDataNew);
      if (gameDataNew) {
        gameDataNew[0].paginatedResults.forEach((el) => {
          gameData.push(el);
        });
      }
    }
    return gameData;
  }
  if (daysBetweenLastTriningAndToday >= nextDateShift || daysBetweenLastTriningAndToday > dateShiftForNextMonth) {
    console.log('NEW DAY');
    await resetTodayProgressSettings();
    const amountOfWordsForMinRequest = 1;
    let allRepeatWords = await getFilteredUserWords(FILTER_FOR_ALL_REPEAT_WORDS, amountOfWordsForMinRequest);
    console.log(allRepeatWords);
    console.log(allRepeatWords[0].totalCount[0]); 
    if (allRepeatWords[0].totalCount[0]) {
      const allRepeatWordsCount = allRepeatWords[0].totalCount[0].count;
      allRepeatWords = await getFilteredUserWords(FILTER_FOR_ALL_REPEAT_WORDS, allRepeatWordsCount);
      console.log(allRepeatWordsCount);
      console.log(allRepeatWords);
      await decreaseRepeatUserWordLeftDaysAmount(allRepeatWords[0].paginatedResults); 
    }
    const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettingsPage.maxCardsPerDay - settings.wordsPerDay;
    console.log(`total Ws = ${trainingSettingsPage.maxCardsPerDay}, new Ws = ${settings.wordsPerDay}, repeat Ws${AMOUNT_OF_WORDS_TO_REPEAT}`);

    if (trainingSettingsPage.newWordsOnly) {
      console.log(`newWordsOnly`);
      await createTrainingDataForDay(trainingMainSettings, settings.wordsPerDay);
      const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.wordsPerDay);
      console.log(gameDataNew);
      if (gameDataNew) {
        gameDataNew[0].paginatedResults.forEach((el) => {
          gameData.push(el);
        });
      }
    }
    if (trainingSettingsPage.learnedWordsOnly) {
      console.log(`learnedWordsOnly`);
      const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
      console.log(gameDataRepeat);
      if (gameDataRepeat) {
        gameDataRepeat[0].paginatedResults.forEach((word) => {
          gameData.push(word);
        });
      }
    }
    return gameData;
  } 
  if (trainingMainSettings.amountOfLearnedWordsPerDay !== settings.wordsPerDay){
    console.log('SAME DAY BUT!!! USER DON`T FINISHED TODAY WORDS');
    const AMOUNT_OF_LEFT_NEW_WORDS = settings.wordsPerDay - trainingMainSettings.amountOfLearnedWordsPerDay;
    const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettingsPage.maxCardsPerDay - settings.wordsPerDay - amountOfRepeatedWordsPerDay;
    console.log(`total Ws = ${trainingSettingsPage.maxCardsPerDay}, learned new Ws = ${trainingMainSettings.amountOfLearnedWordsPerDay}, repeat Ws${AMOUNT_OF_WORDS_TO_REPEAT}`);
    if (trainingSettingsPage.newWordsOnly) {
      const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, AMOUNT_OF_LEFT_NEW_WORDS);
      console.log(gameDataNew);
      if (gameDataNew) {
        gameDataNew[0].paginatedResults.forEach((el) => {
          gameData.push(el);
        });
      }
    }
    if (trainingSettingsPage.learnedWordsOnly) {
      const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
      console.log(gameDataRepeat);
      if (gameDataRepeat) {
        gameDataRepeat[0].paginatedResults.forEach((word) => {
          gameData.push(word);
        });
      }
    }
    return gameData;
  }
  if (trainingSettingsPage.learnedWordsOnly) {
    let gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, 1);
    if(gameDataRepeat[0].totalCount[0] !== undefined) {
      const todayRepeatWordsCount = gameDataRepeat[0].totalCount[0].count;
      if (todayRepeatWordsCount > 0) {
        console.log('SAME DAY ONLY!!! REPEAT WORDS');
        const AMOUNT_OF_WORDS_TO_REPEAT = trainingSettingsPage.maxCardsPerDay - settings.wordsPerDay;
        console.log(`AMOUNT_OF_WORDS_TO_REPEAT ${AMOUNT_OF_WORDS_TO_REPEAT}`);
        gameDataRepeat = await getFilteredUserWords(FILTER_FOR_TODAY_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT); 
        console.log(gameDataRepeat) ;
        if (gameDataRepeat) {
          gameDataRepeat[0].paginatedResults.forEach((word) => {
            gameData.push(word);
          });
        }
        return gameData;
      }
    }
  }
  console.log('SAME DAY AND NOTHING!!! MORE TO LEARN AND REPEAT');  
  return undefined;
}
 