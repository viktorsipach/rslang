export default function renderGamePage() {
    const fragment = document.createDocumentFragment();

    const closeGame = document.createElement('div');
    closeGame.className = 'game__close';

    const startGameTitle = document.createElement('div');
    startGameTitle.className = 'game__title';
    startGameTitle.innerText = 'Аудиовызов';

    const startGameDescription = document.createElement('div');
    startGameDescription.className = 'game__description';
    startGameDescription.innerText = 'Звучит произношение слова на английском языке, нужно выбрать перевод слова из пяти предложенных вариантов ответа';

    const startGameButton = document.createElement('div');
    startGameButton.className = 'game__start button';
    startGameButton.innerText = 'Начать';

    const startGameContainer = document.createElement('div');
    startGameContainer.className = 'container';

    startGameContainer.append(startGameTitle);
    startGameContainer.append(startGameDescription);
    startGameContainer.append(startGameButton);

    const startGamePage = document.createElement('div');
    startGamePage.className = 'game';
    startGamePage.append(closeGame);
    startGamePage.append(startGameContainer);

    fragment.append(startGamePage);
    
    return fragment;
  }