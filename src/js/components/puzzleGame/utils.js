import paintings1 from './paintingsData/level1';
import paintings2 from './paintingsData/level2';
import paintings3 from './paintingsData/level3';
import paintings4 from './paintingsData/level4';
import paintings5 from './paintingsData/level5';
import paintings6 from './paintingsData/level6';

function createWordElement(word, numb, wordLength) {
  const wordContainer = document.createElement('span');
  wordContainer.className = 'word-container current';
  wordContainer.style.flexGrow = wordLength;
  const wordElement = document.createElement('span');
  wordElement.className = 'word data__word';
  wordElement.dataset.word = `w${numb}`;
  wordElement.setAttribute('draggable', 'true');
  wordElement.textContent = word;
  wordContainer.append(wordElement);
  return wordContainer;
}

function getActualSentence() {
  const dataWords = document.querySelectorAll('.result__sentence.current>.word-container>.data__word');
  const actualSentenceArray = [];
  dataWords.forEach((el) => {
    actualSentenceArray.push(el);
  });
  return actualSentenceArray;
}

function mixArrayElements(array) {
  const arrayMixed = [];
  const arrayLength = array.length;
  for (let i = 0; i < arrayLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * array.length);
    const randomWord = array[randomNumber];
    array.splice(randomNumber, 1);
    arrayMixed.push(randomWord);
  }
  return arrayMixed;
}

function checkActiveHints() {
  if (localStorage.getItem('autoPronunciation') === null) {
    localStorage.setItem('autoPronunciation', 'true');
  }
  if (localStorage.getItem('translation') === null) {
    localStorage.setItem('translation', 'true');
  }
  if (localStorage.getItem('sentencePronunciation') === null) {
    localStorage.setItem('sentencePronunciation', 'true');
  }
  if (localStorage.getItem('bckImage') === null) {
    localStorage.setItem('bckImage', 'false');
  }

  const autoPronunciationButton = document.querySelector('.menu__button.auto-pronunciation');
  if (localStorage.getItem('autoPronunciation') === 'true') {
    autoPronunciationButton.classList.add('active');
  } else {
    autoPronunciationButton.classList.remove('active');
  }

  const translationButton = document.querySelector('.menu__button.translation');
  if (localStorage.getItem('translation') === 'true') {
    translationButton.classList.add('active');
  } else {
    translationButton.classList.remove('active');
  }

  const sentencePronunciationButton = document.querySelector('.menu__button.sentence-pronunciation');
  if (localStorage.getItem('sentencePronunciation') === 'true') {
    sentencePronunciationButton.classList.add('active');
  } else {
    sentencePronunciationButton.classList.remove('active');
  }

  const bckImageButton = document.querySelector('.menu__button.bck-image');
  if (localStorage.getItem('bckImage') === 'true') {
    bckImageButton.classList.add('active');
  } else {
    bckImageButton.classList.remove('active');
  }
}

function createStatisticSentence(sentenceObj) {
  const sentence = document.createElement('div');
  sentence.className = 'statistic-sentence';

  const icon = document.createElement('i');
  icon.className = 'icon icon__sentence icon__statistic';
  icon.dataset.audio = sentenceObj.audioExample;

  const iconContainer = document.createElement('span');
  iconContainer.className = 'icon-container';
  iconContainer.append(icon);

  const sentenceContent = document.createElement('div');
  sentenceContent.className = 'sentence-content';
  sentenceContent.textContent = sentenceObj.textExample;

  sentence.append(iconContainer);
  sentence.append(sentenceContent);
  return sentence;
}

function mixSentenceWords() {
  const sentenceArray = document.querySelectorAll('.data__sentence>.word-container');
    const sentenceArrayMixed = mixArrayElements(Array.from(sentenceArray));
    document.querySelector('.data__sentence').innerHTML = '';
    sentenceArrayMixed.forEach((el) => {
      document.querySelector('.data__sentence').append(el);
    });
}

function getPaintingsDataFile(level) {
  let paintingsData;
  switch (level) {
    case 1:
      paintingsData = paintings1;
      break;
    case 2:
      paintingsData = paintings2;
      break;
    case 3:
      paintingsData = paintings3;
      break;
    case 4:
      paintingsData = paintings4;
      break;
    case 5:
      paintingsData = paintings5;
      break;
    case 6:
      paintingsData = paintings6;
      break;
    default:
      break;
  }
  return paintingsData;
}

function getPaintingImageSrc(level, round) {
  const paintingsData = getPaintingsDataFile(level);
  const imgSrc = paintingsData[round - 1].imageSrc;
  const imgSrcPath = `url('https://raw.githubusercontent.com/YekaterinaKarakulina/rslang_data_paintings/master/${imgSrc}')`;
  return imgSrcPath;
}

function getPaintingInfo(level, round) {
  const paintingsData = getPaintingsDataFile(level);
  const paintingAuthor = paintingsData[round - 1].author;
  const paintingName = paintingsData[round - 1].name;
  const paintingYear = paintingsData[round - 1].year;
  const paintingInfo = `${paintingAuthor} - ${paintingName} (${paintingYear})`;
  return paintingInfo;
}

export {
  createWordElement, getActualSentence, checkActiveHints, createStatisticSentence, 
  mixSentenceWords, getPaintingImageSrc, getPaintingInfo
};
