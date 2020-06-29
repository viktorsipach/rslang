export default function renderStatisticsModal(isLastWordsInApp, statisticsData) {
  const statisticsContainer = document.createElement('div');
  statisticsContainer.className = 'training__statistic';
  statisticsContainer.innerHTML = `
  <div class = "modal-container__training">
    <div class="notification-title">УРА!!! На сегодня всё!</div>
    <div class="statistic-container">
      <div class="statistic-item">
        <span>Карточек завершено:</span>
        <span>${statisticsData.amountOfWords}</span>
      </div>
      <div class="statistic-item">
        <span>Правильные ответы:</span>
        <span>${statisticsData.amountOfCorrectAnswers}</span>
      </div>
      <div class="statistic-item">
        <span>Новые слова:</span>
        <span>${statisticsData.amountOfNewWords}</span>
      </div>
      <div class="statistic-item">
        <span>Самая длинная серия правильных ответов:</span>
        <span>${statisticsData.longestSeriesOfCorrectAnswers}</span>
      </div>
    </div>
    <div class="notification-text"></div>
    <div class="buttons statistic__buttons"></div>
  </div>`;
  if (isLastWordsInApp) {
    statisticsContainer.querySelector('.notification-text').innerHTML = `
    Дневной лимит исчерпан. Новых карточек нет.
    <br>
    Для закрепления изученных слов, поиграйте в мини-игры.
    <br>
    Если вы хотите повторно изучить слова, нажмите кнопку СНАЧАЛА.
    `;
    statisticsContainer.querySelector('.statistic__buttons').innerHTML = 
    `<button class="button game__button again">Сначала</button>`
  } else {
    statisticsContainer.querySelector('.notification-text').innerHTML = `
    Есть еще новые карточки, но дневной лимит исчерпан. Для закрепления изученных слов, поиграйте в мини-игры.
    <br>
    Если вы хотите изучать больше слов, то дневной лимит можно увеличить настройках, но, пожалуйста,
    имейте ввиду, что чем больше новых карточек вы просмотрите, тем больше карточек вам нужно будет повторить.`;
    statisticsContainer.querySelector('.statistic__buttons').innerHTML = 
    `<button class="button game__button continue">Продолжить</button>
    <button class="button game__button settings">Настройки</button>`
  }
  return statisticsContainer;
}
