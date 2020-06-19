import { getRoundData } from '../../API/dataAPI';

export default class TrainingGame {
  constructor({ newWordsPerDay, maxCardsPerDay }) {
    this.newWordsPerDay = newWordsPerDay;
    this.maxCardsPerDay = maxCardsPerDay;
    this.isFinished = false;
  }

  async getData() {
    this.level = 1;
    this.round = 1;
    const data = await getRoundData(this.level, this.round, this.newWordsPerDay);
    this.data = data;
    console.log(this.data);
  }

  renderData(wordData) {
    console.log(wordData);
    document.querySelector('.card__word').textContent = wordData.word;
    document.querySelector('.card__transcription').textContent = wordData.transcription;
    document.querySelector('.card__translation').textContent = wordData.wordTranslate;
    document.querySelector('.card__explanation-sentence').innerHTML = wordData.textMeaning;
    document.querySelector('.card__explanation-sentence-translation').innerHTML = wordData.textMeaningTranslate;
    document.querySelector('.card__example-sentence').innerHTML = wordData.textExample;
    document.querySelector('.card__example-sentence-translation').innerHTML = wordData.textExampleTranslate;
    document.querySelector('.card-img__container').style.backgroundImage = `url('https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${wordData.image}')`;
  }
}