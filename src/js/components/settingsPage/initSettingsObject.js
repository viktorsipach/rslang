
import { renderSettingsModal } from './renderSettingsPage';
import { elementClassToggle, checkMainFieldSentenceVisibility, checkSentencesTranslationsCheckbox } from './utils';
import SettingsPageAPI from '../../API/settingsPageAPI';

function settingsModalAddEventListener() {
  const SETTINGS_WRAPPER = document.querySelector('.settings__wrapper');
  const SETTINGS_MODAL = document.querySelector('.settings__modal');
  const SETTINGS_MODAL_CLOSE_BTN =  document.querySelector('.settings__modal-close-btn');

  SETTINGS_WRAPPER.classList.add('modal'); 
  SETTINGS_MODAL_CLOSE_BTN.addEventListener('click', () => {
    SETTINGS_MODAL.remove();
    SETTINGS_WRAPPER.classList.remove('modal'); 
  });
}

export default function initSettingsObject() {
  const NEW_WORDS_PER_DAY = document.querySelector('.input__number.newWordsPerDay');
  const MAX_CARDS_PER_DAY = document.querySelector('.input__number.maxCardsPerDay');
  const AUTO_PRONUNCIATION_CHECKBOX = document.querySelector('.autoPronunciation input');
  const SHOW_SENTENCES_TRANSLATIONS__CHECKBOX = document.querySelector('.showSentencesTranslations input');
  const I_DONT_KNOW_BUTTON_CHECKBOX = document.querySelector('.iDontKnowButton input');
  const DELETE_BUTTON_CHECKBOX = document.querySelector('.deleteButton input');
  const HARD_BUTTON_CHECKBOX = document.querySelector('.hardButton input');
  const SHOW_TRANSLATION_CHECKBOX = document.querySelector('.showTranslation input');
  const SHOW_EXPLANATION_SENTENCE_CHECKBOX = document.querySelector('.showExplanationSentence input');
  const SHOW_EXAMPLE_SENTENCE_CHECKBOX = document.querySelector('.showExampleSentence input');
  const SHOW_TRANSCRIPTION_CHECKBOX = document.querySelector('.showTranscription input');
  const SHOW_ASSOCIATED_PICTURE_CHECKBOX = document.querySelector('.showAssociatedPicture input');
  const CARD_TRANSLATION = document.querySelector('.card__translation');
  const CARD_EXPLANATION_SENTENCE = document.querySelector('.card__explanation-sentence');
  const CARD_EXAMPLE_SENTENCE = document.querySelector('.card__example-sentence');
  const CARD_TRANSCRIPTION = document.querySelector('.card__transcription');
  const CARD_IMG_CONTAINER =  document.querySelector('.card-img__container');
  const CARD_EXPLANATION_SENTENCE_TRANSLATION = document.querySelector('.card__explanation-sentence-translation');
  const CARD_EXAMPLE_SENTENCE_TRANSLATION = document.querySelector('.card__example-sentence-translation');
  const NEW_WORDS_ONLY_BUTTON_CHECKBOX = document.querySelector('.newWordsOnlyButton input');
  const LEARNED_WORDS_ONLY_BUTTON_CHECKBOX = document.querySelector('.learnedWordsOnlyButton input');
  const SUBMIT_BUTTON = document.querySelector('.setting-submit__button');
  const minDifference = 5;
 
  SHOW_TRANSLATION_CHECKBOX.addEventListener('change', () => {
    elementClassToggle(CARD_TRANSLATION, 'hidden');
  })

  SHOW_EXPLANATION_SENTENCE_CHECKBOX.addEventListener('change', () => {
    elementClassToggle(CARD_EXPLANATION_SENTENCE, 'hidden');
    checkMainFieldSentenceVisibility(CARD_EXPLANATION_SENTENCE, CARD_EXPLANATION_SENTENCE_TRANSLATION);
  });

  SHOW_EXAMPLE_SENTENCE_CHECKBOX.addEventListener('change', () => {
    elementClassToggle(CARD_EXAMPLE_SENTENCE, 'hidden');
    checkMainFieldSentenceVisibility(CARD_EXAMPLE_SENTENCE, CARD_EXAMPLE_SENTENCE_TRANSLATION);
  });

  SHOW_TRANSCRIPTION_CHECKBOX.addEventListener('change', () => {
    elementClassToggle(CARD_TRANSCRIPTION, 'hidden');
  });

  SHOW_ASSOCIATED_PICTURE_CHECKBOX.addEventListener('change', () => {
    elementClassToggle(CARD_IMG_CONTAINER, 'hidden');
  });

  SHOW_SENTENCES_TRANSLATIONS__CHECKBOX.addEventListener('change', () => {
    checkSentencesTranslationsCheckbox(CARD_EXPLANATION_SENTENCE_TRANSLATION, SHOW_EXPLANATION_SENTENCE_CHECKBOX);
    checkSentencesTranslationsCheckbox(CARD_EXAMPLE_SENTENCE_TRANSLATION, SHOW_EXAMPLE_SENTENCE_CHECKBOX);
  });
   
  SUBMIT_BUTTON.addEventListener('click', (event)=> {
    event.preventDefault();
    if (MAX_CARDS_PER_DAY.value - NEW_WORDS_PER_DAY.value < minDifference) {
      renderSettingsModal(`Максимальное количество карточек должно быть больше количества новых слов минимум на ${minDifference}!`);
      settingsModalAddEventListener();
    } else if (SHOW_TRANSLATION_CHECKBOX.checked || SHOW_EXPLANATION_SENTENCE_CHECKBOX.checked || SHOW_EXAMPLE_SENTENCE_CHECKBOX.checked) {
      const userSettings = {
        globalSettings: {
          newWordsPerDay: NEW_WORDS_PER_DAY.value,
        },
        settingsPage: {
          maxCardsPerDay: MAX_CARDS_PER_DAY.value,
          cardSettings: {
            showTranslation: SHOW_TRANSLATION_CHECKBOX.checked,
            showExplanationSentence: SHOW_EXPLANATION_SENTENCE_CHECKBOX.checked,
            showExampleSentence: SHOW_EXAMPLE_SENTENCE_CHECKBOX.checked,
            showTranscription: SHOW_TRANSCRIPTION_CHECKBOX.checked,
            showAssociatedPicture: SHOW_ASSOCIATED_PICTURE_CHECKBOX.checked
          },
          autoPronunciation: AUTO_PRONUNCIATION_CHECKBOX.checked,
          showSentencesTranslation: SHOW_SENTENCES_TRANSLATIONS__CHECKBOX.checked,
          showIDontKnowButton: I_DONT_KNOW_BUTTON_CHECKBOX.checked,
          showDeleteButton: DELETE_BUTTON_CHECKBOX.checked,
          showHardButton: HARD_BUTTON_CHECKBOX.checked,
          newWordsOnly: NEW_WORDS_ONLY_BUTTON_CHECKBOX.checked,
          learnedWordsOnly: LEARNED_WORDS_ONLY_BUTTON_CHECKBOX.checked,
        }
      }
      SettingsPageAPI.putSettingsPage(userSettings);
    } else {
      renderSettingsModal('Хотя бы одно основное поле должно быть отмечено!');
      settingsModalAddEventListener();
    }
  });
}
