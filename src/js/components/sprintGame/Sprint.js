import Background from './modules/BackgroundHandler';
import ContentBuilder from './modules/ContentBuilder';

class Sprint {
  init(parentSelector = '.page') {
    const parent = document.querySelector(`${parentSelector}`);
    parent.classList.add('page__sprint', 'sprint');
    Background.setBackgroundImage(parentSelector);

    ContentBuilder.addStartPageContent('.page__sprint', 'Спринт');
    ContentBuilder.addMainPageContent('.page__sprint');
    return this;
  }

}

export default new Sprint();
