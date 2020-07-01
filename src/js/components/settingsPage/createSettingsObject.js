
export default function createSettingsObject() {
  const NEW_WORDS_PER_DAY = document.querySelector('.input__number.newWordsPerDay');
  const MAX_CARDS_PER_DAY = document.querySelector('.input__number.maxCardsPerDay');

  const AUTO_PRONUNCIATION_CHECKBOX = document.querySelector('.autoPronunciation input');
  const I_DONT_KNOW_BUTTON_CHECKBOX = document.querySelector('.iDontKnowButton input');
  const DELETE_BUTTON_CHECKBOX = document.querySelector('.deleteButton input');
  const HARD_BUTTON_CHECKBOX = document.querySelector('.hardButton input');

  const SHOW_TRANSLATION_CHECKBOX = document.querySelector('.showTranslation input');
  const SHOW_EXPLANATION_SENTENCE_CHECKBOX = document.querySelector('.showExplanationSentence input');
  const SHOW_EXAMPLE_SENTENCE_CHECKBOX = document.querySelector('.showExampleSentence input');
  const SHOW_TRANSCRIPTION_CHECKBOX = document.querySelector('.showTranscription input');
  const SHOW_ASSOCIATED_PICTURE_CHECKBOX = document.querySelector('.showAssociatedPicture input');



  document.querySelector('.setting-submit__button').addEventListener('click', (event)=> {
    event.preventDefault();

    const settings = {
      newWordsPerDay: NEW_WORDS_PER_DAY.value,
      maxCardsPerDay: MAX_CARDS_PER_DAY.value,
      cardSettings: {
        showTranslation: SHOW_TRANSLATION_CHECKBOX.checked,
        showExplanationSentence: SHOW_EXPLANATION_SENTENCE_CHECKBOX.checked,
        showExampleSentence: SHOW_EXAMPLE_SENTENCE_CHECKBOX.checked,
        showTranscription: SHOW_TRANSCRIPTION_CHECKBOX.checked,
        showAssociatedPicture: SHOW_ASSOCIATED_PICTURE_CHECKBOX.checked
      },
      autoPronunciation: AUTO_PRONUNCIATION_CHECKBOX.checked,
      showIDontKnowButton: I_DONT_KNOW_BUTTON_CHECKBOX.checked,
      showDeleteButton: DELETE_BUTTON_CHECKBOX.checked,
      showHardButton: HARD_BUTTON_CHECKBOX.checked,
      newWordsOnly: true,
      learnedWordsOnly: true,
    }

    console.log(settings);
    a();
   


  })
  

 


}