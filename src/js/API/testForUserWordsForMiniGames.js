import getFilteredUserWords from './userAggregatedWordsAPI';

export default async function getUserDataForMiniGame(amountOfWords) {
  const FILTER_FOR_MINI_GAME_WORDS = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
  const miniGameData = await getFilteredUserWords(FILTER_FOR_MINI_GAME_WORDS, amountOfWords);
  console.log(miniGameData);
  return miniGameData;
}
