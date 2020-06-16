import renderStartPage from './renderStartPage';

export default function initPuzzleGame() {
  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderStartPage());
}
