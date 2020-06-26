export default function renderNotificationModal(isLastWordsInApp) {
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification-container';
  notificationContainer.innerHTML = `
  <div class = "modal-container">
    <div class="notification-title">УРА!!! На сегодня всё!</div>
    <div class="notification-text"></div>
    <div class="buttons notification__buttons"></div>
  </div>`;
  if (isLastWordsInApp) {
    notificationContainer.querySelector('.notification-text').innerHTML = `
    Дневной лимит исчерпан. Новых карточек нет.
    <br>
    Советуем вам для закрепления изученных слов, поиграть в МИНИ-ИГРЫ.
    <br>
    Если вы хотите повторно изучить слова, нажмите кнопку СНАЧАЛА.
    `;
    notificationContainer.querySelector('.notification__buttons').innerHTML = 
    `<button class="button game__button again">Сначала</button>
    <button class="button game__button mini-games">Мини-игры</button>`
  } else {
    notificationContainer.querySelector('.notification-text').innerHTML = `
    Есть еще новые карточки, но дневной лимит исчерпан. 
    <br>
    Советуем вам для закрепления изученных слов, поиграть в МИНИ-ИГРЫ.
    <br>
    Если вы хотите изучать больше слов, то дневной лимит можно увеличить НАСТРОЙКАХ, но, пожалуйста,
    имейте ввиду, что чем больше новых карточек вы просмотрите, тем больше карточек вам нужно будет повторить.
    <br>
    Если сегодня вы хотите выучить вдвое больше слов, нажмите кнопку ПРОДОЛЖИТЬ.
    `;
    notificationContainer.querySelector('.notification__buttons').innerHTML = 
    `<button class="button game__button continue">Продолжить</button>
    <button class="button game__button settings">Настройки</button>
    <button class="button game__button mini-games">Мини-игры</button>`
  }
  return notificationContainer;
}