function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function elementClassToggle(element, className) {
  element.classList.toggle(className);
}

function checkMainFieldSentenceVisibility(sentence, sentenceTranslation) {
  const SHOW_SENTENCES_TRANSLATIONS__CHECKBOX = document.querySelector('.showSentencesTranslations input');
  if (sentence.classList.contains('hidden')) {
    sentenceTranslation.classList.add('hidden');
  } else if(!sentence.classList.contains('hidden')) {
    if (SHOW_SENTENCES_TRANSLATIONS__CHECKBOX.checked) {
      sentenceTranslation.classList.remove('hidden');
    } else {
      sentenceTranslation.classList.add('hidden');
    }
  }
}

function checkSentencesTranslationsCheckbox(sentenceTranslation, sentenceCheckbox) {
  if (sentenceCheckbox.checked) {
    sentenceTranslation.classList.toggle('hidden');
  } else {
    sentenceTranslation.classList.add('hidden');
  }
}

export { randomIntFromInterval, elementClassToggle,
  checkMainFieldSentenceVisibility, checkSentencesTranslationsCheckbox };
  