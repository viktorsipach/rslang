import { loginUser } from './userAPI';
import { LOGIN_SECTION, MAIN_SECTION, HEADER } from './constants';
import initialSettings from '../trainingGame/initialSetting';
import { putUserSettings } from '../../API/userSettingsAPI';

export default async function signIn(userData) {
  const loginResult = await loginUser(userData);
  if (loginResult) {
    localStorage.setItem('userId', loginResult.userId);
    localStorage.setItem('userToken', loginResult.token);
    LOGIN_SECTION.classList.add('hidden');
    MAIN_SECTION.classList.remove('hidden');
    HEADER.classList.remove('hidden');
    const initialWordsPerDay = 10;
    await putUserSettings({ 
      settings: {
        'wordsPerDay': initialWordsPerDay,
        'optional': initialSettings
      }
    });
  }
}
