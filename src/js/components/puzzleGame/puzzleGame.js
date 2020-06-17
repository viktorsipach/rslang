import renderStartPage from './renderStartPage';
import renderMainPage from './renderMainPage';

export default function initPuzzleGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderStartPage());

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('start__button')) {
      PAGECONTAINER.innerHTML = '';
      PAGECONTAINER.append(renderMainPage());
    }
  });
}
