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
    ContentBuilder.addMainPageContent(this.gameContainerSelector);
  }
}

export default new Sprint();
