import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from './userWordsAPI';
import { getWordDataById } from './dataAPI';

export default async function testUserWords() {

  await getAllUserWords();
  const date = new Date();

  createUserWord({
    wordId: '5e9f5ee35eb9e72bc21af6a0',
    word: {
      'difficulty': 'low',
      'optional': {
        status: 'new',
        lastTrainNumber: 1,
        lastRepeatDate: date,
        errorsCount: 0,
      }
    }
  });

  deleteUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  getUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  updateUserWord({
    wordId: '5e9f5ee35eb9e72bc21af6a0',
    word: {
      'difficulty': 'high',
      'optional': {
        status: 'new',
        lastTrainNumber: 1,
        lastRepeatDate: date,
        errorsCount: 0,
      }
    }
  })

  await getWordDataById('5e9f5ee35eb9e72bc21af6a0');
}