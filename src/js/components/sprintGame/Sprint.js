import ContentBuilder from './modules/ContentBuilder';

class Sprint {
  init(parentSelector = '.page') {
    ContentBuilder.addStartPageContent(parentSelector, 'Спринт');
    ContentBuilder.addMainPageContent(parentSelector);

    return this;
  }
}

export default new Sprint();
