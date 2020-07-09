import renderSwitch from '../gameSwitcher/renderSwitch';

function renderDropdownElement(containerClass, titleClass, title, selectClass, selectId) {
  const selectElement = document.createElement('select');
  selectElement.id = selectId;
 
  const selectContainer = document.createElement('div');
  selectContainer.className = `select ${selectClass}`;
  selectContainer.append(selectElement);

  const titleElement = document.createElement('span');
  titleElement.className = titleClass;
  titleElement.textContent = title;

  const dropDownContainer = document.createElement('div');
  dropDownContainer.className = containerClass;
  dropDownContainer.append(titleElement);
  dropDownContainer.append(selectContainer);
  return dropDownContainer;
}

function renderMenuButton(buttonClass, buttonIconClass) {
  const buttonIcon = document.createElement('i');
  buttonIcon.className = `icon ${buttonIconClass}`;

  const button = document.createElement('button');
  button.className = `button menu__button ${buttonClass}`;
  button.append(buttonIcon);
  return button;  
}

function renderHints() {
  const hints = document.createElement('div');
  hints.className = 'hints main__hints';

  const icon = document.createElement('i');
  icon.className = 'icon icon__sound';

  const iconContainer = document.createElement('span');
  iconContainer.className = 'icon-container';
  iconContainer.append(icon);

  const hintSentence = document.createElement('div');
  hintSentence.className = 'hints__sentence';

  hints.append(iconContainer);
  hints.append(hintSentence);
  return hints;  
}

function renderMainPageMenu() {
  const menuLeft = document.createElement('div');
  menuLeft.className = 'menu__left';
  menuLeft.append(renderDropdownElement('menu__level', 'level__title', 'Уровень', 'select__level', 'selectLevel'));
  menuLeft.append(renderDropdownElement('menu__round', 'round__title', 'Раунд', 'select__round', 'selectRound'));
  
  const menuButtons = document.createElement('div');
  menuButtons.className = 'buttons menu__buttons';
  menuButtons.append(renderMenuButton('auto-pronunciation', 'icon__auto-pronunciation'));
  menuButtons.append(renderMenuButton('translation', 'icon__translation'));
  menuButtons.append(renderMenuButton('sentence-pronunciation', 'icon__sentence-pronunciation'));
  menuButtons.append(renderMenuButton('bck-image', 'icon__bck-image'));

  const menuRight = document.createElement('div');
  menuRight.className = 'menu__right';
  menuRight.append(menuButtons);

  const menu = document.createElement('div');
  menu.className = 'game__menu'  ;
  menu.append(menuLeft);
  menu.append(renderSwitch());
  menu.append(menuRight);

  menu.querySelector('.games-switcher').classList.add('games-switcher__puzzle');
  menu.querySelector('input').classList.add('data-word-checkbox__puzzle');
  return menu;
}

function renderGameResults() {
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'results-container';

  const gameResults = document.createElement('div');
  gameResults.className = 'results main__results';
  gameResults.append(resultsContainer);
  return gameResults;
}

function renderGameData() {
  const dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';

  const gameData = document.createElement('div');
  gameData.className = 'data main__data';
  gameData.append(dataContainer);
  return gameData;
}

function renderGameButton(buttonClass, buttonTitle) {
  const button = document.createElement('button');
  button.className = `button puzzleGame__button ${buttonClass}`;
  button.textContent = buttonTitle;
  return button;
}

function renderGameButtons() {
  const gameButtons = document.createElement('div');
  gameButtons.className = 'buttons game__buttons puzzle-game';
  gameButtons.append(renderGameButton('dontKnow', 'Я не знаю'));
  gameButtons.append(renderGameButton('check hidden', 'Проверить'));
  gameButtons.append(renderGameButton('continue hidden', 'Продолжить'));
  gameButtons.append(renderGameButton('results hidden', 'Результаты'));
  return gameButtons;
}

export default function renderMainPage() {
  const closeButton = document.createElement('div');
  closeButton.className = 'game__close_puzzle puzzle-main close';

  const mainPage = document.createElement('div');
  mainPage.className = 'main__page game__puzzle';
  mainPage.append(renderMainPageMenu());
  mainPage.append(renderHints());
  mainPage.append(renderGameResults());
  mainPage.append(renderGameData());
  mainPage.append(renderGameButtons());
  mainPage.append(closeButton);

  const mainPageWrapper = document.createElement('div');
  mainPageWrapper.className = 'game__puzzle-wrapper';
  mainPageWrapper.append(mainPage);

  return mainPageWrapper;
}
          