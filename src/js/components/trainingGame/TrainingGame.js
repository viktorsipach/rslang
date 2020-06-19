import { getRoundData } from '../../API/dataAPI';
import { showAnswer, hideAnswer } from './utils';

export default class TrainingGame {
  constructor({ newWordsPerDay, maxCardsPerDay }) {
    this.newWordsPerDay = newWordsPerDay;
    this.maxCardsPerDay = maxCardsPerDay;
    this.isFinished = false;
  }

  async getData() {
    this.level = 1;
    this.round = 1;
    this.word = 1;
    const data = await getRoundData(this.level, this.round, this.newWordsPerDay);
    this.data = data;
    console.log(this.data);
  }

  renderData(data) {
    const wordData = data[this.word]; 
    console.log(wordData);
    document.querySelector('.card__word').textContent = wordData.word;
    document.querySelector('.card__transcription').textContent = wordData.transcription;
    document.querySelector('.card__translation').textContent = wordData.wordTranslate;
    document.querySelector('.card__explanation-sentence').innerHTML = wordData.textMeaning;
    document.querySelector('.card__explanation-sentence-translation').innerHTML = wordData.textMeaningTranslate;
    document.querySelector('.card__example-sentence').innerHTML = wordData.textExample;
    document.querySelector('.card__example-sentence-translation').innerHTML = wordData.textExampleTranslate;
    document.querySelector('.card-img__container').style.backgroundImage = `url('https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${wordData.image}')`;
    const input = document.querySelector('.card__input');
    input.setAttribute('placeholder', wordData.word);
    
    input.setAttribute('size', wordData.word.length);
    input.setAttribute('maxlength', wordData.word.length);
    input.focus();
  }

  createWordLetters(data){
    const fragment = document.createDocumentFragment();

    data[this.word].word.split('').forEach(element => {
      const letter = document.createElement('span');
      letter.textContent = element;
      fragment.append(letter);
    });
    return fragment;
  }

  checkInput(data) {
    const input = document.querySelector('.card__input');

    document.querySelector('.letters-container').innerHTML = '';
    document.querySelector('.letters-container').append(this.createWordLetters(data));

    const inputValue = input.value;
    const inputLetters = inputValue.split('');

    const wordLetters = document.querySelectorAll('.letters-container>*');
    const lettersCount = data[this.word].word.length;
    let errorCount = 0;
    for(let i=0; i< wordLetters.length; i += 1) {
      if (wordLetters[i].textContent === inputLetters[i]) {
        wordLetters[i].classList.add('true');
      } else {
        wordLetters[i].classList.add('false');
        errorCount += 1;
      }
    }
    showAnswer(errorCount, lettersCount);
    setTimeout(hideAnswer, 5000, data[this.word].word);
  }
}   