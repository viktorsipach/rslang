import initSetting from '../settingsPage/settingsPage.component';

export default function renderTrainingModal() {
  const trainingContainer = document.createElement('div');
  trainingContainer.className = 'training__statistic';
  trainingContainer.innerHTML = `
  <div class = "modal-container__training">
    <div class="notification-title">На сегодня всё!</div>
    <div class="notification-text"></div>
    <div class="buttons statistic__buttons"></div>
  </div>`;
  trainingContainer.querySelector('.notification-text').innerHTML = `
  Есть еще новые карточки, но дневной лимит исчерпан. Для закрепления изученных слов поиграйте в мини-игры.
  <br>
  Если вы хотите изучать больше слов, то дневной лимит можно увеличить в настройках. 
  Имейте ввиду, что чем больше новых карточек вы просмотрите, тем больше карточек вам нужно будет повторить.`;
  trainingContainer.querySelector('.statistic__buttons').innerHTML = 
  `<button class="button game__button settings">Настройки</button>`
  trainingContainer.querySelector('.statistic__buttons').addEventListener('click', (event) => {
    const notificationContainer = document.querySelector('.training__statistic');
    notificationContainer.parentNode.removeChild(notificationContainer);
    if (event.target.classList.contains('settings')) {
      initSetting();
    } 
  });
  return trainingContainer;
}