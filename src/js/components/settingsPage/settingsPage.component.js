import  { renderSettingsPage } from './renderSettingsPage';
import initSettingsObject from './initSettingsObject';
import { getRoundData } from '../../API/dataAPI';
import { randomIntFromInterval } from './utils';
import testUserSettings from '../../API/testUserSettings';

async function getRandomCardData() {
  const levelMinValue = 1;
  const levelMaValue = 6;
  const roundMinValue = 1;
  const roundMaxValue = 600;
  const level = randomIntFromInterval(levelMinValue, levelMaValue);
  const round = randomIntFromInterval(roundMinValue, roundMaxValue);
  const wordsAmount = 1;
  const data = await getRoundData(level, round, wordsAmount);
  return data;
}

export default async function initSetting() {
  const cardData = await getRandomCardData();
  renderSettingsPage(cardData);
  initSettingsObject();
  testUserSettings()
}
