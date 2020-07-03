import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWordsAPI';
import { getRoundData } from '../../API/dataAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';
import getUserSettings from '../../API/settingsTestFile';

const FILTER_FOR_REPEAT_WORDS = encodeURIComponent('{"$and":[{"userWord.optional.status":"repeat","userWord.optional.daysLeftToRepeat":0}]}')
const FILTER_FOR_NEW_WORDS = encodeURIComponent('{"userWord.optional.status":"new"}');


async function createTrainingDataForDay(amountOfCards) {
  const words = await getRoundData(1, 4, amountOfCards);
  console.log(words);

  const TRAINING_WORDS = [];
  const promises = [];
  
  words.forEach(async function createWord(word) {
    const currentDate = new Date();
    promises.push(createUserWord({
      wordId: word.id,
      word: {
        'difficulty': 'normal',
        'optional': {
          status: 'new',
          lastRepeatDate: currentDate,
          daysLeftToRepeat: 3,
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


export default async function getTrainingGameData() {
  const settings = getUserSettings();
  const allUserWords = await getAllUserWords();
  console.log(allUserWords.length);
  console.log(allUserWords);

  // allUserWords.forEach((word) => {
  //   deleteUserWord({wordId: word.wordId});
  // });

  let gameData = [];
  if (allUserWords.length === 0) {
    console.log('FIRST GAME');
    await createTrainingDataForDay(settings.maxCardsPerDay);
    gameData =  await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.maxCardsPerDay);
    return gameData[0].paginatedResults;
  } 

  console.log('NOT FIRST GAME');
  console.log(`words need for game = ${settings.maxCardsPerDay}`);
  console.log(`new words for game = ${settings.newWordsPerDay}`);
  const AMOUNT_OF_WORDS_TO_REPEAT = settings.maxCardsPerDay - settings.newWordsPerDay;
  console.log(`wordsTo repeat ${AMOUNT_OF_WORDS_TO_REPEAT}`);
  // await createTrainingDataForDay(settings.newWordsPerDay);
  const gameDataNew = await getFilteredUserWords(FILTER_FOR_NEW_WORDS, settings.newWordsPerDay);
  const gameDataRepeat = await getFilteredUserWords(FILTER_FOR_REPEAT_WORDS, AMOUNT_OF_WORDS_TO_REPEAT);
  gameDataNew[0].paginatedResults.forEach((el) => {
    gameData.push(el);
  });
  gameDataRepeat[0].paginatedResults.forEach((word) => {
    gameData.push(word);
  })
  return gameData;
}
