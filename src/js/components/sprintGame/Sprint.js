import ContentBuilder from './modules/ContentBuilder';

class Sprint {
  constructor() {
    this.gameContainer = `
      <div class='sprint__panel'></div>
    `;
    this.gameContainerSelector = '.sprint__panel';
    this.gameName = 'Спринт';
  }

  init(parentSelector = '.page') {
    const parent = document.querySelector(parentSelector);
    parent.innerHTML = this.gameContainer;
    ContentBuilder.addStartPageContent(this.gameContainerSelector, this.gameName);
    this.addStartScreenFunctionality();
  }

  addStartScreenFunctionality() {
    const startButton = document.querySelector('.curtain__button_start');
    startButton.addEventListener('click', () => {
      ContentBuilder.addGetReadyContent('.sprint__curtain');
      this.startTimer('.curtain__timer', 5);
      setTimeout(() => {
        ContentBuilder.addMainPageContent(this.gameContainerSelector);
        this.startGame();
      }, 5000);
    });
  }

  startGame() {
    this.startTimer('.sprint__timer', 60);
    return this;
  }

  startTimer(timerSelector, startPoint) {
    const timer = document.querySelector(timerSelector);
    let timerValue = startPoint;
    timer.textContent = timerValue;
    const interval = setInterval(() => {
      timerValue -= 1;
      if (timerValue === -1) {
        clearInterval(interval);
      } else {
        timer.textContent = timerValue;
      }
    }, 1000);
    return this;
  }
}

export default new Sprint();
