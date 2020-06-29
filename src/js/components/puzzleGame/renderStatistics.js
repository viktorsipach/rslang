export default function renderStatisticsModal() {
  const puzzleStatistic = document.createElement('div');
  puzzleStatistic.className = 'puzzle__statistic';
  puzzleStatistic.innerHTML = `
  <div class = "modal-container__puzzle">
    <div class="statistic-title"></div>
    <div class="statistic-container">
      <div class="painting__container">
        <div class="painting__image"></div>
        <div class="painting__info"></div>
      </div>
      <div class="iDontKnowSentences-title">Я не знаю
      <span class="iDontKnowSentences-count"></span>
      </div>
      <div class="iDontKnowSentences"></div>
      <div class="iKnowSentences-title">Я знаю
      <span class="iKnowSentences-count"></span>
      </div>
      <div class="iKnowSentences"></div>
    </div>
    <div class="buttons statistic__buttons">
      <button class="button puzzleGame__button continue">Продолжить</button>
    </div>
  </div>`;
  return puzzleStatistic;
}
