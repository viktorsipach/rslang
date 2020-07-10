import { getRoundsAmountInLevel } from './dataAPI';
import initialSettings from '../components/trainingGame/initialSetting';

async function putUserSettings({ settings }) {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    const content = await rawResponse.json();
    console.log(`PUT user settings`);
    console.log(content);
    return content;
  } catch (error) {
    return error;
  } 
};

async function getUserSettings() {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      }
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      console.log(`GET user settings`);
      console.log(content);
      return content;
    }
    return undefined;
  } catch (error) {
    return error;
  }  
};

async function updateLevelRoundDateSettings() {
  console.log(`updateLevelRoundDateSettings`);
  const settings = await getUserSettings();
  const {optional} = settings;
  const {wordsPerDay} = settings;
  const trainingMainSettings = optional.training.mainSettings;
  let {level} = trainingMainSettings;
  let {round} = trainingMainSettings;
  const wordsPerSentence = 50;
  const maxLevel = 6;
  const currentDate = (new Date()).toLocaleString();

  const roundsInLevel = await getRoundsAmountInLevel(level, wordsPerSentence, wordsPerDay);
  console.log(roundsInLevel);
  if (round < roundsInLevel) {
    round += 1;
  } else if (level < maxLevel) {
    level += 1;
    round = 1;
  } else {
    console.log('levels, round ends');
  }
  trainingMainSettings.level = level;
  trainingMainSettings.round = round;
  trainingMainSettings.date = currentDate;

  optional.training.mainSettings = trainingMainSettings;
  await putUserSettings({ 
    settings: {
      'wordsPerDay': wordsPerDay,
      'optional': optional,
    }
  }); 
}

async function updateTrainingProgressSettings(amountOfLearnedWordsPerDay, amountOfRepeatedWordsPerDay, seriesOfCorrectAnswers, longestSeriesOfCorrectAnswers, allCorrectAnswersAmount) {
  console.log('updateTrainingProgressSettings');
  const settings = await getUserSettings();
  const {optional} = settings;
  const {wordsPerDay} = settings;
  const trainingMainSettings = optional.training.mainSettings;
  trainingMainSettings.amountOfLearnedWordsPerDay = amountOfLearnedWordsPerDay;

  const currentDate = (new Date()).toLocaleString();
  trainingMainSettings.date = currentDate;
  optional.training.mainSettings = trainingMainSettings;

  const trainingProgressSettings = optional.training.trainingProgress;
  trainingProgressSettings. amountOfRepeatedWordsPerDay = amountOfRepeatedWordsPerDay;
  trainingProgressSettings.seriesOfCorrectAnswers = seriesOfCorrectAnswers;
  trainingProgressSettings.longestSeriesOfCorrectAnswers = longestSeriesOfCorrectAnswers;
  trainingProgressSettings.allCorrectAnswersAmount = allCorrectAnswersAmount;
  optional.training.trainingProgress = trainingProgressSettings;

  await putUserSettings({ 
    settings: {
      'wordsPerDay': wordsPerDay,
      'optional': optional,
    }
  }); 
}

async function resetTodayProgressSettings() {
  console.log('resetTodayProgressSettings');
  const settings = await getUserSettings();
  const {optional} = settings;
  const {wordsPerDay} = settings;
  const trainingMainSettings = optional.training.mainSettings;
  let {amountOfLearnedWordsPerDay} = trainingMainSettings;
  amountOfLearnedWordsPerDay = 0;
  trainingMainSettings.amountOfLearnedWordsPerDay = amountOfLearnedWordsPerDay;

  const trainingProgressSettings = optional.training.trainingProgress;
  trainingProgressSettings. amountOfRepeatedWordsPerDay = 0;
  trainingProgressSettings.seriesOfCorrectAnswers = 0;
  trainingProgressSettings.longestSeriesOfCorrectAnswers = 0;
  trainingProgressSettings.allCorrectAnswersAmount = 0;
  optional.training.trainingProgress = trainingProgressSettings;

  optional.training.mainSettings = trainingMainSettings;
  await putUserSettings({ 
    settings: {
      'wordsPerDay': wordsPerDay,
      'optional': optional,
    }
  }); 
}

async function checkAndUpdateOptional(settings, initialWordsPerDay) {
  const { optional } = settings;
  let trainingSettings = settings.optional.training;
  if (trainingSettings === undefined) {    
    trainingSettings = initialSettings.training;
    optional.training = trainingSettings;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
}

async function checkAndUpdateMainSettings(settings, initialWordsPerDay) {
  const { optional } = settings;
  let { mainSettings } = settings.optional.training;
  if (mainSettings === undefined) {
    mainSettings = initialSettings.training.mainSettings;
    optional.training.mainSettings = mainSettings;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
  
  if (!mainSettings.level || !mainSettings.round || !mainSettings.amountOfLearnedWordsPerDay || !mainSettings.date) {
    if (!mainSettings.level) {
      mainSettings.level = 1;
    }
    if (!mainSettings.round) {
      mainSettings.round = 1;
    }
    if (!mainSettings.amountOfLearnedWordsPerDay) {
      mainSettings.amountOfLearnedWordsPerDay = 0
    }
    if (!mainSettings.date) {
      mainSettings.date = (new Date()).toLocaleDateString();
    }
    optional.training.mainSettings = mainSettings;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
}

async function checkAndUpdateSettingsPage(settings, initialWordsPerDay) {
  const { optional } = settings;
  let { settingsPage } = settings.optional.training;
  if (settingsPage === undefined) {
    settingsPage = initialSettings.training.settingsPage;
    optional.training.settingsPage = settingsPage;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }

  if (!settingsPage.maxCardsPerDay || !settingsPage.autoPronunciation || !settingsPage.showSentencesTranslation) {
    if (!settingsPage.maxCardsPerDay) {
      settingsPage.maxCardsPerDay = true;
    }
    if (!settingsPage.autoPronunciation) {
      settingsPage.autoPronunciation = true;
    }
    if (!settingsPage.showSentencesTranslation) {
      settingsPage.showSentencesTranslation = true;
    }
    optional.training.settingsPage = settingsPage;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }

  if (!settingsPage.showIDontKnowButton || !settingsPage.showDeleteButton || !settingsPage.showHardButton) {
    if (!settingsPage.showIDontKnowButton) {
      settingsPage.showIDontKnowButton = true;
    }
    if (!settingsPage.showDeleteButton) {
      settingsPage.showDeleteButton = true;
    }
    if (!settingsPage.showHardButton) {
      settingsPage.showHardButton = true;
    }
    optional.training.settingsPage = settingsPage;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }

  if (!settingsPage.newWordsOnly || !settingsPage.learnedWordsOnly) {
    if (!settingsPage.newWordsOnly) {
      settingsPage.newWordsOnly = true;
    }
    if (!settingsPage.learnedWordsOnly) {
      settingsPage.learnedWordsOnly = true;
    }
    optional.training.settingsPage = settingsPage;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
}

async function checkAndUpdateCardSettings(settings, initialWordsPerDay) {
  const { optional } = settings;
  let { cardSettings } = settings.optional.training.settingsPage;
  if (cardSettings === undefined) {
    cardSettings = initialSettings.training.settingsPage.cardSettings;
    optional.training.settingsPage.cardSettings = cardSettings;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }

   if (!cardSettings.showTranslation || !cardSettings.showExplanationSentence || !cardSettings.showExampleSentence 
    || !cardSettings.showTranscription || cardSettings.showAssociatedPicture) {
      if (!cardSettings.showTranslation) {
        cardSettings.showTranslation = true;
      }
      if (!cardSettings.showExplanationSentence) {
        cardSettings.showExplanationSentence = true;
      }
      if (!cardSettings.showExampleSentence) {
        cardSettings.showExampleSentence = true;
      }
      if (!cardSettings.showTranscription) {
        cardSettings.showTranscription = true;
      }
      if (!cardSettings.showAssociatedPicture) {
        cardSettings.showAssociatedPicture = true;
      }
    optional.training.settingsPage.cardSettings = cardSettings;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
}

async function checkAndUpdateTrainingProgress(settings, initialWordsPerDay) {
  const { optional } = settings;
  let { trainingProgress } = settings.optional.training;
  if (trainingProgress === undefined) {
    trainingProgress = initialSettings.training.trainingProgress;
    optional.training.trainingProgress = trainingProgress;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }

  if (!trainingProgress.amountOfRepeatedWordsPerDay || !trainingProgress.seriesOfCorrectAnswers || 
    !trainingProgress.longestSeriesOfCorrectAnswers || !trainingProgress.allCorrectAnswersAmount) {
    if (!trainingProgress.amountOfRepeatedWordsPerDay) {
      trainingProgress.amountOfRepeatedWordsPerDay = 0;
    }
    if (!trainingProgress.seriesOfCorrectAnswers) {
      trainingProgress.seriesOfCorrectAnswers = 0;
    }
    if (!trainingProgress.longestSeriesOfCorrectAnswers) {
      trainingProgress.longestSeriesOfCorrectAnswers = 0;
    }
    if (!trainingProgress.allCorrectAnswersAmount) {
      trainingProgress.allCorrectAnswersAmount = 0;
    }
    optional.training.trainingProgress = trainingProgress;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': optional,
      }
    });
  }
}

async function checkAndUpdateUserSettings() {
  console.log('checkAndUpdateUserSettings');
  const initialWordsPerDay = 10;
  let settings = await getUserSettings();
  if (settings === undefined || settings.optional === undefined) {
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': initialSettings
      }
    });
    settings = await getUserSettings();
  }
  await checkAndUpdateOptional(settings, initialWordsPerDay);
  await checkAndUpdateMainSettings(settings, initialWordsPerDay);
  await checkAndUpdateSettingsPage(settings, initialWordsPerDay);
  await checkAndUpdateCardSettings(settings, initialWordsPerDay);
  await checkAndUpdateTrainingProgress(settings, initialWordsPerDay);
}

export { putUserSettings, getUserSettings, updateLevelRoundDateSettings, 
  updateTrainingProgressSettings, resetTodayProgressSettings, checkAndUpdateUserSettings }
