import initAudioCallGame from '../audioCallGame/audioCallGame';
import initPuzzleGame from '../puzzleGame/puzzleGame';
import FindWordsGame from '../findWordsGame/findWordsGame';
import initSavannaGame from '../savannaGame/savannaGame';
import initTrainingGame from '../trainingGame/initTrainingGame';
import Sprint from '../sprintGame/Sprint';
import initSpeakItGame from '../speakitGame/app.speakit';
import initSetting from '../settingsPage/settingsPage.component';
import initPromo from '../promoPage/promoPage';
import { initStudyingWords, initDifficultWords, initRemovedWords } from '../dictionaryPage/dictionaryPage.component'

const renderMainPage = () => {
    const page = document.querySelector('.page');
    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper__main-page';
    wrapper.innerHTML = `
    <div class="container__cards">
        <div class="card card__words">
            <div class="overlay card__words"></div>
            <div class="content">
                <h4>Учи слова</h4>
                <h6>Увеличивай словарный запас</h6>
            </div>
            <div class="fav">
                <i class="fa fa-clone"></i>
            </div>
        </div>
        <div class="card card__speakit">
            <div class="overlay card__speakit"></div>
            <div class="content">
                <h4>Говори</h4>
                <h6>Тренируй произношение</h6>
            </div>
            <div class="fav">
                <i class="fa fa-microphone"></i>
            </div>
        </div>
        <div class="card card__puzzle">
            <div class="overlay card__puzzle"></div>
            <div class="content">
                <h4>Пазл</h4>
                <h6>Собирай предложения</h6>
            </div>
            <div class="fav">
                <i class="fa fa-puzzle-piece"></i>
            </div>
        </div>
        <div class="card card__savanna">
            <div class="overlay card__savanna"></div>
            <div class="content">
                <h4>Саванна</h4>
                <h6>Выбери правильный перевод</h6>
            </div>
            <div class="fav">
                <i class="fa fa-tint"></i>
            </div>
        </div>
        <div class="card card__audioCall">
            <div class="overlay card__audioCall"></div>
            <div class="content">
                <h4>Аудиовызов</h4>
                <h6>Тренируй понимание слов</h6>
            </div>
            <div class="fav">
                <i class="fa fa-headphones"></i>
            </div>
        </div>
        <div class="card card__sprint">
            <div class="overlay card__sprint"></div>
            <div class="content">
                <h4>Спринт</h4>
                <h6>Тренируй словарный запас</h6>
            </div>
            <div class="fav">
                <i class="fa fa-flag-checkered"></i>
            </div>
        </div>
        <div class="card card__findWords">
            <div class="overlay card__findWords"></div>
            <div class="content">
                <h4>Найди слова</h4>
                <h6>Найди правильный перевод</h6>
            </div>
            <div class="fav">
                <i class="fa fa-search"></i>
            </div>
        </div>
    </div>`
    page.innerHTML = '';
    page.append(wrapper);
}

export const addCardsAnimation = () => {
    const END_ANIMATION = 1000;
    const ONE_CYCLE_ANIMATION = 150;
    const cards = document.querySelectorAll('.card');
    setTimeout(() => {
        cards.forEach((el,idx) => {
            const node = el;
            setTimeout(() => {
                node.classList.add(`ani${  idx}`);
                node.children[1].classList.add('hide-content');
            }, idx * ONE_CYCLE_ANIMATION);
        })   
        setTimeout(() => {
            cards.forEach((el,idx) => {
                const node = el;
                setTimeout(() => {
                    node.classList.remove(`ani${  idx}`);
                    node.children[1].classList.remove('hide-content');
                    }, idx * ONE_CYCLE_ANIMATION);
                })
        }, END_ANIMATION) 
    },0)  
}

export const menuHandler = () => {
    const checkbox = document.querySelector('.menu-checkbox');
    const nav = document.querySelector('.navbar');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            nav.classList.add('show-nav');
        } else {
            nav.classList.remove('show-nav');
        }
    })
}

export const removeActiveClassNav = () => {
    const navNodes = document.querySelectorAll('.nav');
    navNodes.forEach(el => {
        if (el.classList.contains('active-nav')) {
            el.classList.remove('active-nav');
        }
    })
}

const addActiveClassNav = (e) => {
    const page = document.querySelector('.page');
    const el = e.target;
    removeActiveClassNav();
    el.classList.add('active-nav');
    page.innerHTML = '';
}

const hideHeader = () => {
    const header = document.querySelector('.header');
    const closeBtn = document.querySelector('.close-btn');
    header.classList.add('hide-header');
    closeBtn.classList.remove('hidden');
}

const showHeader = () => {
    const header = document.querySelector('.header');
    const closeBtn = document.querySelector('.close-btn');
    if(header.classList.contains('hide-header')) {
        header.classList.remove('hide-header');
        closeBtn.classList.add('hidden');
    }
   
}

const addClickCardsHandler = () => {
    const container = document.querySelector('.container__cards');
    const page = document.querySelector('.page');
    container.addEventListener('click', (e) => {
        const className = e.target.classList[1];
        const findWordsGame = FindWordsGame;
        switch(className) {
            case 'card__words':
                page.innerHTML = '';
                initTrainingGame();
                hideHeader();
                break;
            case 'card__statistics':
                page.innerHTML = '';
                // initStatistics();
                break;
            case 'card__studying':
                page.innerHTML = '';
                // initStudyingWords();
                break;
            case 'card__difficult':
                page.innerHTML = '';
                // initDifficultWords();
                break;
            case 'card__removed':
                page.innerHTML = '';
                // initRemovedWords();
                break;
            case 'card__speakit':
                page.innerHTML = '';
                initSpeakItGame();
                hideHeader();
                break;
            case 'card__puzzle':
                page.innerHTML = '';
                initPuzzleGame();
                hideHeader();
                break;
            case 'card__savanna':
                page.innerHTML = '';
                initSavannaGame();
                hideHeader();
                break;
            case 'card__audioCall':
                page.innerHTML = '';
                initAudioCallGame();
                hideHeader();
                break;
            case 'card__sprint':
                page.innerHTML = '';
                Sprint.init('.page');
                hideHeader();
                break;
            case 'card__findWords':
                page.innerHTML = '';
                findWordsGame.initFindWordsGame();
                hideHeader();
                break;
            case 'card__setting':
                page.innerHTML = '';
                initSetting();
                break;
            case 'card__promo':
                page.innerHTML = '';
                initPromo();
                break;
            case 'card__about':
                page.innerHTML = '';
                // initAbout();
                break;
            default:
                return null;
        }
        removeActiveClassNav();
        return null;
    })
}


export const addClickNavHandler = () => {
    const checkbox = document.querySelector('.menu-checkbox');
    const nav = document.querySelector('.navbar');
    nav.addEventListener('click', (e) => {
        const className = e.target.classList[1];
        const findWordsGame = FindWordsGame;
        switch(className) {
            case 'navbar__words':
                addActiveClassNav(e);
                initTrainingGame();
                hideHeader();
                break;
            case 'navbar__statistics':
                addActiveClassNav(e);
                // initStatistics();
                break;
            case 'navbar__studying':
                addActiveClassNav(e);
                initStudyingWords();
                break;
            case 'navbar__difficult':
                addActiveClassNav(e);
                initDifficultWords();
                break;
            case 'navbar__removed':
                addActiveClassNav(e);
                initRemovedWords();
                break;
            case 'navbar__speakit':
                addActiveClassNav(e);
                initSpeakItGame();
                hideHeader();
                break;
            case 'navbar__puzzle':
                addActiveClassNav(e);
                initPuzzleGame();
                hideHeader();
                break;
            case 'navbar__savanna':
                addActiveClassNav(e);
                initSavannaGame();
                hideHeader();
                break;
            case 'navbar__audioCall':
                addActiveClassNav(e);
                initAudioCallGame();
                hideHeader();
                break;
            case 'navbar__sprint':
                addActiveClassNav(e);
                Sprint.init('.page');
                hideHeader();
                break;
            case 'navbar__findWords':
                addActiveClassNav(e);
                findWordsGame.initFindWordsGame();
                hideHeader();
                break;
            case 'navbar__setting':
                addActiveClassNav(e);
                initSetting();
                break;
            case 'navbar__promo':
                addActiveClassNav(e);
                initPromo();
                break;
            case 'navbar__about':
                addActiveClassNav(e);
                // initAbout();
                break;
            default:
                return null;
        }
        if (nav.classList.contains('show-nav')) {
            checkbox.checked = false;
            nav.classList.remove('show-nav');
        }
        return null;
    })
}

export const initMainPage = () => {
    renderMainPage();
    addCardsAnimation();
    addClickCardsHandler();
    showHeader();
}