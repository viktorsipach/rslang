export default function renderStartPage() {
  const fragment = document.createDocumentFragment();

  const gameTitle = document.createElement('h2');
  gameTitle.className = 'game__title_puzzle';
  gameTitle.textContent = 'ПАЗЛ';

  const gameRules = document.createElement('div');
  gameRules.className = 'game__rules';
  gameRules.innerHTML = `
    Соберите предложения из слов!
    <br>
    Можно кликать по словам или перетягивать их.
    <br>
    Перед началом игры выберите в меню подсказки!
    `;
  const gameContainer = document.createElement('div');
  gameContainer.className = 'gameContainer__puzzle'
  gameContainer.append(gameTitle);
  gameContainer.append(gameRules);

  const gameContainerWrapper = document.createElement('div');
  gameContainerWrapper.className = 'gameContainer-wrapper__puzzle';
  gameContainerWrapper.append(gameContainer);

  const startButton = document.createElement('button');
  startButton.className = 'button start__button start__button_puzzle';
  startButton.textContent = 'Начать игру';
  
  const startPage = document.createElement('div');
  startPage.className = 'start__page game__puzzle';
  startPage.append(gameContainerWrapper);
  startPage.append(startButton);

  fragment.append(startPage);
  return fragment;
}
