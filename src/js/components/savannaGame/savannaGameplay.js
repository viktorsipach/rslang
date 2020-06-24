import { savannaRound } from './savannaGetRoundData';

let count = 0;
let countCorrect = 0;

const savannaGameplayMouse = (data, index) => {
    const clickBtn = document.querySelectorAll('.savanna__choise span');
    const span = document.querySelectorAll('*[data-word]');
    const visibleStat = document.querySelector('.savanna__short-statistics');
    const hiddenMainPage = document.querySelector('.savanna__main');
    const error = document.querySelector('.savanna__error');
    const correct = document.querySelector('.savanna__correct');
    
    clickBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            count += 1;
            console.log(count);
            if (count < 10) {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    span[index].innerHTML = '+';
                    countCorrect += 1;
                    elem.classList.add('correct');
                    setTimeout(() => savannaRound(count), 500);
                } else {
                    elem.classList.add('wrong');
                    setTimeout(() => savannaRound(count), 500);
                }                
            } else {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    elem.classList.add('correct');
                    span[index].innerHTML = '+';
                    countCorrect += 1;
                    console.log('the end!');
                    visibleStat.classList.add('savanna-active');
                    hiddenMainPage.classList.add('savanna-hidden');
                    error.innerHTML = 10 - `${countCorrect}`
                    correct.innerHTML = `${countCorrect}`;
                } else {
                    elem.classList.add('wrong');
                    console.log('the end!');
                    visibleStat.classList.add('savanna-active');
                    hiddenMainPage.classList.add('savanna-hidden');
                    error.innerHTML = 10 - `${countCorrect}`;
                    correct.innerHTML = `${countCorrect}`;
                }
            }
        })
    })
}

const savannaGameplayKeyboard = () => {
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        const span = document.querySelectorAll('*[data-word]');
        const visibleStat = document.querySelector('.savanna__short-statistics');
        const hiddenMainPage = document.querySelector('.savanna__main');
        const error = document.querySelector('.savanna__error');
        const correct = document.querySelector('.savanna__correct');
        const hiddenWord = document.querySelector('.savanna__hidden-word');
        count += 1;
        if (count < 10) {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                span[count - 1].innerHTML = '+';
                countCorrect += 1;
                setTimeout(() => savannaRound(count), 500);
            } else {
                document.getElementById(event.code).classList.add('wrong');
                setTimeout(() => savannaRound(count), 500);
            }                
        } else {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                span[count - 1].innerHTML = '+';
                countCorrect += 1;
                console.log('the end!');
                visibleStat.classList.add('savanna-active');
                hiddenMainPage.classList.add('savanna-hidden');
                error.innerHTML = 10 - `${countCorrect}`;
                correct.innerHTML = `${countCorrect}`;
            } else {
                document.getElementById(event.code).classList.add('wrong');
                console.log('the end!');
                visibleStat.classList.add('savanna-active');
                hiddenMainPage.classList.add('savanna-hidden');
                error.innerHTML = 10 - `${countCorrect}`;
                correct.innerHTML = `${countCorrect}`;
            }
        }
    })
}

export { savannaGameplayMouse, savannaGameplayKeyboard } ;