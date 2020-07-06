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
  const trainingSettings = optional.training;
  let {level} = trainingSettings;
  let {round} = trainingSettings;
  const {newWordsPerDay} = trainingSettings;
  const wordsPerSentence = 50;
  const maxLevel = 6;
  const currentDate = new Date();

  const roundsInLevel = await getRoundsAmountInLevel(level, wordsPerSentence, newWordsPerDay);
  if (round < roundsInLevel) {
    round += 1;
  } else if (level < maxLevel) {
    level += 1;
    round = 1;
  } else {
    console.log('levels, round ends');
  }
  trainingSettings.level = level;
  trainingSettings.round = round;
  trainingSettings.date = currentDate;

  optional.training = trainingSettings;
  await putUserSettings({ 
    settings: {
      'wordsPerDay': 10,
      'optional': optional,
    }
  }); 
}

export { putUserSettings, getUserSettings, updateLevelRoundDateSettings }
