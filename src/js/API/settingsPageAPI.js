import {putUserSettings, getUserSettings} from './userSettingsAPI';
import initialSettings from '../components/trainingGame/initialSetting';

class SettingsPageAPI {
    constructor() {
        this.putSett = putUserSettings;
        this.getSett = getUserSettings;
        this.initSettings = {
            "wordsPerDay": 10,
            "optional": {}
        };
    }

    async getSettingsPage() {
        let settings = await this.getSett();
        let sendSettings = false;

        if (!settings) {
            sendSettings = true;
            settings = this.initSettings;
            settings.optional.training = initialSettings.training;
        }

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
        const NEW_WORDS_ONLY_BUTTON_CHECKBOX = document.querySelector('.newWordsOnlyButton input');
        const LEARNED_WORDS_ONLY_BUTTON_CHECKBOX = document.querySelector('.learnedWordsOnlyButton input');

        NEW_WORDS_PER_DAY.value = settings.wordsPerDay;
        MAX_CARDS_PER_DAY.value = settings.optional.training.settingsPage.maxCardsPerDay;
        AUTO_PRONUNCIATION_CHECKBOX.checked = settings.optional.training.settingsPage.autoPronunciation;
        SHOW_SENTENCES_TRANSLATIONS__CHECKBOX.checked =settings.optional.training.settingsPage.showSentencesTranslation;
        I_DONT_KNOW_BUTTON_CHECKBOX.checked = settings.optional.training.settingsPage.showIDontKnowButton;
        DELETE_BUTTON_CHECKBOX.checked = settings.optional.training.settingsPage.showDeleteButton;
        HARD_BUTTON_CHECKBOX.checked = settings.optional.training.settingsPage.showHardButton;
        SHOW_TRANSLATION_CHECKBOX.checked = settings.optional.training.settingsPage.cardSettings.showTranslation;
        SHOW_EXPLANATION_SENTENCE_CHECKBOX.checked = settings.optional.training.settingsPage.cardSettings.showExplanationSentence;
        SHOW_EXAMPLE_SENTENCE_CHECKBOX.checked = settings.optional.training.settingsPage.cardSettings.showExampleSentence;
        SHOW_TRANSCRIPTION_CHECKBOX.checked = settings.optional.training.settingsPage.cardSettings.showTranscription;
        SHOW_ASSOCIATED_PICTURE_CHECKBOX.checked = settings.optional.training.settingsPage.cardSettings.showAssociatedPicture;
        NEW_WORDS_ONLY_BUTTON_CHECKBOX.checked = settings.optional.training.settingsPage.newWordsOnly;
        LEARNED_WORDS_ONLY_BUTTON_CHECKBOX.checked = settings.optional.training.settingsPage.learnedWordsOnly;

        if (sendSettings) this.putSett({settings});
    }

    async putSettingsPage(userSettings) {
        const settings =  await this.getSett();
        
        delete settings.id;

        settings.wordsPerDay = userSettings.globalSettings.newWordsPerDay;
        settings.optional.training.settingsPage = userSettings.settingsPage;
        this.putSett({settings})
    }
}

export default new SettingsPageAPI();