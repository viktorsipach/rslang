class RenderSavannaMainPage  {
    constructor(word, translate, arr) {
        this.word = word;
        this.translate = translate;
        this.arr = arr; 
    }


    render() {
        const savannaMain = document.createElement('div');
        savannaMain.className = 'savanna__main';

        savannaMain.innerHTML = `
        <div class="savanna__header">
            <div class="savanna__level">
                <p>уровень 1</p>
                <p>раунд 1</p>
            </div>
            <div class="savanna__health"></div>
            <div class="savanna__health_disabled">
                <span><i class="fa fa-heart-o"></i></span>
                <span><i class="fa fa-heart-o"></i></span>
                <span><i class="fa fa-heart-o"></i></span>
                <span><i class="fa fa-heart-o"></i></span>
                <span><i class="fa fa-heart-o"></i></span>
            </div>
        </div>
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

        return savannaMain;
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