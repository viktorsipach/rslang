export default function  renderTrainingGamePage() {
  window.onload = function() {
    const input = document.querySelector('.card__input');
    input.setAttribute('size', input.getAttribute('placeholder').length);
  }
}