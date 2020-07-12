class RenderSavannaMainPage  {
    constructor(word, translate, arr) {
        this.word = word;
        this.translate = translate;
        this.arr = arr; 
    }


    renderHeader() {
        const savannaMain = document.createElement('div');
        savannaMain.className = 'savanna__main';

        savannaMain.innerHTML = `
        <div class="savanna__header">
            <div class="savanna__hints">
                <div class="menu__level">
                    <span class="level__title">уровень</span>
                    <div class="select select__level">
                        <select id="selectLevel">
                        
                        </select>
                    </div>
                </div>
                <div class="menu__level">
                    <span class="round__title">раунд</span>
                    <div class="select select__round">
                        <select id="selectRound">
                        
                        </select>
                    </div>
                 </div>
            </div>
            <div class="savanna__health"> 
                <div class="savanna__health_active"></div>
                <div class="savanna__health_disabled">
                    <span><i class="fa fa-heart-o"></i></span>
                    <span><i class="fa fa-heart-o"></i></span>
                    <span><i class="fa fa-heart-o"></i></span>
                    <span><i class="fa fa-heart-o"></i></span>
                    <span><i class="fa fa-heart-o"></i></span>
                </div>
            </div>
        </div>
        <div class="savanna__play"></div>
        `;

        return savannaMain;
    }

    renderMain() {
        const savannaPlayTemplate = document.createElement('div');
        savannaPlayTemplate.className = 'savanna__mainplay';

        savannaPlayTemplate.innerHTML = `
        <span class="savanna__hidden-word" id="${this.translate}">${this.word}</span>
        <div class="savanna__gameplay">
            <div class="savanna__choise">
                <span id="Digit1">${this.arr[0]}</span>
                <span id="Digit2">${this.arr[1]}</span>
                <span id="Digit3">${this.arr[2]}</span>
                <span id="Digit4">${this.arr[3]}</span>
            </div>
        </div>
        <div class="savanna__bullet"></div>
        <div class="savanna__footer"><img src="./assets/img/weapon.jpg" alt="weapon"></div>
        `;

        return savannaPlayTemplate;
    }

    renderResults() {
        const savannaWord = document.createElement('div');
        savannaWord.className = 'savanna-word';
        savannaWord.innerHTML = `
        <p class='savanna-word__eng'>${this.word}
            <span class='savanna-word__rus'>${this.translate}</span>
        </p>
        <span class='savanna-mark' data-word='${this.word}'>-</span>
        `;
        return savannaWord;
    }
}

export default RenderSavannaMainPage;