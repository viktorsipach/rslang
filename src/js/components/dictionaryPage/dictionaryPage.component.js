import { getTrickyWords, getDeleteWords, getRepeatWords, restoreWord } from '../../API/helpForDictionary';
import { getUserSettings } from '../../API/userSettingsAPI'

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
    // eslint-disable-next-line no-underscore-dangle
    word.id = wordData._id;
    word.innerHTML = `
    <div class='dictionary-text'>
        <div class='word-dictionary__audio'>https://raw.githubusercontent.com/viktorsipach/rslang-data/rslang-data/data/${wordData.audio}</div>
        <div class='word-dictionary__word'>${wordData.word}<img src="./assets/img/icon-audio.png" class="icon word-dictionary__icon" alt="icon"></div>
        <div class='word-dictionary__transcription hidden'>${wordData.transcription}</div>
        <div class='word-dictionary__translate'>${wordData.wordTranslate}</div>
        <div class='word-dictionary__example hidden'>${wordData.textExample}</div>
        <div class='word-dictionary__meaning hidden'>${wordData.textMeaning}</div>
        <div class='word-dictionary__lastRepeatDate'>Давность: ${wordData.userWord.optional.lastRepeatDate}</div>
        <div class='word-dictionary__repeatCount'>Повторений: ${wordData.userWord.optional.repeatCount}</div>
        <div class='word-dictionary__daysLeftToRepeat'>Дней до повтора: ${wordData.userWord.optional.daysLeftToRepeat}</div>
    </div>
    <div class='dictionary-img'>
        <div data-name='Восстановить' class='word-dictionary__remove ${className} tooltip'><i class="fa fa-share"></i></div>
        <img class='word-dictionary__img hidden' src='https://raw.githubusercontent.com/viktorsipach/rslang-data/rslang-data/data/${wordData.image}'></img>
    </div>`
    wrapper.append(word)
   
}

function getDataWords(json,className) {
    const allWordsCounter = document.querySelector('.word-dictionary__all')
    const arrWords = json[0].paginatedResults;
    arrWords.forEach(word => {
        createWord(word,className)
    })
    allWordsCounter.innerText = arrWords.length;
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

function addClickRestoreWordHandler() {
    const wrapper = document.querySelector('.wrapper__dictionary')
    wrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('word-dictionary__remove')) {
            const wordId = e.path[2].id
            restoreWord(wordId)
        } else if (e.target.classList.contains('fa')) {
            const wordId = e.path[3].id
            restoreWord(wordId)
        }
    })
}

function showContent(content) {
    content.forEach((el) => {
        el.classList.remove('hidden')
    })
}

async function updateContentWithSetting() {
    const settings = await getUserSettings();
    const settingsForDictionary = settings.optional.training.settingsPage.cardSettings;
    if (settingsForDictionary.showAssociatedPicture) {
        const pictures = document.querySelectorAll('.word-dictionary__img');
        showContent(pictures)
    } 
    if (settingsForDictionary.showExampleSentence) {
        const examples = document.querySelectorAll('.word-dictionary__example');
        showContent(examples)
    } 
    if (settingsForDictionary.showTranscription) {
        const transcriptions = document.querySelectorAll('.word-dictionary__transcription');
        showContent(transcriptions)
    } 
    if (settingsForDictionary.showExplanationSentence) {
        const meanings = document.querySelectorAll('.word-dictionary__meaning');
        showContent(meanings)
    }
}


export function initStudyingWords() {
    const CLASS_FOR_STUDYING = 'hidden';
    const ALL_WORDS = 3600;
    const LOAD_WORDS = 1000;
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    getRepeatWords(ALL_WORDS).then(json => getDataWords(json,CLASS_FOR_STUDYING))
    setTimeout(updateContentWithSetting,LOAD_WORDS)
}

export function initDifficultWords() {
    const CLASS_FOR_STUDYING = 'show__btn-remove';
    const ALL_WORDS = 3600;
    const LOAD_WORDS = 1000;
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    addClickRestoreWordHandler()
    getTrickyWords(ALL_WORDS).then(json => getDataWords(json,CLASS_FOR_STUDYING))
    setTimeout(updateContentWithSetting,LOAD_WORDS)
}

export function initRemovedWords() {
    const CLASS_FOR_STUDYING = 'show__btn-remove';
    const ALL_WORDS = 3600;
    const LOAD_WORDS = 1000;
    createWrapperWords()
    createHeaderWords()
    addClickIconAudioHandler()
    addClickRestoreWordHandler()
    getDeleteWords(ALL_WORDS).then(json => getDataWords(json,CLASS_FOR_STUDYING))
    setTimeout(updateContentWithSetting,LOAD_WORDS)
}