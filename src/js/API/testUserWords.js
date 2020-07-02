import { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords } from './userWordsAPI';
import { getRoundData, getWordDataById } from './dataAPI';

export default async function testUserWords() {
  console.log(`userID ${localStorage.getItem('userId')}`);
  console.log(`userToken ${localStorage.getItem('userToken')}`);

  // const roundData = await getRoundData(1, 1, 20);
  // console.log(roundData);

  // const allUserWords = await getAllUserWords();
  // console.log(allUserWords);

   const date = new Date();

  // createUserWord({
  //   wordId: '5e9f5ee35eb9e72bc21af6a0',
  //   word: {
  //     'difficulty': 'low',
  //     'optional': {
  //       status: 'new',
  //       lastTrainNumber: 1,
  //       lastRepeatDate: date,
  //       errorsCount: 0,
  //     }
  //   }
  // });

  // deleteUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  getUserWord({ wordId: '5e9f5ee35eb9e72bc21af6a0' });

  // updateUserWord({
  //   wordId: '5e9f5ee35eb9e72bc21af6a0',
  //   word: {
  //     'difficulty': 'high',
  //     'optional': {
  //       status: 'new',
  //       lastTrainNumber: 1,
  //       lastRepeatDate: date,
  //       errorsCount: 0,
  //     }
  //   }
  // })

  // const data = await getWordDataById('5e9f5ee35eb9e72bc21af6a0');
  // console.log(data);
}