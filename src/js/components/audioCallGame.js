import renderStartPage from './renderStartPage';
// import renderGamePage from './renderGamePage';

export default function initAudioCallGame() {
  const pageContent = document.querySelector('.page');
  pageContent.append(renderStartPage());
}