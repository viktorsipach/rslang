import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from '../../API/userWordsAPI';
import { getRoundData } from '../../API/dataAPI';
import getUserCurrentWords from '../../API/userAgregatedWordsAPI';

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

async function createTrainingDataForDay() {
  const words = await getRoundData(1, 2, settings.maxCardsPerDay);
  console.log(words);

  words.forEach( async function foo(word) {
    const currentDate = new Date();
    const isUserWordExist = await getUserWord({ wordId: word.id });
    console.log(isUserWordExist);
    if (!isUserWordExist) {
      console.log('no exist');
      createUserWord({
        wordId: word.id,
        word: {
          'difficulty': 'easy',
          'optional': {
            status: 'new',
            lastRepeatDate: currentDate,
            errorsCount: 0,
          }
        }
      });
    }
  })



}


export default async function getTrainingGameData() {
  // await createTrainingDataForDay();

  // const allUserWords = await getAllUserWords();
  // console.log(allUserWords);

  // const filter = {
  //   "$or": [
  //   {"userWord.difficulty":"strong"},
  //   {"userWord":null}
  //   ]
  // }

   // const a = {"$and":[{"userWord.difficulty":"easy", "userWord.optional.key":"value"}]};

  // const filter = encodeURIComponent({"userWord.difficulty":"easy"});
  // const filter = {"$and":[{"userWord.difficulty":"easy", "userWord.optional.key":"value"}]};
  const myFilter = {"$and":[{"userWord.difficulty":"easy", "userWord.optional.key":"value"}]};;
  const myFilterNew = encodeURIComponent(myFilter);
  console.log(myFilterNew);

  const filter = '%7B%22%24or%22%3A%5B%7B%22userWord.difficulty%22%3A%22easy%22%7D%2C%7B%22userWord%22%3Anull%7D%5D%7D';
  console.log(filter);

  // getUserCurrentWords(filter);

}