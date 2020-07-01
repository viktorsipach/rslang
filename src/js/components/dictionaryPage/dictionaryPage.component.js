import { getRoundData } from '../../API/dataAPI';

function createWrapperWords() {
    const page = document.querySelector('.page');
    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper__dictionary';
    page.append(wrapper)
   
}

function createHeaderWords() {
    const wrapper = document.querySelector('.wrapper__dictionary');
    const headerDictionary = document.createElement('h3');
    const counterWords = document.createElement('span');
    counterWords.classList = 'word-dictionary__all';
    headerDictionary.classList = 'header__dictionary';
    headerDictionary.innerHTML = 'Всего слов:'
    headerDictionary.append(counterWords)
    wrapper.append(headerDictionary)
}

function createWord(wordData,className) {
    const wrapper = document.querySelector('.wrapper__dictionary');
    const word = document.createElement('div');
    word.classList = 'word-dictionary';
    word.id = wordData.id;
    word.innerHTML = `
    <div class='dictionary-text'>
        <div class='word-dictionary__audio'>https://raw.githubusercontent.com/viktorsipach/rslang-data/rslang-data/data/${wordData.audio}</div>
        <div class='word-dictionary__word'>${wordData.word}<img src="./assets/img/icon-audio.png" class="icon word-dictionary__icon" alt="icon"></div>
        <div class='word-dictionary__translate'>${wordData.wordTranslate}</div>
        <div class='word-dictionary__example'>${wordData.textExample}</div>
    </div>
    <div class='dictionary-img'>
        <div data-name='Восстановить' class='word-dictionary__remove ${className} tooltip'><i class="fa fa-share"></i></div>
        <img class='word-dictionary__img' src='https://raw.githubusercontent.com/viktorsipach/rslang-data/rslang-data/data/${wordData.image}'></img>
    </div>`
    wrapper.append(word)
   
}

function getDataWords(json,className) {
    const arrWords = json;
    arrWords.forEach(word => {
        createWord(word,className)
    })
};

function addClickIconAudioHandler() {
    const wrapper = document.querySelector('.wrapper__dictionary')
    wrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('word-dictionary__icon')) {
            const linkAudio = e.path[2].children[0].innerText
            const audio = new Audio(linkAudio);
            audio.play()
        }
    })
}


export function initStudyingWords() {
    const CLASS_FOR_STUDYING = 'hidden';
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    getRoundData(1,1,10).then(json => getDataWords(json,CLASS_FOR_STUDYING))
}

export function initDifficultWords() {
    const CLASS_FOR_STUDYING = 'show__btn-remove';
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    getRoundData(1,1,10).then(json => getDataWords(json,CLASS_FOR_STUDYING))
}

export function initRemovedWords() {
    const CLASS_FOR_STUDYING = 'show__btn-remove';
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    getRoundData(1,1,10).then(json => getDataWords(json,CLASS_FOR_STUDYING))
}