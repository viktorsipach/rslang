import { initMainPage }  from '../mainPage/mainPage.component'

function removeClassModificatorCloseBtn() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.classList.forEach((el) => {
        const className = el;
        if(!(className === 'close-btn') || (className === 'hidden')) {
            closeBtn.classList.remove(`${className}`)
        }
    })
}

export function addClassModificatorCloseBtn(className) {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.classList.add(`${className}`)
}

export function addClickCloseBtnHandler() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        removeClassModificatorCloseBtn()
        initMainPage()
    })
}