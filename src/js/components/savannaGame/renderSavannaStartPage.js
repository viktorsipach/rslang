const renderSavannaStartPage = () => {
    const savannaStart = document.createElement('div');
    const savannaHeader = document.createElement('div');
    const select = document.createElement('div');
    const selectOption = document.createElement('select');
    const buttonClose = document.createElement('button');
    const savannaContent = document.createElement('div');
    const savannaRules = document.createElement('ul');
    const buttonStart = document.createElement('button');

    savannaStart.className = 'savanna__start';
    savannaHeader.className = 'savanna__header';
    select.className = 'select';
    select.classList.add('select__level');
    selectOption.setAttribute('name', 'slct');
    selectOption.setAttribute('id', 'slct');
    buttonClose.className = 'button';
    buttonClose.classList.add('button__close');
    savannaContent.className = 'savanna__content';
    savannaRules.className = 'savanna__rules';
    buttonStart.className = 'button';
    buttonStart.classList.add('button__savanna');

    select.append(selectOption);
    selectOption.innerHTML = '<option value="1">1</option>';
    selectOption.innerHTML += '<option value="2">2</option>';
    selectOption.innerHTML += '<option value="3">3</option>';
    selectOption.innerHTML += '<option value="4">4</option>';
    selectOption.innerHTML += '<option value="5">5</option>';
    selectOption.innerHTML += '<option value="6">6</option>';

    savannaHeader.append(select);

    buttonClose.innerHTML = 'выйти';

    savannaHeader.append(buttonClose);

    buttonStart.innerHTML = 'начать';

    savannaContent.innerHTML = '<h2 class="savanna__name">саванна</h2>';
    savannaContent.innerHTML += '<p class="savanna__description">Тренировка Саванна развивает словарный запас.</p>';
    
    savannaRules.innerHTML = '<li>Правила игры:</li>';
    savannaRules.innerHTML += '<li>- Необходимо определить правильный перевод слова</li>';
    savannaRules.innerHTML += '<li>- Выбор правильного варианта можно делать кликом правой кнопки мыши или нажатием клавиши 1, 2, 3 или 4</li>';

    savannaContent.append(savannaRules);
    savannaContent.append(buttonStart);

    savannaStart.append(savannaHeader);
    savannaStart.append(savannaContent);
    
    return savannaStart;
}

export default renderSavannaStartPage;