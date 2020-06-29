import { menuHandler, addClickNavHandler, initMainPage } from '../mainPage/mainPage.component';
import { addClickCloseBtnHandler } from '../closeButton/closeButton.component'


export default function initApp() {
    menuHandler()
    addClickNavHandler()
    initMainPage()
    addClickCloseBtnHandler()
}