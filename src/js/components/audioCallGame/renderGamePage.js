function shuffleWords (array) {
    array.sort(() => Math.random() - 0.5);
}

function playSound(voiceEn) {
    const audioElement = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${voiceEn}`);
    audioElement.play();
}

export default function renderGamePage(arrWordsRus, wordEn, voiceEn, imageEn) {
    shuffleWords(arrWordsRus);

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
    gameSrcImage.src = `https://raw.githubusercontent.com/zhenikusss/rslang-data/master/${imageEn}`;

    const gameBlockVoice = document.createElement('div');
    gameBlockVoice.className = 'game__voice-word';

    const gameVoice = document.createElement('div');
    gameVoice.className = 'game__voice';
    playSound(voiceEn);

    const gameWord = document.createElement('div');
    gameWord.className = 'game__word';
    gameWord.innerText = wordEn.toLowerCase();

    const gameWordsBlock = document.createElement('div');
    gameWordsBlock.className = 'game__words words';

    const gameButton = document.createElement('div');
    gameButton.className = 'game__btn button';
    gameButton.innerText = 'Не знаю';


    gameBlockImage.append(gameImage);
    gameImage.append(gameSrcImage);

    gameBlockVoice.append(gameVoice);
    gameBlockVoice.append(gameWord);

    for (let i = 0; i < 5; i += 1) {
        const gameWordsItem = document.createElement('div');
        gameWordsItem.className = 'words__item';

        const gameWordsNumber = document.createElement('div');
        gameWordsNumber.className = 'words__number';
        gameWordsNumber.innerText = i + 1;
        
        const gameWordsName = document.createElement('div');
        gameWordsName.className = 'words__name';
        gameWordsName.innerText = arrWordsRus[i].toLowerCase();
        
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