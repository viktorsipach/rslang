import Background from './modules/BackgroundHandler';
import ContentBuilder from './modules/ContentBuilder';

class Sprint {
  init(parentSelector = '.page') {
    ContentBuilder.addStartPageContent(parentSelector, 'Спринт');
    ContentBuilder.addMainPageContent(parentSelector);

    Background.setBackgroundImage('.sprint__panel');

    return this;
  }
}

export default new Sprint();
