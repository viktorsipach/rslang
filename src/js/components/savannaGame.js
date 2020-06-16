import renderSavannaStartPage from './renderSavannaStartPage';

const initSavannaGame = () => {
    const page = document.querySelector('.page');
    const savanna = document.createElement('div');
    const template = renderSavannaStartPage();

    savanna.className = 'savanna';
    savanna.append(template);

    // page.innerHTML = '';
    // page.append(savanna);

    console.log(savanna);
}

export default initSavannaGame;