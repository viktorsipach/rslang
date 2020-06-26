import { createWordElement, getActualSentence, getPaintingImageSrc } from './utils';

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
    const fragment = document.createDocumentFragment();
    sentenceArray.forEach((el, index) => {
      const wordLength = el.length;
      fragment.append(createWordElement(el, index, wordLength));
    });
    sentenceElement.append(fragment);
    return sentenceElement;
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

  showBckImage(level, round) {
    this.isBckImageHintUsed = true;
    const imgSrcPath = getPaintingImageSrc(level, round);

    const wordContainers = document.querySelectorAll('.current.word-container');
      Array.from(wordContainers).forEach((el) => {
        const currentWord = el;
        currentWord.style.boxShadow = 'none';
        currentWord.style.borderRadius = '0';
        currentWord.style.backgroundImage =  imgSrcPath;
      }); 
  }

  showSentenceTranslation() {
    const sentenceTranslation = this.textExampleTranslate;
    document.querySelector('.hints__sentence').textContent = sentenceTranslation;
    this.isTranslationHintUsed = true;
  }
}
