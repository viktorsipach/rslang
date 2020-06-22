class RenderSavannaMainPage  {
    constructor(word, translate, arr) {
        this.word = word;
        this.translate = translate;
        this.arr = arr;
        // console.log(this.arr);
    }


    render() {
        const savannaMain = document.createElement('div');
        const savannaHeader = document.createElement('div');
        const savannaLevel = document.createElement('div');
        const savannaHealth = document.createElement('div');
        const savannaHiddenWord = document.createElement('span');
        const savannaGameplay = document.createElement('div');
        const savannaChoise = document.createElement('div');
        const savannaFooter = document.createElement('div');
        const image = document.createElement('img');

        savannaMain.className = 'savanna__main';
        savannaHeader.className = 'savanna__header';
        savannaLevel.className = 'savanna__level';
        savannaHealth.className = 'savanna__health';
        savannaHiddenWord.className = 'savanna__hidden-word';
        savannaGameplay.className = 'savanna__gameplay';
        savannaChoise.className = 'savanna__choise';
        savannaFooter.className = 'savanna__footer';
        image.setAttribute('src', './assets/img/weapon.jpg');
        image.setAttribute('alt', 'weapon');

        savannaLevel.innerHTML = '<p>уровень 1</p><p>раунд 1</p>';

        savannaHealth.innerHTML = '<span>HP1</span><span>HP2</span><span>HP3</span><span>HP4</span><span>HP5</span>';

        savannaHiddenWord.innerHTML = `${this.word}`;
        savannaHiddenWord.setAttribute('id', `${this.translate}`);

        savannaChoise.innerHTML = `<span id='Digit1'>${this.arr[0]}</span><span id='Digit2'>${this.arr[1]}</span><span id='Digit3'>${this.arr[2]}</span><span id='Digit4'>${this.arr[3]}</span>`;

        savannaHeader.append(savannaLevel);
        savannaHeader.append(savannaHealth);

        savannaGameplay.append(savannaChoise);

        savannaFooter.append(image);

        savannaMain.append(savannaHeader);
        savannaMain.append(savannaHiddenWord);
        savannaMain.append(savannaGameplay);
        savannaMain.append(savannaFooter);

        return savannaMain;
    }

    renderResults() {
        const savannaWord = document.createElement('div');
        const savannaEng = document.createElement('p');
        const savannaRus = document.createElement('span');
        const savannaMark = document.createElement('span');

        savannaWord.className = 'savanna-word';
        savannaEng.className = 'savanna-word__eng';
        savannaRus.className = 'savanna-word__rus';
        savannaMark.className = 'savanna-mark';

        savannaEng.innerHTML = `${this.word}`;
        savannaRus.innerHTML = `${this.translate}`;
        savannaMark.innerHTML = '-';

        savannaEng.append(savannaRus);
        savannaWord.append(savannaEng);
        savannaWord.append(savannaMark);

        return savannaWord;
    }
}

export default RenderSavannaMainPage;