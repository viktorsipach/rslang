import { createUserSettings, getUserSettings } from './userSettingsAPI';

export default async function testUserSettings() {
  console.log(`userID ${localStorage.getItem('userId')}`);
  console.log(`userToken ${localStorage.getItem('userToken')}`);

  const settings = {
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

  createUserSettings({
    "wordsPerDay": 0,
    "optional": settings
  });

  const data = await getUserSettings();
  console.log(data);

} 