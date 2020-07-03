class PressKey {
    constructor(data) {
        this.data = data;
        this.keyboard = (e) => {
            this.pressKeyboard(e)
        }
    }

    method1() {
        document.addEventListener('keyup', this.keyboard);
    }

    method2() {
        document.addEventListener('keyup', this.keyboard);
    }

    pressKeyboard(e) {
        e.preventDefault();
        const numberStartWords = 20;
        const span = document.querySelectorAll('*[data-word]');
        const hiddenWord = document.querySelector('.savanna__hidden-word');
        if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3' || e.code === 'Digit4') {
            count += 1;
            console.log(count);
            if (count < numberStartWords) {
                if (document.getElementById(e.code).innerText === hiddenWord.id.toUpperCase()) {
                    document.getElementById(e.code).classList.add('correct');
                    actionForRound();
                    playSound('assets/audio/correct.mp3');
                    setTimeout(() => goOutWord(true), 250);
                    span[count - 1].innerHTML = '+';
                    countCorrect += 1;
                    setTimeout(() => generateTemplateMain(this.data, count), 500);
                    setTimeout(() => fallWord(this.data), 500);
                    setTimeout(() => savannaGameplayMouse(this.data), 500);
                } else {
                    countHealth -= 1;
                    if (countHealth === 0) {
                        document.getElementById(e.code).classList.add('wrong');
                        actionForRound();
                        playSound('assets/audio/error.mp3');
                        goOutWord(false);
                        setTimeout(() => savannaShortStatistics(), 500);
                    } else {
                        savannaHealth(countHealth);
                        document.getElementById(e.code).classList.add('wrong');
                        actionForRound();
                        playSound('assets/audio/error.mp3');
                        goOutWord(false);
                        setTimeout(() => generateTemplateMain(this.data, count), 500);
                        setTimeout(() => fallWord(this.data), 500);
                        setTimeout(() => savannaGameplayMouse(this.data), 500);
                    }
                }                
            } else {
                if (document.getElementById(e.code).innerText === hiddenWord.id.toUpperCase()) {
                    document.getElementById(e.code).classList.add('correct');
                    actionForRound();
                    playSound('assets/audio/correct.mp3');
                    setTimeout(() => goOutWord(true), 250);
                    span[count - 1].innerHTML = '+';
                    countCorrect += 1;
                    setTimeout(() => savannaShortStatistics(), 500);
                } else {
                    document.getElementById(e.code).classList.add('wrong');
                    actionForRound();
                    playSound('assets/audio/error.mp3');
                    goOutWord(false);
                    setTimeout(() => savannaShortStatistics(), 500);
                }
            }   
        }
    }
}