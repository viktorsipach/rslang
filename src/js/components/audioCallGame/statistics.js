export function statisticsWords(arrTrueAnswer, arrFalseAnswer) {
    const statisticsPage = document.querySelector('.statistics-audioCall');
    const statisticsDom = document.createElement('div');
    const statisticsFalse = document.createDocumentFragment();
    const statisticsTrue = document.createDocumentFragment();

    for (let i = 0; i < arrFalseAnswer.length; i += 1) {
        const answerTrue = document.createElement('p');
        answerTrue.innerText = arrFalseAnswer[i];
        statisticsTrue.append(answerTrue);
    }
    for (let i = 0; i < arrTrueAnswer.length; i += 1) {
        const answerFalse = document.createElement('p');
        answerFalse.innerText = arrTrueAnswer[i];
        statisticsFalse.append(answerFalse);
    }

    statisticsDom.classList = 'statistics-modal-window';
    statisticsDom.innerHTML = `
    <div class="modal-audioCall">
        <div class="modal__close"></div>
        <div class="statistics-audioCall__false">
            <div class="statistics-audioCall__title">Ошибок</div>
            <div class="statistics-audioCall__words"></div>
        </div>
        <div class="statistics-audioCall__true">
            <div class="statistics-audioCall__title">Знаю</div>
            <div class="statistics-audioCall__words"></div>
        </div>
        <div class="modal__btn_audiocallGame">далее</div>
    </div>`

    statisticsPage.append(statisticsDom);
    statisticsPage.querySelector( '.statistics-audioCall__false .statistics-audioCall__words').append(statisticsTrue);
    statisticsPage.querySelector( '.statistics-audioCall__true .statistics-audioCall__words').append(statisticsFalse);

    const closeModal = document.querySelector('.modal__close');

    closeModal.addEventListener('click', () => {
        statisticsPage.classList.add('modal-audioCall-hidden');
        statisticsDom.innerHTML = '';
    });
}

export default {statisticsWords};