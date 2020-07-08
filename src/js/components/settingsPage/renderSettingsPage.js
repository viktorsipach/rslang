function createDOMElement(type, classes, textContent) {
  const element = document.createElement(type);
  element.className = classes;
  element.textContent = textContent;
  return element;
}

function createNumberInput(inputContainer, labelText, inputClass, inputName, minValue, maxValue) {
  const numberInputContainer = createDOMElement('div', inputContainer);
  numberInputContainer.innerHTML = 
  ` <label for="${inputName}">${labelText}:</label>
  <input class="${inputClass} ${inputName}" type="number" name="${inputName}" min="${minValue}" max="${maxValue}" value="${minValue}">`;
  return numberInputContainer;
}

function createToggleSwitchElement(containerClass, switchTitle) {
  const switchTitleElement = createDOMElement('span', 'switch-title');
  switchTitleElement.textContent = switchTitle;

  const switchElement = createDOMElement('label', 'switch');
  switchElement.innerHTML = 
  `<input type="checkbox" checked>
  <span class="slider"></span>`;

  const switchContainer = createDOMElement('div', containerClass);
  switchContainer.append(switchTitleElement);
  switchContainer.append(switchElement);
  return switchContainer;
}

function createCheckBoxElement(checkboxClass, checkboxTitle) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = 'checked';

  const checkMark = createDOMElement('span', 'checkmark');

  const checkboxElement = createDOMElement('label', checkboxClass);
  checkboxElement.append(input);
  checkboxElement.append(checkMark);

  const checkboxTitleElement = createDOMElement('span', 'checkbox-title', checkboxTitle);

  const checkboxContainer  = createDOMElement('div', 'checkbox-container');
  checkboxContainer.append(checkboxElement);
  checkboxContainer.append(checkboxTitleElement);
  return checkboxContainer
}

function createMainSettingsFragment() {
  const mainFieldsSubTitle = createDOMElement('div', 'required-fields__subtitle', 'Максимальное количество карточек в день не может быть меньше количества новых слов в день!');
  const newWordsPerDay = createNumberInput('main-settings__field', 'Количество новых слов в день', 'input__number', 'newWordsPerDay', '10', '100');
  const maxCardsPerDay = createNumberInput('main-settings__field', 'Максмальное количество карточек в день', 'input__number', 'maxCardsPerDay', '10', '100');

  const autoPronunciation = createToggleSwitchElement('main-settings__field autoPronunciation', 'Автопроизношение аудио');
  const showSentencesTranslations = createToggleSwitchElement('main-settings__field showSentencesTranslations', 'Показать перевод предложений');
  const showIDontKnowButton = createToggleSwitchElement('main-settings__field iDontKnowButton', 'Переход к следующему слову без его ввода');
  const showDeleteButton = createToggleSwitchElement('main-settings__field deleteButton', 'Возможность удалять слова из изучения');
  const showHardButton = createToggleSwitchElement('main-settings__field hardButton', 'Возможность добавлять слова в сложные');

  const newWordsOnlyButton = createToggleSwitchElement('main-settings__field newWordsOnlyButton', 'Только новые слова');
  const learnedWordsOnly = createToggleSwitchElement('main-settings__field learnedWordsOnlyButton', 'Только изучаемые слова');

  const submitButton = createDOMElement('button', 'button setting-submit__button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Сохранить настройки';

  const mainSettings = createDOMElement('div', 'main-settings');
  mainSettings.append(mainFieldsSubTitle);
  mainSettings.append(newWordsPerDay);
  mainSettings.append(maxCardsPerDay);
  mainSettings.append(autoPronunciation);
  mainSettings.append(showSentencesTranslations);
  mainSettings.append(showIDontKnowButton);
  mainSettings.append(showDeleteButton);
  mainSettings.append(showHardButton);
  mainSettings.append(newWordsOnlyButton);
  mainSettings.append(learnedWordsOnly);
  mainSettings.append(submitButton);
  return mainSettings;
}

function createCardRequiredFields() {
  const requiredFieldsTitle = createDOMElement('div', 'required-fields__title', 'Основные поля');

  const requiredFieldsSubTitle = createDOMElement('div', 'required-fields__subtitle', '!!! Хотя бы один пункт должен быть отмечен');

  const showTranslation = createCheckBoxElement('showTranslation', 'Перевод слова');
  const showExplanationSentence = createCheckBoxElement('showExplanationSentence', 'Предложение с объяснением значения слова');
  const showExampleSentence = createCheckBoxElement('showExampleSentence', 'Предложение с примером использования изучаемого слова');

  const requiredFields = createDOMElement('div', 'required-fields');
  requiredFields.append(requiredFieldsTitle);
  requiredFields.append(requiredFieldsSubTitle);
  requiredFields.append(showTranslation);
  requiredFields.append(showExplanationSentence);
  requiredFields.append(showExampleSentence);
  return requiredFields;
}

function createCardOptionalFields() {
  const additionalFieldsTitle = createDOMElement('div', 'optional-fields__title', 'Дополнительные поля');

  const showTranscription = createCheckBoxElement('showTranscription', 'Транскрипция');
  const showAssociatedPicture = createCheckBoxElement('showAssociatedPicture', 'Картинка-ассоциация');

  const additionalFields = createDOMElement('div', 'optional-fields');
  additionalFields.append(additionalFieldsTitle);
  additionalFields.append(showTranscription);
  additionalFields.append(showAssociatedPicture);
  return additionalFields;
}

function createCardElement(cardData) {
  const IMAGES_SRC = 'https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/';
  const card = createDOMElement('div', 'training__card training__card_example');
  card.innerHTML = 
  `<div class="card__top">
    <div class="card__translation">${cardData[0].wordTranslate}</div>
    <div class="card__transcription">${cardData[0].transcription}</div>
    <div class="card-img__container" style="background-image:url('${IMAGES_SRC}${cardData[0].image}')"></div>
  </div>
  <div class="card__bottom">
    <div class="sentences__container">
      <div class="card__explanation-sentence">${cardData[0].textMeaning}</div>
      <div class="card__explanation-sentence-translation">${cardData[0].textMeaningTranslate}</div>
      <div class="card__example-sentence">${cardData[0].textExample}</div>
      <div class="card__example-sentence-translation">${cardData[0].textExampleTranslate}</div>
    </div>
    <div class="input__container">
      <input class="card__input" spellcheck="false" type="text" value="${cardData[0].word}">
    </div>
  </div>`;
  return card;
}

function createCardSettingsFragment(cardData) {
  const cardSettings = createDOMElement('div', 'card-settings');
  cardSettings.append(createCardRequiredFields());
  cardSettings.append(createCardOptionalFields());
  cardSettings.append(createCardElement(cardData));
  return cardSettings;
}

function renderSettingsPage(cardData) {
  const settingsContainer = createDOMElement('div', 'form-container');
  settingsContainer.append(createMainSettingsFragment());
  settingsContainer.append(createCardSettingsFragment(cardData));

  const settingsForm = createDOMElement('form', 'settings__form');
  settingsForm.append(settingsContainer);

  const settingsWrapper = createDOMElement('div', 'settings__wrapper');
  settingsWrapper.append(settingsForm);

  document.querySelector('.page').innerHTML = '';
  document.querySelector('.page').append(settingsWrapper);
}
function renderSettingsModal(message) {
  const modalWrapper = createDOMElement('div', 'settings__modal');
  modalWrapper.innerHTML = 
  `<div class="settings__modal-message">${message}</div>
  <div class="settings__modal-close-btn close-btn"></div>`;
  document.querySelector('.page').append(modalWrapper);
}

export { renderSettingsPage, renderSettingsModal }
