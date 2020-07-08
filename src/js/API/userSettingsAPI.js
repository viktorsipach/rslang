import { getRoundsAmountInLevel } from './dataAPI';

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
      console.log(content);
      return content;
    }
    return undefined;
  } catch (error) {
    return error;
  }  
};

async function updateLevelRoundDateSettings() {
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

async function updateAmountOfTodayLearnedWordsSettings() {
  const settings = await getUserSettings();
  const {optional} = settings;
  const {wordsPerDay} = settings;
  const trainingMainSettings = optional.training.mainSettings;
  let {amountOfLearnedWordsPerDay} = trainingMainSettings;
  amountOfLearnedWordsPerDay += 1;
  trainingMainSettings.amountOfLearnedWordsPerDay = amountOfLearnedWordsPerDay;

  optional.training.mainSettings = trainingMainSettings;
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

  optional.training.mainSettings = trainingMainSettings;
  await putUserSettings({ 
    settings: {
      'wordsPerDay': wordsPerDay,
      'optional': optional,
    }
  }); 
}

export { putUserSettings, getUserSettings, updateLevelRoundDateSettings, updateAmountOfTodayLearnedWordsSettings, resetTodayProgressSettings }
