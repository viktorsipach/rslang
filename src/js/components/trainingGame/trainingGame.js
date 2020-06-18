import renderTrainingGamePage from './renderTrainingGamePage';

export default function initTrainingGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderTrainingGamePage());

  window.onload = function() {
    const input = document.querySelector('.card__input');
    input.setAttribute('size', input.getAttribute('placeholder').length);
  }
}