import { userWords, changeLevel, generateTemplateMain } from './savannaGetRoundData';
import Image from '../../../assets/img/savanna/savanna-main1.jpg';
import StatisticsAPI from '../../API/statisticsAPI';
import CorrectSound from '../../../assets/audio/correct.mp3';
import WrongSound from '../../../assets/audio/error.mp3';
import FailureSound from '../../../assets/audio/failure.mp3';

let count = 0;
let countCorrect = 0;
let countHealth = 5;
let answer = false;
let startColorGreen = 15;
let startColorBlue = 15;
let startColorRed = 15;
const maxPositionYHiddenWord = 350;
const maxPositionXHiddenWord = 60;
const numberStartWords = 20;
let option = true;

const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
}

const playSoundGame = () => {
    const soundImg = document.querySelector('.savanna-button__icon');
    soundImg.addEventListener('click', () => {
        option = !option;
        if (option) {
            soundImg.innerHTML = '<i class="fa fa-bell-o"></i>';
        } else {
            soundImg.innerHTML = '<i class="fa fa-bell-slash-o"></i>';
        }
    });
}

const preloader = () => {
    let timerValue = 3;
    const timer = document.querySelector('.savanna');
    const load = document.createElement('div');
    const numberLoader = document.createElement('span');
    const main = document.querySelector('.savanna__main');
    const stat = document.querySelector('.savanna__short-statistics');
    const attention = document.createElement('span');
    load.className = 'savanna__preloader-start';
    numberLoader.classList = 'savanna__preloader';
    attention.className = 'savanna__attention';
    attention.textContent = 'Приготовьтесь!';
    timer.append(load);
    load.append(numberLoader);
    load.append(attention);
    main.style.opacity = '0';
    stat.classList.remove('savanna-active');
    numberLoader.textContent = timerValue;
    const interval = setInterval(() => {
      timerValue -= 1;
      if (timerValue === -1) {
        clearInterval(interval);
        main.style.opacity = '1';
        main.classList.remove('savanna-hidden');
        numberLoader.style.border = 'none';
        attention.innerHTML = '';
        numberLoader.innerHTML = '';
      } else {
        numberLoader.textContent = timerValue;
      }
    }, 1000);
}

const fallWord = (words) => {
    const elem = document.querySelector('.savanna__hidden-word');
    const savanna = document.querySelector('.savanna');
    const fallSpeed = 15;
    const countColorChangeRed = 45;
    let posY = elem.offsetTop;
    let word = setInterval(fall, fallSpeed);
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        answer = true;
    });
    function fall() {
        if (posY === maxPositionYHiddenWord || answer || changeLevel || userWords) {
            clearInterval(word);
        } else if (posY < maxPositionYHiddenWord) {
            posY += 1;
            elem.style.top = `${posY}px`;
        }
        if (elem.style.top === '340px') {
            countHealth -= 1;
            count += 1;
            startColorRed += countColorChangeRed;
            if (countHealth === 0) {
                if (option) {
                    playSound(WrongSound);
                }
                savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
                setTimeout(() => savannaShortStatistics(), 500);
                if (option) {
                    setTimeout(() => playSound(FailureSound), 500);
                }
            } else {
                if (option) {
                    playSound(WrongSound);
                }
                savannaHealth(countHealth);
                savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
                setTimeout(() => generateTemplateMain(words, count), 500);
                setTimeout(() => savannaGameplayMouse(words), 500);
                setTimeout(() => fallWord(words), 500);
            }
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
        if (elem.style.top !== maxPositionYHiddenWord) {
            if (correct) {
                posY -= 10;
                elem.style.top = `${posY}px`; 
            } else {
                while (posX < maxPositionXHiddenWord) {
                    posX += 1;
                    elem.style.left = `${posX}%`; 
                }
            }
        }
    }
}

const savannaBullet = () => {
    const bullet = document.querySelector('.savanna__bullet');
    const bulletSpeed = 5;
    let posY = 90;
    setInterval(bullets, bulletSpeed);
    function bullets() {
        posY -= 2;
        bullet.style.top = `${posY}%`;
    }
}

const savannaHealth = (hp) => {
    const health = ['<span><i class="fa fa-heart"></i></span>', '<span><i class="fa fa-heart"></i></span>', '<span><i class="fa fa-heart"></i></span>', '<span><i class="fa fa-heart"></i></span>', '<span><i class="fa fa-heart"></i></span>'];
    const savannaHealths = document.querySelector('.savanna__health_active');
    savannaHealths.innerHTML = health.slice(0, hp).join('');
}

const newStart = () => {
    count = 0;
    countCorrect = 0;
    countHealth = 5;
    startColorGreen = 15;
    startColorBlue = 15;
    startColorRed = 15;
    answer = false;
}

const actionForRound = () => {
    const weapon = document.querySelector('.savanna__footer');
    weapon.classList.add('savanna__footer_active');
    setTimeout(() => weapon.classList.remove('savanna__footer_active'), 100);
    answer = true;
    savannaBullet();
    setTimeout(() => answer = false, 500);
}

const savannaShortStatistics = () => {
    const visibleStat = document.querySelector('.savanna__short-statistics');
    const hiddenMainPage = document.querySelector('.savanna__main');
    const error = document.querySelector('.savanna__error');
    const correct = document.querySelector('.savanna__correct');

    visibleStat.classList.add('savanna-active');
    hiddenMainPage.classList.add('savanna-hidden');
    error.innerHTML = numberStartWords - `${countCorrect}`
    correct.innerHTML = `${countCorrect}`;

    const result = `${countCorrect / numberStartWords * 100}%`;
    const nameGame = 'savanna';
    StatisticsAPI.miniGameStat(nameGame, result);
}

const savannaGameplayMouse = (words) => {
    const clickBtn = document.querySelectorAll('.savanna__choise span');
    const span = document.querySelectorAll('*[data-word]');
    const savanna = document.querySelector('.savanna');
    const countColorChange = 12;
    const countColorChangeRed = 45;
    
    clickBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            count += 1;
            if (count < numberStartWords) {
                if (elem.innerText === words[count - 1].wordTranslate.toUpperCase()) {
                    span[count - 1].innerHTML = '+';
                    countCorrect += 1;
                    startColorGreen += countColorChange;
                    startColorBlue += countColorChange;
                    elem.classList.add('correct');
                    actionForRound();
                    if (option) {
                        playSound(CorrectSound);
                    }
                    savannaHealth(countHealth);
                    setTimeout(() => goOutWord(true), 250);
                    setTimeout(() => generateTemplateMain(words, count), 500);
                    setTimeout(() => fallWord(words), 500);
                    setTimeout(() => savannaGameplayMouse(words), 500);
                    savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
                } else {
                    countHealth -= 1;
                    startColorRed += countColorChangeRed;
                    if (countHealth === 0) {
                        elem.classList.add('wrong');
                        actionForRound();
                        if (option) {
                            playSound(WrongSound);
                        }
                        goOutWord(false);
                        savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
                        setTimeout(() => savannaShortStatistics(), 500);
                    } else {
                        savannaHealth(countHealth);
                        elem.classList.add('wrong');
                        actionForRound();
                        if (option) {
                            playSound(WrongSound);
                        }
                        goOutWord(false);
                        setTimeout(() => generateTemplateMain(words, count), 500);
                        setTimeout(() => fallWord(words), 500);
                        setTimeout(() => savannaGameplayMouse(words), 500);
                        savanna.style.cssText = `background: linear-gradient(180deg, rgba(${startColorRed}, ${startColorGreen}, ${startColorBlue}, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${Image}) center no-repeat; background-size: cover;`;
                    }
                    
                }                
            } else {
                if (elem.innerText === words[count - 1].wordTranslate.toUpperCase()) {
                    elem.classList.add('correct');
                    actionForRound();
                    if (option) {
                        playSound(CorrectSound);
                    }
                    setTimeout(() => goOutWord(true), 250);
                    span[count - 1].innerHTML = '+';
                    countCorrect += 1;
                    setTimeout(() => savannaShortStatistics(), 500);
                } else {
                    elem.classList.add('wrong');
                    actionForRound();
                    if (option) {
                        playSound(WrongSound);
                    }
                    goOutWord(false);
                    setTimeout(() => savannaShortStatistics(), 500);
                }
            }
        })
    })
}

export { startColorGreen, startColorBlue, startColorRed, countHealth, playSoundGame, preloader, fallWord, savannaHealth, newStart, savannaGameplayMouse, /*savannaGameplayKeyboard*/ } ;