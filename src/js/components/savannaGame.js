import renderSavannaStartPage from './renderSavannaStartPage';
import renderSavannaMainPage from './renderSavannaMainPage';
import Image from '../../assets/img/savanna/savanna-main1.jpg';

const initSavannaGame = () => {
    const page = document.querySelector('.page');
    const savanna = document.createElement('div');
    const template = renderSavannaStartPage();
    const templateMain = renderSavannaMainPage();

    savanna.className = 'savanna';
    savanna.append(template);

    // page.innerHTML = '';
    // page.append(savanna);

    const start = document.querySelector('.button__savanna');
    start.addEventListener('click', () => {
        savanna.style.cssText = `background: linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
        savanna.innerHTML = '';
        savanna.append(templateMain);
    })

    // console.log(savanna);
}

export default initSavannaGame;