import { initMainPage, removeActiveClassNav }  from '../mainPage/mainPage.component'

function removeClassModificatorCloseBtn() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.classList.forEach((el) => {
        const className = el;
        if(!(className === 'close-btn') || (className === 'hidden')) {
            closeBtn.classList.remove(`${className}`)
        }
    })
}

export default function addClickCloseBtnHandler() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        removeClassModificatorCloseBtn()
        removeActiveClassNav()
        initMainPage()
    })
}