import { loginUser } from './userAPI';
import { LOGIN_SECTION, MAIN_SECTION, HEADER } from './constants';

export default async function signIn(userData) {
  const loginResult = await loginUser(userData);
  if (loginResult) {
    localStorage.setItem('userId', loginResult.userId);
    localStorage.setItem('userToken', loginResult.token);
    LOGIN_SECTION.classList.add('hidden');
    MAIN_SECTION.classList.remove('hidden');
    HEADER.classList.remove('hidden');
  }
}
