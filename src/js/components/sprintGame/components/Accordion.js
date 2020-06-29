class Accordion {
  init() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
      accordion.addEventListener('click', () => {
        accordion.classList.toggle('active');
        const panel = accordion.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    });
    return this;
  }
}

export default new Accordion();
