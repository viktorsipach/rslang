class Statistics {
    constructor(nameGame) {
        this.nameGame = nameGame;
    }

    renderStatTrainingGame() {
        const statInfo = document.createElement('div');
        statInfo.className = 'stat-info';
        statInfo.innerHTML = `
        <div class="stat-title">
            <h2>Название игры: <span class="stat-gameName">${this.nameGame}</span></h2>
            <p>Оценка дневной и долгосрочной статистики обучения</p>
        </div>
        <div class="stat-schedule">
            <div class="chart-container">
                <canvas id="chart"></canvas>
            </div>
        </div>
        `;

        return statInfo;
    }

    renderStatMiniGame() {
        const statInfo = document.createElement('div');
        statInfo.className = 'stat-info';
        statInfo.innerHTML = `
        <div class="stat-title">
            <h2>Название игры: <span class="stat-gameName">${this.nameGame}</span></h2>
            <p>Здесь вы можете увидеть результаты последних <span class="stat-number">5</span> игр </p>
        </div>
        <div class="stat-schedule">
            <div class="chart-container">
                <canvas id="chart"></canvas>
            </div>
        </div>
        `;

        return statInfo;
    }
}

export default Statistics;