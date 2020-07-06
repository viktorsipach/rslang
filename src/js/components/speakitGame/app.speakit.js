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
    removeStars,
    renderRoundOptions
} from './dom.speakit';
import StatisticsAPI from '../../API/statisticsAPI';


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
                if ((word === resultSpeaking.innerText) || (word === resultSpeaking.innerText.toLowerCase())) {
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

const saveLevelAndRound = () => {
    localStorage.setItem('levelSpeakit', document.getElementById('selectLevel').value); 
    localStorage.setItem('roundSpeakit', document.getElementById('selectRound').value); 
}

const addClickRestartBtnHandler = () => {
    const btnRestart = document.querySelector('.btn-restart__speakit');
    btnRestart.addEventListener('click', () => {
        removeCards()
        removeCardsResults()
        restart()
        getRoundData(properties.level, properties.round, properties.wordsPerRound).then(json => getDataCards(json))
    })
}

const sendLongTermStatistics = () => {
    const ALL_WORDS = 10;
    const resultsCorrect = document.querySelector('.results__item_correct');
    const result = `${resultsCorrect.childElementCount * ALL_WORDS}%`;
    StatisticsAPI.miniGameStat('speakit', result);
}

const addClickNewGameBtnHandler = () => {
    const btnNewGame = document.querySelector('.btn-new-game__speakit');
    const main = document.querySelector('.main__speakit');
    const results = document.querySelector('.results__speakit')
    const level = document.getElementById('selectLevel');
    const round = document.getElementById('selectRound');

    const MAX_ROUND = 60;
    const MAX_LEVEL = 6;
    
    btnNewGame.addEventListener('click', () => {
        if (properties.round < MAX_ROUND) {
            properties.round += 1;
            round.value = properties.round;
        } else if (properties.level < MAX_LEVEL) {
            properties.level += 1;
            properties.round = 1;
            level.value = properties.level;
            round.value = properties.round;
        } else {
            properties.level = 1;
            properties.round = 1;
            level.value = properties.level;
            round.value = properties.round;
        }
        main.classList.remove('hidden')
        results.classList.add('hidden')
        sendLongTermStatistics()
        removeCards()
        removeCardsResults()
        restart()
        saveLevelAndRound()
        getRoundData(properties.level, properties.round, properties.wordsPerRound).then(json => getDataCards(json))
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
    const level = document.getElementById('selectLevel');
    const round = document.getElementById('selectRound');
    level.onchange = () => {
        properties.level = Number(level.value);
        properties.round = Number(round.value);
        removeCards()
        removeCardsResults()
        restart()
        saveLevelAndRound()
        getRoundData(properties.level, properties.round, properties.wordsPerRound).then(json => getDataCards(json))   
    }
    round.onchange = () => {
        properties.level = Number(level.value);
        properties.round = Number(round.value);
        removeCards()
        removeCardsResults()
        restart()
        saveLevelAndRound()
        getRoundData(properties.level, properties.round, properties.wordsPerRound).then(json => getDataCards(json))
    }
}

const startSetting = () => {
    const level = document.getElementById('selectLevel')
    const round = document.getElementById('selectRound')

    if (localStorage.getItem('levelSpeakit')) {
        level.value = localStorage.getItem('levelSpeakit');
        properties.level = Number(level.value);
    }
    if (localStorage.getItem('roundSpeakit')) {
        round.value = localStorage.getItem('roundSpeakit');
        properties.round = Number(round.value);
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
    renderRoundOptions()
    startSetting()
    getRoundData(properties.level, properties.round, properties.wordsPerRound).then(json => getDataCards(json))
}
