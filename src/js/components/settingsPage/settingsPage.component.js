import  renderSettingsPage from './renderSettingsPage';
import createSettingsObject from './createSettingsObject';
import { getRoundData } from '../../API/dataAPI';
import { randomIntFromInterval } from './utils';


async function getRandomCardData() {
  const levelMinValue = 1;
  const levelMaValue = 6;
  const roundMinValue = 1;
  const roundMaxValue = 600;
  const level = randomIntFromInterval(levelMinValue, levelMaValue);
  const round = randomIntFromInterval(roundMinValue, roundMaxValue);
  const wordsAmount = 1;
  console.log(level, round);
  const data = await getRoundData(level, round, wordsAmount);
  return data;
}

export default async function initSetting() {
  const cardData = await getRandomCardData();
console.log(cardData);
  renderSettingsPage(cardData);
  createSettingsObject();
  
}
