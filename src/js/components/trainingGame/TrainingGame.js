import { getRoundData } from '../../API/dataAPI';

export default class TrainingGame {
  constructor(settings) {
    this.settings = settings;
    this.newWordsPerDay = this.settings.newWordsPerDay;
    this.maxCardsPerDay = this.settings.maxCardsPerDay;
    this.cardSettings = this.settings.cardSettings;
    this.autoPronunciation = settings.autoPronunciation;
    this.showDeleteButton = settings.showDeleteButton;
    this.showHardButton = settings.showHardButton;
  }

  async getData() {
    this.level = 1;
    this.round = 1;
    this.currentCardNumber = 0;
    const data = await getRoundData(this.level, this.round, this.newWordsPerDay);
    return data;
  }

  renderCardData() {
    this.cardData = this.data[this.currentCardNumber];

    console.log(this.cardData);
    if (this.cardSettings.showTranscription) {
      document.querySelector('.menu__button.show-translation').classList.add('active');
      document.querySelector('.card__transcription').textContent = this.cardData.transcription;
    } 
    else {
      document.querySelector('.menu__button.show-translation').classList.remove('active');
    }
    if (this.autoPronunciation) {
      document.querySelector('.menu__button.auto-pronunciation').classList.add('active');
    } 
    else {
      document.querySelector('.menu__button.auto-pronunciation').classList.remove('active');
    }
    
    
    if (this.cardSettings.showTranslation) {
      document.querySelector('.card__translation').textContent = this.cardData.wordTranslate;
    }
    if (this.cardSettings.showExplanationSentence) {
      const regex = new RegExp(`(<i>[\\W\\w\\~]*<\\/i>)`);
  
      let wordFromTextMeaning = this.cardData.textMeaning.match(regex)[0];
      wordFromTextMeaning = wordFromTextMeaning.replace(/<i>/, '').replace(/<\/i>/, '');
      // console.log(wordFromTextMeaning);
  
      const textMeaning = this.cardData.textMeaning.replace(regex, `<span class="hidden">${wordFromTextMeaning}</span>`);
  
      document.querySelector('.card__explanation-sentence').innerHTML = textMeaning;
      document.querySelector('.card__explanation-sentence-translation').classList.add('hidden');
      document.querySelector('.card__explanation-sentence-translation').innerHTML = this.cardData.textMeaningTranslate;
    } 
    if (this.cardSettings.showExampleSentence) {
      const regex = new RegExp(`(<b>[\\W\\w\\~]*<\\/b>)`);
      let wordFromTextExample = this.cardData.textExample.match(regex)[0];
      wordFromTextExample = wordFromTextExample.replace(/<b>/, '').replace(/<\/b>/, '');
      // console.log(wordFromTextExample);
  
      const textExample = this.cardData.textExample.replace(regex, `<span class="hidden">${wordFromTextExample}</span>`);
  
      document.querySelector('.card__example-sentence').innerHTML = textExample;
      document.querySelector('.card__example-sentence-translation').classList.add('hidden');
      document.querySelector('.card__example-sentence-translation').innerHTML = this.cardData.textExampleTranslate;
    } 
    if (this.cardSettings.showAssociatedPicture) {
      document.querySelector('.card-img__container').style.backgroundImage = `url('https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.cardData.image}')`;
    }
    const input = document.querySelector('.card__input');
    input.value = '';
    input.setAttribute('placeholder', this.cardData.word);
    input.setAttribute('size', this.cardData.word.length);
    input.setAttribute('maxlength', this.cardData.word.length);
    input.focus();
  }


  createWordLetters(){
    const fragment = document.createDocumentFragment();
    this.data[this.currentCardNumber].word.split('').forEach(element => {
      const letter = document.createElement('span');
      letter.textContent = element;
      fragment.append(letter);
    });
    return fragment;
  }

  playCardSounds() {
      const wordSound = new Audio();
      wordSound.src = `https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.cardData.audio}`;
      wordSound.play();
      wordSound.onended = () => {
        const meaningSound = new Audio();
        meaningSound.src = `https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.cardData.audioMeaning}`;
        meaningSound.play();
        meaningSound.onended = () => {
          const exampleSound = new Audio();
          exampleSound.src = `https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.cardData.audioExample}`;
          exampleSound.play();
          exampleSound.onended = () => {
            this.hideAnswer();
            this.renderCardData();
          }
        }
      };
  }


  showAnswer () {
    const input = document.querySelector('.card__input');
    input.setAttribute('placeholder', '');
    input.value = '';
    console.log(`errorCount ${this.errorCount} lettersCount ${this.lettersCount}`);
    if (this.errorCount >= this.lettersCount/2) {
      const wordLetters = document.querySelectorAll('.letters-container>*');
      Array.from(wordLetters).forEach((element) => {
        if (element.dataset.isRight === 'yellow') {
          element.dataset.isRight = 'red';
        }
      })
    } else if (this.errorCount === 0) {
      document.querySelector('.card__explanation-sentence-translation').classList.remove('hidden');
      document.querySelector('.card__example-sentence-translation').classList.remove('hidden');
      document.querySelector('.card__explanation-sentence>span').classList.remove('hidden');
      document.querySelector('.card__example-sentence>span').classList.remove('hidden');
      if (this.currentCardNumber < this.maxCardsPerDay) {
        if (this.autoPronunciation) {
          this.playCardSounds();
        } else {
          setTimeout(function fn(){ this.hideAnswer(); }.bind(this), 5000);
          setTimeout(function fn(){ this.renderCardData(); }.bind(this), 5000);
        }
      } else {
        console.log('LAST');
        // need to hide answer after 5 sec and create modal
      }
    }
    document.querySelector('.letters-container').classList.remove('hidden');    
  }

  hideAnswer() {
    const input = document.querySelector('.card__input');
    document.querySelector('.letters-container').classList.add('hidden');
    input.setAttribute('placeholder', this.data[this.currentCardNumber].word);
    input.focus();
  }


  checkInput() {
    const input = document.querySelector('.card__input');

    document.querySelector('.letters-container').innerHTML = '';
    document.querySelector('.letters-container').append(this.createWordLetters());

    const inputValue = input.value.toLowerCase();
    const inputLetters = inputValue.split('');

    const wordLetters = document.querySelectorAll('.letters-container>*');
    this.lettersCount = this.data[this.currentCardNumber].word.length;
    this.errorCount = 0;
    for(let i=0; i< wordLetters.length; i += 1) {
      if (wordLetters[i].textContent === inputLetters[i]) {
        wordLetters[i].dataset.isRight = 'green';
      } else {
        wordLetters[i].dataset.isRight = 'yellow';
        this.errorCount += 1;
      }
    }
    if (this.errorCount === 0) {
      input.value = '';
      this.currentCardNumber += 1;
      console.log(`currentCardNumber ${this.currentCardNumber}`);
      if (this.currentCardNumber < this.maxCardsPerDay) {
        this.showAnswer();
      } else {
        this.showAnswer();
        console.log('stop game');
      }
    } else {
      this.showAnswer();
      setTimeout(function fn(){ this.hideAnswer() }.bind(this), 5000);
    }
  }

  showWordWithoutTraining() {
    const input = document.querySelector('.card__input');
    input.value = this.data[this.currentCardNumber].word;
    this.currentCardNumber += 1;
    if (this.autoPronunciation) {
      this.playCardSounds();
    }
    // setTimeout(function fn(){ this.renderCardData() }.bind(this), 5000);
  }
}   