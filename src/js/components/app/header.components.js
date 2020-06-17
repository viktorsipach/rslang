import initAudioCallGame from '../audioCallGame/audioCallGame';
import initPuzzleGame from '../puzzleGame/puzzleGame';

export function menuHandler() {
    const checkbox = document.querySelector('.menu-checkbox')
    const nav = document.querySelector('.navbar')
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            nav.classList.add('show-nav')
        } else {
            nav.classList.remove('show-nav')
        }  
    })
}

function removeActiveClassNav() {
    const navNodes = document.querySelectorAll('.nav');
    navNodes.forEach(el => {
        if (el.classList.contains('active-nav')) {
            el.classList.remove('active-nav')
        }
    })
}

function addActiveClassNav(e) {
    const page = document.querySelector('.page')
    const el = e.target;
    removeActiveClassNav()
    el.classList.add('active-nav')
    page.innerHTML = '';
}

export function addClickNavHandler() {
    const checkbox = document.querySelector('.menu-checkbox')
    const nav = document.querySelector('.navbar')
    nav.addEventListener('click', (e) => {
        const className = e.target.classList[1];
        switch(className) {
            case 'navbar__words': 
                addActiveClassNav(e)
                // initTraining();
                break;
            case 'navbar__statistics': 
                addActiveClassNav(e)
                // initStatistics();
                break;
            case 'navbar__studying': 
            addActiveClassNav(e)
                // initStudyingWords();
                break;
            case 'navbar__difficult': 
                addActiveClassNav(e)
                // initDifficultWords();
                break;
            case 'navbar__removed': 
                addActiveClassNav(e)
                // initRemovedWords();
                break;
            case 'navbar__speakit': 
                addActiveClassNav(e)
                // initSpeakItGame();
                break;
            case 'navbar__puzzle':
                addActiveClassNav(e)
                initPuzzleGame()
                break;
            case 'navbar__savanna':
                addActiveClassNav(e)
                // initSavannaGame()
                break;
            case 'navbar__audioCall':
                addActiveClassNav(e)
                initAudioCallGame();
                break;
            case 'navbar__sprint':
                addActiveClassNav(e)
                // initSprintGame();
                break;
            case 'navbar__findWord':
                addActiveClassNav(e)
                // initFindWordGame();
                break;
            case 'navbar__setting':
                addActiveClassNav(e)
                // initSetting();
                break;
            case 'navbar__promo':
                addActiveClassNav(e)
                // initPromo();
                break;
            case 'navbar__about':
                addActiveClassNav(e)
                // initAbout();
                break;
            default: 
                return null;
        }
        if (nav.classList.contains('show-nav')) {
            checkbox.checked = false;
            nav.classList.remove('show-nav')
        }
        return null;
    })
}