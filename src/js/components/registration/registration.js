import {
    MAIN_SECTION, LOGIN_SECTION, HEADER
} from './constants';
  
import signIn from './userUtils';
import  getFormData  from './utils';
import { createUser, getUser } from './userAPI';
import { addCardsAnimation } from '../mainPage/mainPage.component'


export default async function initRegistration() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const user = await getUser(userId,token);
    if (user) {
        MAIN_SECTION.classList.remove('hidden');
        HEADER.classList.remove('hidden');
    } else {
        LOGIN_SECTION.classList.remove('hidden');
    }

    HEADER.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-logout')) {
        LOGIN_SECTION.classList.remove('hidden');
        MAIN_SECTION.classList.add('hidden');
        HEADER.classList.add('hidden');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
    }
    });

    LOGIN_SECTION.addEventListener('click', (event) => {
    document.querySelector('.error-message').innerHTML = '';
    if (event.target.classList.contains('button__signUp')) {
        event.preventDefault();
        const userData = getFormData();
        createUser(userData);
    } else if (event.target.classList.contains('button__signIn')) {
        event.preventDefault();
        const userData = getFormData();
        signIn(userData);
        addCardsAnimation()
    }
    });
}