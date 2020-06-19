function showAnswer(errorCount, lettersCount) {
  const input = document.querySelector('.card__input');
  input.setAttribute('placeholder', '');
  input.value = '';
  console.log(errorCount, lettersCount);
  if (errorCount >= lettersCount/2) {
    console.log('red')
  } else {
    console.log('yellow');
  }
  document.querySelector('.letters-container').classList.remove('hidden');
}

function hideAnswer(attr) {
  const input = document.querySelector('.card__input');
  document.querySelector('.letters-container').classList.add('hidden');
  input.setAttribute('placeholder', attr);
}

export { showAnswer, hideAnswer }