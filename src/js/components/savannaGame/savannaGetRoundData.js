import { getRoundData } from '../../API/dataAPI';

export default async function savannaRoundDataAPI() {
  const level = 1;
  const round = 1;
  const wordsPerRound = 10;
  const data = await getRoundData(level, round, wordsPerRound);
//   console.log(data);
  return data;
}