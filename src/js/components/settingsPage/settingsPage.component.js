function createDOMElement(type, classes, textContent) {
  const element = document.createElement(`${type}`);
  element.className = classes;
  element.textContent = textContent;
  return element;
}

function createNumberInput(inputContainer, labelText, inputName, minValue, maxValue) {
  const numberInputContainer = createDOMElement('div', `${inputContainer}`);
  numberInputContainer.innerHTML = 
  ` <label for="${inputName}">${labelText}:</label>
  <input type="number" name="${inputName}" min="${minValue}" max="${maxValue}">`;
  return numberInputContainer;
}

function createToggleSwitchElement(containerClass, switchTitle) {
  const switchTitleElement = createDOMElement('span', 'switch-title');
  switchTitleElement.textContent = switchTitle;

  const switchElement = createDOMElement('label', 'switch');
  switchElement.innerHTML = 
  `<input type="checkbox">
  <span class="slider"></span>`;

  const switchContainer = createDOMElement('div', containerClass);
  switchContainer.append(switchTitleElement);
  switchContainer.append(switchElement);
  return switchContainer;
}


function createCheckBoxElement(containerClass, textContent) {
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

function createMainSettingsFragment() {
  const newWordsPerDay = createNumberInput('', 'Количество новых слов в день', 'newWordsPerDay', '10', '100');
  const maxCardsPerDay = createNumberInput('', 'Максмальное количество карточек в день', 'maxCardsPerDay', '10', '100');

  const autoPronunciation = createToggleSwitchElement('autoPronunciation-container', 'Автопроизношение аудио');
  const showIDontKnowButton = createToggleSwitchElement('iDontKnowButton-container', 'Переход к следующему слову без его ввода');
  const showDeleteButton = createToggleSwitchElement('deleteButton-container', 'Возможность удалять слова из изучения');
  const showHardButton = createToggleSwitchElement('hardButton-container', 'Возможность добавлять слова в сложные');

  const mainSettings = createDOMElement('div', 'main-settings');
  mainSettings.append(newWordsPerDay);
  mainSettings.append(maxCardsPerDay);
  mainSettings.append(autoPronunciation);
  mainSettings.append(showIDontKnowButton);
  mainSettings.append(showDeleteButton);
  mainSettings.append(showHardButton);
  return mainSettings;
}

function createCardRequiredFields() {
  const requiredFieldsTitle = createDOMElement('div', 'required-fields__title', 'Хотя бы один пункт должен быть отмечен');

  const showTranslation = createCheckBoxElement('showTranslation', 'Перевод слова');
  const showExplanationSentence = createCheckBoxElement('showExplanationSentence', 'Предложение с объяснением значения слова');
  const showExampleSentence = createCheckBoxElement('showExampleSentence', 'Предложение с примером использования изучаемого слова');

  const requiredFields = createDOMElement('div', 'required-fields');
  requiredFields.append(requiredFieldsTitle);
  requiredFields.append(showTranslation);
  requiredFields.append(showExplanationSentence);
  requiredFields.append(showExampleSentence);
  return requiredFields;
}

function createCardAdditionalFields() {
  const additionalFieldsTitle = createDOMElement('div', 'additional-fields__title', 'Дополнительные поля');

  const showTranscription = createCheckBoxElement('showTranscription', 'Транскрипция');
  const showAssociatedPicture = createCheckBoxElement('showAssociatedPicture', 'Картинка-ассоциация');

  const additionalFields = createDOMElement('div', 'additional-fields');
  additionalFields.append(additionalFieldsTitle);
  additionalFields.append(showTranscription);
  additionalFields.append(showAssociatedPicture);
  return additionalFields;
}

function createCardElement() {
  const card = createDOMElement('div', 'training__card card-example');
  card.innerHTML = 
  `<div class="card__top">
    <div class="card__translation"></div>
    <div class="card__transcription"></div>
    <div class="card-img__container"></div>
  </div>
  <div class="card__bottom">
    <div class="sentences__container">
      <div class="card__explanation-sentence"></div>
      <div class="card__explanation-sentence-translation hidden"></div>
      <div class="card__example-sentence"></div>
      <div class="card__example-sentence-translation hidden"></div>
    </div>
    <div class="input__container">
      <input class="card__input" spellcheck="false" type="text">
      <div class="letters-container hidden"></div>
    </div>
  </div>`;
  return card;
}

function createCardSettingsFragment() {
  const cardSettings = createDOMElement('div', 'card-settings');
  cardSettings.append(createCardRequiredFields());
  cardSettings.append(createCardAdditionalFields());
  cardSettings.append(createCardElement());
  return cardSettings;
}

function renderSettingsPage() {
  const settingsContainer = createDOMElement('div', 'form-container');
  settingsContainer.append(createMainSettingsFragment());
  settingsContainer.append(createCardSettingsFragment());

  const submitButton = createDOMElement('button', 'setting__submit-button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Сохранить настройки';

  const settingsForm = createDOMElement('form', 'settings__form');
  settingsForm.append(settingsContainer);
  settingsForm.append(submitButton);

  const settingsWrapper = createDOMElement('div', 'settings__wrapper');
  settingsWrapper.append(settingsForm);

  document.querySelector('.page').innerHTML = '';
  document.querySelector('.page').append(settingsWrapper);
}

export default function initSetting() {
  renderSettingsPage();
}
