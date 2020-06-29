import paintings1 from './paintingsData/level1';
import paintings2 from './paintingsData/level2';
import paintings3 from './paintingsData/level3';
import paintings4 from './paintingsData/level4';
import paintings5 from './paintingsData/level5';
import paintings6 from './paintingsData/level6';

function createWordElement(word, numb, wordLength) {
  const wordText = document.createElement('span');
  wordText.className = 'text';
  wordText.textContent = word;

  const segmentLeft = document.createElement('span');
  segmentLeft.className = 'left';

  const segmentRight = document.createElement('span');
  segmentRight.className = 'right';

  const wordContainer = document.createElement('span');
  wordContainer.className = 'word-container data__word current';
  wordContainer.dataset.word = `w${numb}`;
  wordContainer.setAttribute('draggable', 'true');
  wordContainer.style.flexGrow = wordLength;

  wordContainer.append(segmentLeft);
  wordContainer.append(segmentRight);
  wordContainer.append(wordText);
  return wordContainer;
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

function getActualSentence() {
  const dataWords = document.querySelectorAll('.result__sentence.current>.word-container');
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

function mixSentenceWords() {
  const sentenceArray = document.querySelectorAll('.data__sentence>.word-container');
    const sentenceArrayMixed = mixArrayElements(Array.from(sentenceArray));
    document.querySelector('.data__sentence').innerHTML = '';
    sentenceArrayMixed.forEach((el) => {
      document.querySelector('.data__sentence').append(el);
    });
}

function changeButtonStateByLocalStorageData (itemTitle, button) {
  if (localStorage.getItem(itemTitle) === null) {
    localStorage.setItem(itemTitle, 'true');
  }
  if (localStorage.getItem(itemTitle) === 'true') {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
}

function checkActiveHints() {
  const autoPronunciationButton = document.querySelector('.menu__button.auto-pronunciation');
  const translationButton = document.querySelector('.menu__button.translation');
  const sentencePronunciationButton = document.querySelector('.menu__button.sentence-pronunciation');
  const bckImageButton = document.querySelector('.menu__button.bck-image');

  changeButtonStateByLocalStorageData('autoPronunciation', autoPronunciationButton);
  changeButtonStateByLocalStorageData('translation', translationButton);
  changeButtonStateByLocalStorageData('sentencePronunciation', sentencePronunciationButton);
  changeButtonStateByLocalStorageData('bckImage', bckImageButton);
}

function checkLocalStorageItem(itemTitle) {
  if (localStorage.getItem(itemTitle) === 'true') {
    localStorage.setItem(itemTitle, 'false');
  } else {
    localStorage.setItem(itemTitle, 'true');
  }
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
  createWordElement, createStatisticSentence, getActualSentence, mixSentenceWords,
  checkActiveHints, checkLocalStorageItem, getPaintingImageSrc, getPaintingInfo
};
