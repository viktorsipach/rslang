import getFilteredUserWords from './userAggregatedWordsAPI';
import { updateUserWord, getUserWord } from './userWordsAPI';

const FILTER_FOR_TRICKY_WORDS = encodeURIComponent('{"userWord.optional.status":"tricky"}');
const FILTER_FOR_DELETE_WORDS = encodeURIComponent('{"userWord.optional.status":"delete"}');
const FILTER_FOR_REPEAT_WORDS = encodeURIComponent('{"userWord.optional.status":"repeat"}');

async function getTrickyWords(amountOfWords) {
  const trickyWords = await getFilteredUserWords(FILTER_FOR_TRICKY_WORDS, amountOfWords);
  return trickyWords;
}

async function getDeleteWords(amountOfWords) {
  const deleteWords = await getFilteredUserWords(FILTER_FOR_DELETE_WORDS, amountOfWords);
  return deleteWords;
}

async function getRepeatWords(amountOfWords) {
  const repeatWords = await getFilteredUserWords(FILTER_FOR_REPEAT_WORDS, amountOfWords);
  return repeatWords;
}

async function restoreWord(id) {
  const userWord = await getUserWord({ wordId: id });
  const {difficulty} = userWord;
  const {lastRepeatDate} = userWord.optional;
  const {difficultyCoef} = userWord.optional;
  const {repeatCount} = userWord.optional;
  const {daysLeftToRepeat} = userWord.optional;
  const {errorsCount} = userWord.optional;

  updateUserWord({
    wordId: id,
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
}

export { getTrickyWords, getDeleteWords, getRepeatWords, restoreWord };

/* Example how to use this functions. They are needed for dictionary */
// console.log('getTrickyWords');
// console.log( await getTrickyWords(5));

// console.log('getDeleteWords');
// console.log( await getDeleteWords(5));

// console.log('getRepeatWords');
// console.log( await getRepeatWords(5));

// console.log('restore word');
// const id = '5e9f5ee35eb9e72bc21af4c6';
// await restoreWord(id);