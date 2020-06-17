export default function renderGamePage() {
    const fragment = document.createDocumentFragment();

    const gameProgress = document.createElement('div');
    gameProgress.className = 'game__progress';

    const closeGame = document.createElement('div');
    closeGame.className = 'game__close';

    const gameBlockImage = document.createElement('div');
    gameBlockImage.className = 'game__image';

    const gameImage = document.createElement('div');
    gameImage.className = 'image';

    const gameSrcImage = document.createElement('img');
    gameSrcImage.src = 'assets/img/empty-audiocall.jpg';

    const gameBlockVoice = document.createElement('div');
    gameBlockVoice.className = 'game__voice-word';

    const gameVoice = document.createElement('div');
    gameVoice.className = 'game__voice';

    const gameWord = document.createElement('div');
    gameWord.className = 'game__word';
    gameWord.innerText = 'empty';

    const gameWordsBlock = document.createElement('div');
    gameWordsBlock.className = 'game__words words';

    const gameButton = document.createElement('div');
    gameButton.className = 'game__button button';
    gameButton.innerText = 'Не знаю';


    gameBlockImage.append(gameImage);
    gameImage.append(gameSrcImage);

    gameBlockVoice.append(gameVoice);
    gameBlockVoice.append(gameWord);

    for (let i = 1; i < 6; i += 1) {
        const gameWordsItem = document.createElement('div');
        gameWordsItem.className = 'words__item';

        const gameWordsNumber = document.createElement('div');
        gameWordsNumber.className = 'words__number';
        gameWordsNumber.innerText = i;
        
        const gameWordsName = document.createElement('div');
        gameWordsName.className = 'words__name';
        
        switch(i) {
            case 1:
                gameWordsName.innerText = 'проход';
                break;

            case 2:  
                gameWordsName.innerText = 'тупой';
                break;

            case 3:  
                gameWordsName.innerText = 'пустой';
                break;

            case 4:  
                gameWordsName.innerText = 'чужой';
                break;

            case 5:  
                gameWordsName.innerText = 'частый';
                break;
            default:
                break; 
        }

        gameWordsBlock.append(gameWordsItem);
        gameWordsItem.append(gameWordsNumber);
        gameWordsItem.append(gameWordsName);
    }

    const gameContainer = document.createElement('div');
    gameContainer.className = 'container';
    gameContainer.append(gameBlockImage);
    gameContainer.append(gameBlockVoice);
    gameContainer.append(gameWordsBlock);
    gameContainer.append(gameButton);


    const gamePage = document.createElement('div');
    gamePage.className = 'game';
    gamePage.append(gameProgress);
    gamePage.append(closeGame);
    gamePage.append(gameContainer);
    
    fragment.append(gamePage);
    
    return fragment;
}