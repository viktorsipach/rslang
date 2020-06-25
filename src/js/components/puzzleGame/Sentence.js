import { createWordElement, getActualSentence, mixArrayElements } from './utils';

export default class Sentence {
  constructor({
    audioExample, textExample, textExampleTranslate,
  }) {
    this.audioExample = audioExample;
    this.textExample = textExample;
    this.textExampleTranslate = textExampleTranslate;

    this.bIsTranslationHintUsed = false;
    this.bIsBckImageHintUsed = false;
    this.bIsPronunciationHintUsed = false;
  }

  createDataSentence() {
    const sentenceElement = document.createElement('div');
    sentenceElement.className = 'sentence data__sentence';
    sentenceElement.dataset.audio = this.audioExample;
    sentenceElement.dataset.text = this.textExample;
    sentenceElement.dataset.textTranslation = this.textExampleTranslate;

    const sentenceArray = this.textExample.split(' ');
    this.length = sentenceArray.length;

    const sentenceArrayMixed = mixArrayElements(sentenceArray);

    const fragment = document.createDocumentFragment();
    sentenceArrayMixed.forEach((el, index) => {
      const wordLength = 1;
      fragment.append(createWordElement(el, index, wordLength));
    });

    sentenceElement.append(fragment);
    return sentenceElement;
  }

  buildSentence() {
    const sentenceArray = this.textExample.split(' ');
    const fragment = document.createDocumentFragment();
    sentenceArray.forEach((el, index) => {
      const wordLength = el.length;
      fragment.append(createWordElement(el, index, wordLength));
    });
    document.querySelector('.result__sentence.current').innerHTML = '';
    fragment.querySelectorAll('.word-container').forEach((el) => {
      document.querySelector('.result__sentence.current').append(el);
    });
    document.querySelector('.data-container').innerHTML = '';
  }

  checkSentence() {
    const expectedSentence = this.textExample.split(' ');
    const actualSentence = getActualSentence();
    let errors = 0;
    actualSentence.forEach((el) => {
      el.parentElement.classList.remove('true');
      el.parentElement.classList.remove('false');
    });
    for (let i = 0; i < expectedSentence.length; i += 1) {
      if (expectedSentence[i] === actualSentence[i].textContent) {
        actualSentence[i].parentElement.classList.add('true');
      } else {
        actualSentence[i].parentElement.classList.add('false');
        errors += 1;
      }
    }
    this.errors = errors;
    return errors;
  }

  playSentenceSound() {
    const soundIcon = document.querySelector('.icon__sound');
    const sound = new Audio();
    sound.src = `https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.audioExample}`;
    sound.play();
    soundIcon.classList.add('active');
    sound.onended = () => {
      soundIcon.classList.remove('active');
    };
    this.isPronunciationHintUsed = true;
  }

  showBckImage() {
    this.isBckImageHintUsed = true;
    console.log('showBckImage');
    console.log('add backgr');
    const words = document.querySelectorAll('.result__sentence.current>.word-container>.data__word');
    Array.from(words).forEach((el) => {
      el.style.backgroundColor = 'transparent';
    });

    const wordContainers = document.querySelectorAll('.result__sentence.current>.word-container');
    Array.from(wordContainers).forEach((el) => {
      // el.style.border = 'none';
      // el.style.boxShadow = 'none';
    });

    const currentResultSentence = document.querySelector('.result__sentence.current');
    currentResultSentence.style.backgroundColor = 'transparent';

  }

  showSentenceTranslation() {
    const sentenceTranslation = this.textExampleTranslate;
    document.querySelector('.hints__sentence').textContent = sentenceTranslation;
    this.isTranslationHintUsed = true;
  }
}
