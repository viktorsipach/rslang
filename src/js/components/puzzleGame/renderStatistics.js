export default function renderStatisticsModal() {

  const puzzleStatistic = document.createElement('div');
  puzzleStatistic.className = 'puzzle__statistic';
  puzzleStatistic.innerHTML = `
  <div class = "modal-container">
    <div class="statistic-title"></div>
    <div class="statistic-container">
      <div class="iDontKnowSentences-title">I don\`t know</div>
      <div class="iDontKnowSentences"></div>
      <div class="iKnowSentences-title">I know</div>
      <div class="iKnowSentences"></div>
    </div>

    <div class="buttons statistic__buttons">
      <button class="button game__button continue">Continue</button>
      <button class="button game__button statistic">Statistic</button>
    </div>
  </div>`;
  return puzzleStatistic;
}