import { putUserSettings, getUserSettings } from './userSettingsAPI';

export default async function testUserSettings() {
    console.log(`userID ${localStorage.getItem('userId')}`);
    console.log(`userToken ${localStorage.getItem('userToken')}`);

    const mainSettings = {
        newWordsPerDay: 20,
        maxCardsPerDay: 20,
        cardSettings: {
            showTranslation: true,
            showExplanationSentence: true,
            showAssociatedPicture: true
        },
        autoPronunciation: true,
        showSentencesTranslation: true,   
        showDeleteButton: true,	   
        showHardButton: true,	   
        newWordsOnly: true,	   
        learnedWordsOnly: true,	  
        intervalRepetitionTechnique: true	
    }

    const userSettings = {
        trainingGameSettings: mainSettings,
        speakitSettings: {
            level: 1,
            round: 1
        },
        puzzleSettings: {
            level: 1,
            round: 1
        },
        audioCallSettings: {
            level: 1,
            round: 1
        },
        savannaSettings: {
            level: 1,
            round: 1
        },
        sprintSettings: {
            level: 1,
            round: 1
        },
        findWordsSettings: {
            level: 1,
            round: 1
        },

    }

    putUserSettings({
        settings: {
            'optional': userSettings
        }
    })

    const data = await getUserSettings();
    console.log(data);

} 