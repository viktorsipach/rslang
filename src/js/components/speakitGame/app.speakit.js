/* eslint-disable new-cap */
/* eslint-disable no-undef */
import {LINKS, CHILDREN,  properties} from './constants.speakit';
import { getRoundData } from '../../API/dataAPI';
import playAudio from './audioPlayer.speakit';
import {
    renderDom,
    addCard, 
    addCardResult, 
    removeCardsResults, 
    removeCards, 
    addStar,  
    removeStars
} from './dom.speakit';


const getDataCards = (json) => {
    const arrWords = json;
    arrWords.sort(() => { return Math.random() - 0.5});
    arrWords.forEach(el => {
        const { word } = el
        const { transcription } = el
        const { wordTranslate } = el
        const { image } = el
        const { audio } = el
        addCard(word,transcription,wordTranslate,image,audio)
        addCardResult(word,transcription,wordTranslate,image,audio)
    })
};

const showTranslate = (transWord) => {
    const translate = document.querySelector('.translate__speakit')
    translate.innerText = transWord
};

const showImage = (urlImage) => {
    const image = document.querySelector('.image__container_speakit')
    image.style.backgroundImage = `url(${urlImage})`
};

const removeActiveClassOfCard = () => {
    const cards = document.querySelectorAll('.card-speakit');
    cards.forEach((el) => {
        el.classList.remove('active-card__speakit')
    })
}

const listenerCard = (e) => {
    if (e.target.classList.contains('card-speakit')) {
        const audio = e.target.children[CHILDREN.SECOND].innerText
        const image = e.target.children[CHILDREN.THIRD].innerText
        const translate = e.target.children[CHILDREN.FOURTH].innerText
        showTranslate(translate);
        playAudio(audio)
        showImage(image)
        removeActiveClassOfCard()
        e.target.classList.add('active-card__speakit')
    } else if (e.target.classList.contains('wrapper-text__speakit') || e.target.classList.contains('icon__speakit')) {
        const parent = e.path[CHILDREN.SECOND]
        const audio = parent.children[CHILDREN.SECOND].innerText
        const image = parent.children[CHILDREN.THIRD].innerText
        const translate = parent.children[CHILDREN.FOURTH].innerText
        showTranslate(translate);
        playAudio(audio)
        showImage(image)
        removeActiveClassOfCard()
        parent.classList.add('active-card__speakit')
    } else if (e.target.classList.contains('card-speakit__word') || e.target.classList.contains('card-speakit__transcription')) {
        const parent = e.path[CHILDREN.THIRD]
        const audio = parent.children[CHILDREN.SECOND].innerText
        const image = parent.children[CHILDREN.THIRD].innerText
        const translate = parent.children[CHILDREN.FOURTH].innerText
        showTranslate(translate);
        playAudio(audio)
        showImage(image)
        removeActiveClassOfCard()
        parent.classList.add('active-card__speakit')
    }
};

const addClickCardHandler = () => {
    const container = document.querySelector('.wrapper__cards_speakit')
    container.addEventListener('click', listenerCard)
}

const addActiveResults = () => {
    const cards = document.querySelectorAll('.card-speakit');
    const resultsWord = document.querySelectorAll('.result-speakit__word');
    cards.forEach((el) => {
        resultsWord.forEach((element) => {
        if (el.classList.contains('active-card__speakit') && el.id === element.innerHTML) {
            const parent = element.parentNode
            parent.classList.add('active-result__speakit')
        }
        }) 
    })
}

const updateResults = () => {
    const results = document.querySelectorAll('.result-speakit');
    const resultsCorrect = document.querySelector('.results__item_correct');
    const resultsError = document.querySelector('.results__item_error');
    const counterError = document.querySelector('.error__speakit_curr');
    const counterCorrect = document.querySelector('.correct__speakit_curr');
    results.forEach((el, idx) => {
        if (el.classList.contains('active-result__speakit')) {
           resultsCorrect.append(results[idx])
           counterCorrect.innerText =  resultsCorrect.childElementCount
           counterError.innerText =  resultsError.childElementCount
        }
    })
}

const startSpeak = () => {
    const cards = document.querySelectorAll('.card-speakit')
    const btn = document.querySelector('.btn-speak__speakit')
    const resultSpeaking = document.querySelector('.result-speak__speakit')
    if(window.webkitSpeechRecognition) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.maxAlternatives = 1;
        if (btn.classList.contains('btn-active')) {  
            recognition.start();
            recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1][0].transcript;
            resultSpeaking.innerText = result
            cards.forEach((el) => {
                const word = el.id
                const image = el.children[CHILDREN.THIRD].innerText
                if (word === resultSpeaking.innerText || word === result.toLowerCase()) {
                    const card = document.getElementById(`${word}`)
                    card.classList.add('active-card__speakit')
                    showImage(image)
                    addStar()
                    addActiveResults()
                    updateResults()
                }
            })
            }
        }
    }
};

const addStartSpeakBtnHandler = () => {
    const container = document.querySelector('.wrapper__cards_speakit')
    const btn = document.querySelector('.btn-speak__speakit');
    const resultSpeaking = document.querySelector('.result-speak__speakit')
    const translate = document.querySelector('.translate__speakit')
    btn.addEventListener('click', () => {
        removeActiveClassOfCard()
        if (!btn.classList.contains('btn-active')) {
            btn.classList.add('btn-active')
            resultSpeaking.classList.remove('hidden')
            resultSpeaking.innerText = ''
            btn.innerText = 'Стоп'
            translate.innerText = ''
            container.removeEventListener('click', listenerCard)
            startSpeak()
            showImage(LINKS.LINK__URL_DEFAULT) 
        } else {
            addClickCardHandler()
            btn.classList.remove('btn-active')
            resultSpeaking.classList.add('hidden')
            btn.innerText = 'Говорить'
            const recognition = new webkitSpeechRecognition();
            recognition.start()
            recognition.stop()
        }
    })  
}

const restart = () => {
    const translate = document.querySelector('.translate__speakit')
    const btnSpeak = document.querySelector('.btn-speak__speakit');
    const resultSpeaking = document.querySelector('.result-speak__speakit')
    const counterError = document.querySelector('.error__speakit_curr');
    const counterCorrect = document.querySelector('.correct__speakit_curr');
    const recognition = new webkitSpeechRecognition();

    counterCorrect.innerText = 0
    counterError.innerText =  10
   
    btnSpeak.classList.remove('btn-active')
    resultSpeaking.classList.add('hidden')
    btnSpeak.innerText = 'Говорить'
    translate.innerText = ''
   
    recognition.start()
    recognition.stop()

    showImage(LINKS.LINK__URL_DEFAULT)
    removeActiveClassOfCard()
    addClickCardHandler()
    removeStars()
}

const addClickRestartBtnHandler = () => {
    const btnRestart = document.querySelector('.btn-restart__speakit');
    btnRestart.addEventListener('click', () => {
        removeCards()
        removeCardsResults()
        restart()
        getRoundData(properties.level, properties.page, properties.wordsPerRound).then(json => getDataCards(json))
    })
}

const addClickNewGameBtnHandler = () => {
    const btnNewGame = document.querySelector('.btn-new-game__speakit');
    const main = document.querySelector('.main__speakit');
    const results = document.querySelector('.results__speakit')
    const page = document.querySelector('.page__speakit');
    
    btnNewGame.addEventListener('click', () => {
        page.value = properties.page + 1;
        properties.page = Number(page.value);
        main.classList.remove('hidden')
        results.classList.add('hidden')
        removeCards()
        removeCardsResults()
        restart()
        getRoundData(properties.level, properties.page, properties.wordsPerRound).then(json => getDataCards(json))
    })
}

const addStartPageHandler = () => {
    const startBtn = document.querySelector('.start-page__btn_speakit');
    const startPage = document.querySelector('.start-page__speakit');
    const main = document.querySelector('.main__speakit');
    startBtn.addEventListener('click', () => {
        startPage.classList.add('hidden')
        main.classList.remove('hidden')
    })
};

const addClickResultsBtnHandler = () => {
    const btnResult = document.querySelector('.btn-result__speakit');
    const main = document.querySelector('.main__speakit');
    const results = document.querySelector('.results__speakit');
    btnResult.addEventListener('click', () => {
        main.classList.add('hidden')
        results.classList.remove('hidden')
    })
}


const addClickReturnBtnHandler = () => {
    const btnReturn = document.querySelector('.btn-return__speakit');
    const main = document.querySelector('.main__speakit');
    const results = document.querySelector('.results__speakit');
    btnReturn.addEventListener('click', () => {
        main.classList.remove('hidden')
        results.classList.add('hidden')
    })
}

const addClickResultsHandler = () => {
    const results = document.querySelector('.results__speakit')
    results.addEventListener('click', (e) => {
    if (e.target.classList.contains('result-speakit')) {
        const audio = e.target.children[CHILDREN.SECOND].innerText
        playAudio(audio)
    } else if (e.target.classList.contains('icon__speakit')) {
        const parent = e.path[CHILDREN.SECOND]
        const audio = parent.children[CHILDREN.SECOND].innerText
        playAudio(audio)
    } else if (e.target.classList.contains('result-speakit__word') || e.target.classList.contains('result__transcription')) {
        const parent = e.path[CHILDREN.SECOND]
        const audio = parent.children[CHILDREN.SECOND].innerText
        playAudio(audio)
        } 
    })
}

const changeLevelHandler = () => {
    const level = document.querySelector('.level__speakit');
    const page = document.querySelector('.page__speakit');
    level.onchange = () => {
        properties.level = Number(level.value);
        properties.page =  Number(page.value);
        removeCards()
        removeCardsResults()
        restart()
        getRoundData(properties.level, properties.page, properties.wordsPerRound).then(json => getDataCards(json))   
    }
    page.onchange = () => {
        properties.level = Number(level.value);
        properties.page =  Number(page.value);
        removeCards()
        removeCardsResults()
        restart()
        getRoundData(properties.level, properties.page, properties.wordsPerRound).then(json => getDataCards(json))
    }
}

export default function initSpeakItGame() {
    renderDom()
    addStartPageHandler()
    changeLevelHandler()
    addClickCardHandler()
    addStartSpeakBtnHandler()
    addClickRestartBtnHandler()
    addClickResultsBtnHandler()
    addClickReturnBtnHandler()
    addClickNewGameBtnHandler()
    addClickResultsHandler()
    getRoundData(properties.level, properties.page, properties.wordsPerRound).then(json => getDataCards(json))
}