const renderSavannaStartPage = () => {
    const savannaStart = document.createElement('div');
    savannaStart.className = 'savanna__start';

    savannaStart.innerHTML = `
    <div class="savanna__start">
        <div class="savanna__header">
            <div class="savanna__hints">
                <button class="button savanna-button__icon">
                    <i class="fa fa-bell-slash-o"></i>
                </button>
            </div>
        </div>
        <div class="savanna__content">
            <h2 class="savanna__name">саванна</h2>
            <p class="savanna__description">Тренировка Саванна развивает словарный запас.</p>
            <ul class="savanna__rules">
                <li>Правила игры:</li>
                <li>- Необходимо определить правильный перевод слова</li>
                <li>- Выбор правильного варианта можно делать кликом правой кнопки мыши или нажатием клавиши 1, 2, 3 или 4</li>
            </ul>
            <button class="button button__savanna">начать</button>
        </div>
    </div>
    `;
    
    return savannaStart;
}

export default renderSavannaStartPage;