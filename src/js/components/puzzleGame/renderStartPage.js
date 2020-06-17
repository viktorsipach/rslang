export default function renderStartPage() {
  const fragment = document.createDocumentFragment();

  const gameTitle = document.createElement('h2');
  gameTitle.className = 'game__title';
  gameTitle.textContent = 'ПАЗЛ';

  const firstLine = document.createElement('div');
  firstLine.textContent = 'Соберите предложения из слов!';
  const secondLine = document.createElement('div');
  secondLine.textContent = 'Можно кликать по словам или перетягивать их.';
  const thirdLine = document.createElement('div');
  thirdLine.textContent = 'Перед началом игры выберите в меню подсказки!';

  const gameRules = document.createElement('div');
  gameRules.className = 'game__rules';
  gameRules.append(firstLine);
  gameRules.append(secondLine);
  gameRules.append(thirdLine);

  const startButton = document.createElement('button');
  startButton.className = 'button start__button';
  startButton.textContent = 'Начать игру';

  const startPage = document.createElement('div');
  startPage.className = 'start__page game__puzzle';
  startPage.append(gameTitle);
  startPage.append(gameRules);
  startPage.append(startButton);

  fragment.append(startPage);
  return fragment;
}
