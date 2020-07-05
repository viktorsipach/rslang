import Statistics from './renderStatisticsPage';

const DATA = {};

const statLayout = () => {
    const page = document.querySelector('.page');
    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper__stat-page';

    wrapper.innerHTML = `
    <div class="stat-menu">
        <ul class="stat-games">
            <li class="stat-game stat-game_active">учи слова</li>
            <li class="stat-game">говори</li>
            <li class="stat-game">пазл</li>
            <li class="stat-game">саванна</li>
            <li class="stat-game">аудиовызов</li>
            <li class="stat-game">спринт</li>
            <li class="stat-game">найди слова</li>
        </ul>
    </div>
    <div class="stat-append"></div>
    `;

    page.innerHTML = '';
    page.append(wrapper);
}

const statSchedule = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    ctx.fillStyle = "black"; // Задаём чёрный цвет для линий 
    ctx.lineWidth = 2.0; // Ширина линии
    ctx.beginPath(); // Запускает путь
    ctx.moveTo(30, 10); // Указываем начальный путь
    ctx.lineTo(30, 460); // Перемешаем указатель
    ctx.lineTo(500, 460); // Ещё раз перемешаем указатель
    ctx.stroke(); // Делаем контур

    // Цвет для рисования
    ctx.fillStyle = "black";
    // Цикл для отображения значений по Y 
    for(let i = 0; i < 6; i += 1) { 
        ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60); 
        ctx.beginPath(); 
        ctx.moveTo(25, i * 80 + 60); 
        ctx.lineTo(30, i * 80 + 60); 
        ctx.stroke(); 
    }
    // Массив с меткам месяцев
    let labels = ["05.07.20", "05.07.20", "06.07.20", "06.07.20", "07.07.20"]; 
    // Выводим меток
    for(var i=0; i<labels.length; i++) { 
        ctx.fillText(labels[i], 50+ i*100, 475); 
    }
    // Объявляем массив данных графика
    let data = [ 10, 53, 39, 54, 21 ]; 
    // Назначаем зелёный цвет для графика
    ctx.fillStyle = "green"; 
    // Цикл для отрисовки графиков
    for(var i=0; i<data.length; i++) { 
        var dp = data[i]; 
        ctx.fillRect(40 + i*100, 460-dp*5 , 50, dp*5); 
    }
}

const removeActiveStatGame = () => {
    const games = document.querySelectorAll('.stat-game');
    games.forEach(el => {
        if (el.classList.contains('stat-game_active')) {
            el.classList.remove('stat-game_active');
        }
    })
}

const addActiveStatGame = (e) => {
    const el = e.target;
    removeActiveStatGame();
    el.classList.add('stat-game_active');
}

const statGameChoiсe = () => {
    const stat = document.querySelector('.stat-append');
    const game = document.querySelector('.stat-games');
    const mainGame = document.querySelector('.stat-game_active');
    console.log(mainGame.textContent);
    const mainStat = new Statistics('учи слова');
    stat.innerHTML = '';
    stat.append(mainStat.renderStatTrainingGame());
    statSchedule();
    game.addEventListener('click', (e) => {
        addActiveStatGame(e);
        if (e.target.innerHTML === 'учи слова') {
            stat.innerHTML = '';
            stat.append(mainStat.renderStatTrainingGame());
            statSchedule();
        } else {
            console.log(e.target.innerHTML);
            const gameStat = new Statistics(e.target.innerHTML);
            stat.innerHTML = '';
            stat.append(gameStat.renderStatMiniGame());
            statSchedule();
        }
    });
}

const initStatistics = () => {
    statLayout();
    statGameChoiсe();
};

export default initStatistics;