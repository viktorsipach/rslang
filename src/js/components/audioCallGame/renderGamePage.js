function shuffleWords (array) {
    array.sort(() => Math.random() - 0.5);
}

function playSound(voiceEn) {
    const audioElement = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${voiceEn}`);
    audioElement.play();
}

export default function renderGamePage(arrWordsRus, wordEn, voiceEn, imageEn, wordRus) { 
    shuffleWords(arrWordsRus);

    const newArrWordsRus = arrWordsRus.slice(0, 4);

    newArrWordsRus.push(wordRus);
    shuffleWords(newArrWordsRus);

    const fragment = document.createDocumentFragment();

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'game__dropdown game__dropdown_audioCall';

    const dropdownLevel = document.createElement('div');
    dropdownLevel.className = 'game__lvl_audioCall lvl_audioCall';

    const levelTitle = document.createElement('div');
    levelTitle.className = 'lvl__title_audioCall';
    levelTitle.innerText = 'уровень';

    const levelDiv = document.createElement('div');
    levelDiv.className = 'select lvl__select_audioCall'

    const levelSelect = document.createElement('select');

    const levelOption = document.createElement('option');
    levelOption.className = 'lvl__option';
    levelOption.innerText = '1';

    const dropdownRound = document.createElement('div');
    dropdownRound.className = 'game__round_audioCall round_audioCall';

    const roundTitle = document.createElement('div');
    roundTitle.className = 'round__title_audioCall';
    roundTitle.innerText = 'раунд';

    const roundDiv = document.createElement('div');
    roundDiv.className = 'select round__select_audioCall'

    const roundSelect = document.createElement('select');

    const roundOption = document.createElement('option');
    roundOption.className = 'round__option';
    roundOption.innerText = '1';

    const gameProgress = document.createElement('div');
    gameProgress.className = 'game__progress';

    const closeGame = document.createElement('div');
    closeGame.className = 'game__close';

    const gameBlockImage = document.createElement('div');
    gameBlockImage.className = 'game__image';

    const gameImage = document.createElement('div');
    gameImage.className = 'image image_audioCall';

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

    dropdownRound.append(roundTitle);
    roundDiv.append(roundSelect);
    roundSelect.append(roundOption);
    dropdownRound.append(roundDiv);

    dropdownLevel.append(levelTitle);
    levelDiv.append(levelSelect);
    levelSelect.append(levelOption);
    dropdownLevel.append(levelDiv);

    dropdownMenu.append(dropdownRound);
    dropdownMenu.append(dropdownLevel);

    gameBlockImage.append(gameImage);
    gameImage.append(gameSrcImage);

    gameBlockVoice.append(gameVoice);
    gameBlockVoice.append(gameWord);

    const iconSound = document.createElement('div');
    iconSound.className = 'game__iconSound';

    for (let i = 0; i < 5; i += 1) {
        const gameWordsItem = document.createElement('div');
        gameWordsItem.className = 'words__item';

        const gameWordsNumber = document.createElement('div');
        gameWordsNumber.className = 'words__number';
        gameWordsNumber.innerText = i + 1;
        
        const gameWordsName = document.createElement('div');
        gameWordsName.className = 'words__name';
        gameWordsName.innerText = newArrWordsRus[i].toLowerCase();
        
        gameWordsBlock.append(gameWordsItem);
        gameWordsItem.append(gameWordsNumber);
        gameWordsItem.append(gameWordsName);
    }

    const gameContainer = document.createElement('div');
    gameContainer.className = 'container container_audioCall';
    gameContainer.append(gameBlockImage);
    gameContainer.append(gameBlockVoice);
    gameContainer.append(gameWordsBlock);
    gameContainer.append(gameButton);

    const gamePage = document.createElement('div');
    gamePage.className = 'game game_audioCall';
    gamePage.append(gameProgress);
    gamePage.append(closeGame);
    gamePage.append(dropdownMenu);
    gamePage.append(iconSound);
    gamePage.append(gameContainer);
    
    fragment.append(gamePage);

    return fragment;
}