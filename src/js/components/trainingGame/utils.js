function renderWordData(wordData) {
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

function showAnswer(errorCount, lettersCount) {
  const input = document.querySelector('.card__input');
  input.setAttribute('placeholder', '');
  input.value = '';
  console.log(`errorCount ${errorCount} lettersCount ${lettersCount}`);
  if (errorCount >= lettersCount/2) {
    const wordLetters = document.querySelectorAll('.letters-container>*');
    Array.from(wordLetters).forEach((element) => {
      if (element.dataset.isRight === 'yellow') {
        element.dataset.isRight = 'red';
      }
    })
  }
  document.querySelector('.letters-container').classList.remove('hidden');
}

function hideAnswer(attr) {
  const input = document.querySelector('.card__input');
  document.querySelector('.letters-container').classList.add('hidden');
  input.setAttribute('placeholder', attr);
}

export { showAnswer, hideAnswer, renderWordData }