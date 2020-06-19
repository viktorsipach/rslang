import { getRoundData } from '../../API/dataAPI';
import { showAnswer, hideAnswer, renderWordData } from './utils';
export default class TrainingGame {
  constructor({ newWordsPerDay, maxCardsPerDay }) {
    this.newWordsPerDay = newWordsPerDay;
    this.maxCardsPerDay = maxCardsPerDay;
    this.isFinished = false;
  }

  async getData() {
    this.level = 1;
    this.round = 1;
    this.wordCount = 0;
    const data = await getRoundData(this.level, this.round, this.newWordsPerDay);
    this.data = data;
    console.log(this.data);
  }

  renderData() {
    this.wordData = this.data[this.wordCount]; 
    renderWordData(this.wordData);
  }

  createWordLetters(){
    const fragment = document.createDocumentFragment();
    this.data[this.wordCount].word.split('').forEach(element => {
      const letter = document.createElement('span');
      letter.textContent = element;
      fragment.append(letter);
    });
    return fragment;
  }

  checkInput() {
    const input = document.querySelector('.card__input');

    document.querySelector('.letters-container').innerHTML = '';
    document.querySelector('.letters-container').append(this.createWordLetters());

    const inputValue = input.value;
    const inputLetters = inputValue.split('');

    const wordLetters = document.querySelectorAll('.letters-container>*');
    const lettersCount = this.wordData.word.length;
    let errorCount = 0;
    for(let i=0; i< wordLetters.length; i += 1) {
      if (wordLetters[i].textContent === inputLetters[i]) {
        wordLetters[i].dataset.isRight = 'green';
      } else {
        wordLetters[i].dataset.isRight = 'yellow';
        errorCount += 1;
      }
    }
    if (errorCount === 0) {
      input.value = '';
      this.wordCount += 1;
      console.log(this.wordCount);
      if (this.wordCount === this.maxCardsPerDay) {
        showAnswer(errorCount, lettersCount);
        setTimeout(hideAnswer, 5000, this.data[this.wordCount]);
        console.log('stop game');
      } else {
        showAnswer(errorCount, lettersCount);
        setTimeout(hideAnswer, 5000, this.data[this.wordCount]);
        setTimeout(renderWordData, 5000, this.data[this.wordCount]);
      }
    } else {
      showAnswer(errorCount, lettersCount);
      setTimeout(hideAnswer, 5000, this.data[this.wordCount].word);
    }
  }

  showWord() {
    const input = document.querySelector('.card__input');
    input.value = this.data[this.wordCount].word;
    this.wordCount += 1;
    setTimeout(renderWordData, 5000, this.data[this.wordCount]);
  }
}   