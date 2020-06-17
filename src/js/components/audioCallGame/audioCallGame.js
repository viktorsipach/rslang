import renderStartPage from './renderStartPage';
import renderGamePage from './renderGamePage';

function startGame() {
  document.querySelector('.game').remove();
  const pageContent = document.querySelector('.page');
  pageContent.append(renderGamePage());
}

export default function initAudioCallGame() {
  const pageContent = document.querySelector('.page');
  pageContent.append(renderStartPage());
  document.querySelector('.game__start').addEventListener('click', startGame);
}

