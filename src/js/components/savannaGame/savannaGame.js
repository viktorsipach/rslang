import renderSavannaStartPage from './renderSavannaStartPage';
import RenderSavannaMainPage from './renderSavannaMainPage';
import Image from '../../../assets/img/savanna/savanna-main1.jpg';
import savannaRoundDataAPI from './savannaGetRoundData';

let count = 0;

async function test(i) {
    const data = await savannaRoundDataAPI();
    const savanna = document.querySelector('.savanna');

    console.log(data);

    const arr = [];
    data.forEach(el => {
        arr.push(el.wordTranslate);
    })
    console.log(arr);

    let random = arr.sort(() => .5 - Math.random()).slice(0,3);

    console.log(random);

    const templateMain = new RenderSavannaMainPage(data[i].word);

    savanna.innerHTML = '';
    savanna.append(templateMain.render());

    
    const clickBtn = document.querySelectorAll('.savanna__choise span');
    
    clickBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            count += 1;
            if (count < 10) {
                elem.classList.add('correct');
                setTimeout(() => test(count), 1000);
                console.log(count);
                
            } else {
                elem.classList.add('correct');
                console.log('the end!');
            }
        })
    })
}

const initSavannaGame = () => {
    const page = document.querySelector('.page');
    const savanna = document.createElement('div');
    const template = renderSavannaStartPage();
    // const templateMain = RenderSavannaMainPage();

    savanna.className = 'savanna'; 
    savanna.append(template);

    page.innerHTML = '';
    page.append(savanna);

    const start = document.querySelector('.button__savanna');
    start.addEventListener('click', () => {
        savanna.style.cssText = `background: linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
        savanna.innerHTML = '';
        // savanna.append(templateMain);
        test(0);
    })
}

export default initSavannaGame;