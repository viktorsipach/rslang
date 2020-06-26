import { savannaRound } from './savannaGetRoundData';

let count = 0;
let countCorrect = 0;
let rightAnswer = false;

const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
}

const fallWord = () => {
    const elem = document.querySelector('.savanna__hidden-word');
    const fallSpeed = 15;
    let posY = 0;
    let word = setInterval(fall, fallSpeed);
    function fall() {
        if (posY === 350 || rightAnswer) {
          clearInterval(word);
        } else {
          posY += 1;
          elem.style.top = `${posY}px`;
        }
    }
}

const goOutWord = (correct) => {
    const elem = document.querySelector('.savanna__hidden-word');
    const goOutSpeed = 15;
    let posY = elem.style.top.slice(0, -2);
    let posX = 50;
    setInterval(goOut, goOutSpeed);
    function goOut() {
        if (elem.style.top !== 350) {
            if (correct) {
                posY -= 10;
                elem.style.top = `${posY}px`; 
            } else {
                while (posX < 60) {
                    posX += 1;
                    elem.style.left = `${posX}%`; 
                    console.log(elem.style.left);
                }
                
            }
        }
    }
}

const savannaShortStatistics = () => {
    const visibleStat = document.querySelector('.savanna__short-statistics');
    const hiddenMainPage = document.querySelector('.savanna__main');
    const error = document.querySelector('.savanna__error');
    const correct = document.querySelector('.savanna__correct');
    const numberStartWords = 10;

    visibleStat.classList.add('savanna-active');
    hiddenMainPage.classList.add('savanna-hidden');
    error.innerHTML = numberStartWords - `${countCorrect}`
    correct.innerHTML = `${countCorrect}`;
}

const savannaGameplayMouse = (data, index) => {
    const clickBtn = document.querySelectorAll('.savanna__choise span');
    const span = document.querySelectorAll('*[data-word]');
    
    clickBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            count += 1;
            if (count < 10) {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    span[index].innerHTML = '+';
                    countCorrect += 1;
                    elem.classList.add('correct');
                    playSound('assets/audio/correct.mp3');
                    rightAnswer = true;
                    goOutWord(true);
                    setTimeout(() => savannaRound(count), 500);
                    setTimeout(() => rightAnswer = false, 500);
                } else {
                    elem.classList.add('wrong');
                    playSound('assets/audio/error.mp3');
                    rightAnswer = true;
                    goOutWord(false);
                    setTimeout(() => savannaRound(count), 500);
                    setTimeout(() => rightAnswer = false, 500);
                }                
            } else {
                if (elem.innerText === data[index].wordTranslate.toUpperCase()) {
                    elem.classList.add('correct');
                    playSound('assets/audio/correct.mp3');
                    rightAnswer = true;
                    goOutWord();
                    span[index].innerHTML = '+';
                    countCorrect += 1;
                    // console.log('the end!');
                    setTimeout(() => savannaShortStatistics(), 500);
                } else {
                    elem.classList.add('wrong');
                    playSound('assets/audio/error.mp3');
                    rightAnswer = true;
                    goOutWord();
                    // console.log('the end!');
                    setTimeout(() => savannaShortStatistics(), 500);
                }
            }
        })
    })
}

const savannaGameplayKeyboard = () => {
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        const span = document.querySelectorAll('*[data-word]');
        const hiddenWord = document.querySelector('.savanna__hidden-word');
        count += 1;
        if (count < 10) {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                playSound('assets/audio/correct.mp3');
                rightAnswer = true;
                goOutWord();
                span[count - 1].innerHTML = '+';
                countCorrect += 1;
                setTimeout(() => savannaRound(count), 500);
                setTimeout(() => rightAnswer = false, 500);
            } else {
                document.getElementById(event.code).classList.add('wrong');
                playSound('assets/audio/error.mp3');
                rightAnswer = true;
                goOutWord();
                setTimeout(() => savannaRound(count), 500);
                setTimeout(() => rightAnswer = false, 500);
            }                
        } else {
            if (document.getElementById(event.code).innerText === hiddenWord.id.toUpperCase()) {
                document.getElementById(event.code).classList.add('correct');
                playSound('assets/audio/correct.mp3');
                rightAnswer = true;
                goOutWord();
                span[count - 1].innerHTML = '+';
                countCorrect += 1;
                // console.log('the end!');
                setTimeout(() => savannaShortStatistics(), 500);
            } else {
                document.getElementById(event.code).classList.add('wrong');
                playSound('assets/audio/error.mp3');
                rightAnswer = true;
                goOutWord();
                // console.log('the end!');
                setTimeout(() => savannaShortStatistics(), 500);
            }
        }
    })
}

export { fallWord, savannaGameplayMouse, savannaGameplayKeyboard } ;