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
    sentenceArrayMixed.forEach((el) => {
      fragment.append(createWordElement(el));
    });

    sentenceElement.append(fragment);
    return sentenceElement;
  }

  buildSentence() {
    const sentenceArray = this.textExample.split(' ');
    const fragment = document.createDocumentFragment();
    sentenceArray.forEach((el) => {
      fragment.append(createWordElement(el));
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
  }

  showSentenceTranslation() {
    const sentenceTranslation = this.textExampleTranslate;
    document.querySelector('.hints__sentence').textContent = sentenceTranslation;
    this.isTranslationHintUsed = true;
  }
}
