import {
    MAIN_SECTION, LOGIN_SECTION, HEADER
} from './constants';
  
import signIn from './userUtils';
import  getFormData  from './utils';
import { createUser } from './userAPI';
import { addCardsAnimation } from '../mainPage/mainPage.component'
  
export default function initRegistration() {
    HEADER.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-logout')) {
        LOGIN_SECTION.classList.remove('hidden');
        MAIN_SECTION.classList.add('hidden');
        HEADER.classList.add('hidden');
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