function renderCheckBoxElement(containerClass, textContent) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = 'checked';

  const checkMark = document.createElement('span');
  checkMark.className = 'checkmark';

  const container = document.createElement('label');
  container.className = `container ${containerClass}`;
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
  const buttonIcon = document.createElement('i');
  buttonIcon.className = `icon ${buttonIconClass}`;

  const button = document.createElement('button');
  button.className = `button menu__button ${buttonClass}`;
  button.append(buttonIcon);
  return button;  
}

function renderMenuIcons() {
  const menuIcons = document.createElement('div');
  menuIcons.className = 'menu__icons';
  menuIcons.append(renderMenuIcon('auto-pronunciation', 'icon__auto-pronunciation'));
  menuIcons.append(renderMenuIcon('word-translation', 'icon__word-translation'));
  menuIcons.append(renderMenuIcon('sentence-translation', 'icon__sentence-translation'));
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
  const cardWord = document.createElement('div');
  cardWord.className = 'card__word';
  cardWord.textContent = 'SomeWord';

  const cardTranscription = document.createElement('div');
  cardTranscription.className = 'card__transcription';
  cardTranscription.textContent = '[SomeWord]';

  const cardTranslation = document.createElement('div');
  cardTranslation.className = 'card__translation';
  cardTranslation.textContent = 'WordTranslation';

  const cardImage = document.createElement('image');
  cardImage.className = 'card__img';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img__container';
  imgContainer.append(cardImage);
  
  const cardTop = document.createElement('div');
  cardTop.className = 'card__top';
  cardTop.append(cardWord);
  cardTop.append(cardTranscription);
  cardTop.append(cardTranslation);
  cardTop.append(imgContainer);
  return cardTop;
}

function  renderCardBottom() {
  const explanationSentence = document.createElement('div');
  explanationSentence.className = 'card__explanation-sentence';
  explanationSentence.textContent = 'Sentence with explanation';

  const exampleSentence = document.createElement('div');
  exampleSentence.className = 'card__example-sentence';
  exampleSentence.textContent = 'Sentence with example';

  const sentencesContainer = document.createElement('div');
  sentencesContainer.className = 'sentences__container';
  sentencesContainer.append(explanationSentence);
  sentencesContainer.append(exampleSentence);
  
  const input = document.createElement('input');
  input.className = 'card__input';
  input.type = 'text';
  input.placeholder = 'Some placeholder';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'input__container';
  inputContainer.append(input);

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
  gameButtons.className = 'buttons game__buttons';
  gameButtons.append(renderButton('trainingGame__button dontKnow', 'Не знаю'));
  gameButtons.append(renderButton('trainingGame__button next', 'Далее'));
  return gameButtons;
}

export default function  renderTrainingGamePage() {
  const mainPage = document.createElement('div');
  mainPage.className = 'game__training';
  mainPage.append(renderTrainingGameMenu());
  mainPage.append(renderTrainingCard());
  mainPage.append(renderDictionaryButtons());
  mainPage.append(renderGameButtons());
  return mainPage;
}