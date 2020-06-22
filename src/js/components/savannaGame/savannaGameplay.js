import { savannaRound } from './savannaGetRoundData';

let count = 0;

const savannaGameplayMouse = (data, index) => {
    const clickBtn = document.querySelectorAll('.savanna__choise span');
    
    clickBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            // console.log(elem.innerText);
            count += 1;
            console.log(count);
            if (count < 10) {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    elem.classList.add('correct');
                    setTimeout(() => savannaRound(count), 500);
                    // console.log(count);
                } else {
                    elem.classList.add('wrong');
                    setTimeout(() => savannaRound(count), 500);
                }                
            } else {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    elem.classList.add('correct');
                    console.log('the end!');
                    // console.log(count);
                } else {
                    elem.classList.add('wrong');
                    console.log('the end!');
                }
            }
        })
    })
}

const savannaGameplayKeyboard = () => {
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        const hiddenWord = document.querySelector('.savanna__hidden-word');
        console.log(event.code);
        console.log(document.getElementById(event.code));
        console.log(document.getElementById(event.code).innerText);
        console.log(hiddenWord.id.toUpperCase());
        count += 1;
        console.log(count);
        if (count < 10) {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                setTimeout(() => savannaRound(count), 500);
                // console.log(count);
            } else {
                document.getElementById(event.code).classList.add('wrong');
                setTimeout(() => savannaRound(count), 500);
            }                
        } else {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                console.log('the end!');
                // console.log(count);
            } else {
                document.getElementById(event.code).classList.add('wrong');
                console.log('the end!');
            }
        }
    })
}

export { savannaGameplayMouse, savannaGameplayKeyboard } ;