export default function renderNotificationModal() {
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification-container';
  notificationContainer.innerHTML = `
  <div class = "modal-container">
    <div class="notification-title">Поздравляем!!!</div>
    <div class="notification-text">Вы выучили все слова на сегодня!</div>

    <div class="buttons notification__buttons">
      <button class="button game__button continue">Продолжить изучение</button>
      <button class="button game__button close">Закрыть</button>
    </div>
  </div>`;
  return notificationContainer;
}