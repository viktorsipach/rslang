export default class Accordion {
  constructor() {
    this.markup = `
      <button class="accordion"></button>
      <div class="accordion__panel"></div>
    `;
  }

  init() {
    const acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i += 1) {
      acc[i].addEventListener('click', () => {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    }
    return this;
  }
}
