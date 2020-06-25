function renderCheckBoxElement(containerClass, textContent) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = 'checked';

  const checkMark = document.createElement('span');
  checkMark.className = 'checkmark';

  const container = document.createElement('label');
  container.className = `checkbox-container ${containerClass}`;
  container.textContent = textContent;
  container.append(input);
  container.append(checkMark);
  return container;
}

function renderMenuSettings() {
  const  menuSettings = document.createElement('div');
  menuSettings.className = 'game__settings';
  menuSettings.append(renderCheckBoxElement('new-words', 'Новые слова'));
  menuSettings.append(renderCheckBoxElement('known-words', 'Изученные слова'));
  return menuSettings;
}

function renderMenuIcon(buttonClass, buttonIconClass) {
  const buttonIcon = document.createElement('icon');
  buttonIcon.className = `icon ${buttonIconClass}`;

  const button = document.createElement('button');
  button.className = `button ${buttonClass}`;
  button.append(buttonIcon);
  return button;  
}

function renderMenuIcons() {
  const menuIcons = document.createElement('div');
  menuIcons.className = 'menu__icons';
  menuIcons.append(renderMenuIcon('menu__button training-icon auto-pronunciation ', 'icon__auto-pronunciation'));
  menuIcons.append(renderMenuIcon('menu__button training-icon show-translation ', 'icon__show-translation'));
  return menuIcons;
}

function renderTrainingGameMenu() {
  const menu = document.createElement('div');
  menu.className = 'game__menu trainingGame__menu';
  menu.append(renderMenuSettings());
  menu.append(renderMenuIcons());
  return menu;
}

function  renderCardTop() {
  const cardTranscription = document.createElement('div');
  cardTranscription.className = 'card__transcription';

  const cardTranslation = document.createElement('div');
  cardTranslation.className = 'card__translation';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img__container';
  
  const cardTop = document.createElement('div');
  cardTop.className = 'card__top';
  cardTop.append(cardTranslation);
  cardTop.append(cardTranscription);
  cardTop.append(imgContainer);
  return cardTop;
}

function  renderCardBottom() {
  const explanationSentence = document.createElement('div');
  explanationSentence.className = 'card__explanation-sentence';

  const exampleSentence = document.createElement('div');
  exampleSentence.className = 'card__example-sentence';

  const explanationSentenceTranslation = document.createElement('div');
  explanationSentenceTranslation.className = 'card__explanation-sentence-translation hidden';

  const exampleSentenceTranslation = document.createElement('div');
  exampleSentenceTranslation.className = 'card__example-sentence-translation hidden';

  const sentencesContainer = document.createElement('div');
  sentencesContainer.className = 'sentences__container';
  sentencesContainer.append(explanationSentence);
  sentencesContainer.append(explanationSentenceTranslation);
  sentencesContainer.append(exampleSentence);
  sentencesContainer.append(exampleSentenceTranslation);
  
  const input = document.createElement('input');
  input.className = 'card__input';
  input.spellcheck = false;
  input.type = 'text';

  const wordLettersContainer = document.createElement('div');
  wordLettersContainer.className = 'letters-container hidden';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'input__container';
  inputContainer.append(input);
  inputContainer.append(wordLettersContainer);
  
  const cardBottom = document.createElement('div');
  cardBottom.className = 'card__bottom';
  cardBottom.append(sentencesContainer);
  cardBottom.append(inputContainer);
  return cardBottom;
}

function  renderTrainingCard() {
  const card = document.createElement('div');
  card.className = 'training__card';
  card.append(renderCardTop());
  card.append(renderCardBottom());
  return card;  
}

function renderButton(buttonClass, buttonText) {
  const button = document.createElement('button');
  button.className = `button ${buttonClass}`;
  button.textContent = buttonText;
  return button;
}

function renderDictionaryButtons() {
  const dictionaryButtons = document.createElement('div');
  dictionaryButtons.className = 'buttons dictionary__buttons';
  dictionaryButtons.append(renderButton('dictionary__button delete', 'Удалить слово'));
  dictionaryButtons.append(renderButton('dictionary__button hard', 'Сложное слово'));
  return dictionaryButtons;
}

function renderGameButtons() {
  const gameButtons = document.createElement('div');
  gameButtons.className = 'buttons game__buttons training-game';
  gameButtons.append(renderButton('trainingGame__button dontKnow', 'Не знаю'));
  gameButtons.append(renderButton('trainingGame__button next', 'Далее'));
  return gameButtons;
}

function renderProgressBar() {
  const progressLine = document.createElement('span');
  progressLine.className = 'progress__line';

  const progressLineContainer = document.createElement('span');
  progressLineContainer.className = 'progress__line-container';
  progressLineContainer.append(progressLine);

  const progressValue = document.createElement('span');
  progressValue.className = 'progress__value';

  const progressBar = document.createElement('div');
  progressBar.className = 'progress__bar training__progress';
  progressBar.append(progressValue);
  progressBar.append(progressLineContainer);

  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = 'progress__bar-container ';
  progressBarContainer.append(progressBar);
  return progressBarContainer;
}

export default function  renderTrainingGamePage() {
  const mainPage = document.createElement('div');
  mainPage.className = 'game__training';
  mainPage.append(renderTrainingGameMenu());
  mainPage.append(renderTrainingCard());
  mainPage.append(renderDictionaryButtons());
  mainPage.append(renderGameButtons());
  mainPage.append(renderProgressBar());

  const mainPageWrapper = document.createElement('div');
  mainPageWrapper.className = 'game__training-wrapper';
  mainPageWrapper.append(mainPage);

  return mainPageWrapper;
}