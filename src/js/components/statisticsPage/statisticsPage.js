import Statistics from './renderStatisticsPage';
import StatisticsAPI from '../../API/statisticsAPI';
import Chart from 'chart.js';

const statLayout = () => {
    const page = document.querySelector('.page');
    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper__stat-page';

    wrapper.innerHTML = `
    <div class="stat-menu">
        <ul class="stat-games">
            <li class="stat-game stat-game_active" id="training" data-name="учи слова"><i class="fa fa-clone"></i>учи слова</li>
            <li class="stat-game" id="speakit" data-name="говори"><i class="fa fa-microphone"></i>говори</li>
            <li class="stat-game" id="puzzle" data-name="пазл"><i class="fa fa-puzzle-piece"></i>пазл</li>
            <li class="stat-game" id="savanna" data-name="саванна"><i class="fa fa-tint"></i>саванна</li>
            <li class="stat-game" id="audiocall" data-name="аудиовызов"><i class="fa fa-headphones"></i>аудиовызов</li>
            <li class="stat-game" id="sprint" data-name="спринт"><i class="fa fa-flag-checkered"></i>спринт</li>
            <li class="stat-game" id="findWords" data-name="найди слова"><i class="fa fa-search"></i>найди слова</li>
        </ul>
    </div>
    <div class="stat-append"></div>
    `;

    page.innerHTML = '';
    page.append(wrapper);
}

const graph = (namesGame, idx, isStatNum) => {
    let namelabel;
    let axisX = [];
    let axisY = [];
    for (let key in namesGame[idx]) {
        if (key !== '#') {
            if (idx === 'training') {
                axisX.push(key.substring(0, key.length - 11));
                axisY.push(namesGame[idx][key]);
                namelabel = 'Количество изученных слов за день';
            } else if (idx === 'findWords') {
                axisX.push(key.substring(0, key.length - 9));
                axisY.push(namesGame[idx][key].substring(0, namesGame[idx][key].length - 6));
                namelabel = 'Ваш результат в шагах';
            } else if (idx === 'sprint') {
                axisX.push(key.substring(0, key.length - 9));
                axisY.push(namesGame[idx][key]);
                namelabel = 'Ваш результат в баллах';
            } else {
                axisX.push(key.substring(0, key.length - 9));
                axisY.push(namesGame[idx][key].substring(0, namesGame[idx][key].length - 1));
                namelabel = 'Ваш результат в %';
            }
        }
    }
    if (isStatNum) {
        const number = document.querySelector('.stat-number');
        number.textContent = `${axisX.length}`;
    }
    
    if (axisX.length === 0) {
        namelabel = 'Вы еще не играли в эту игру';
    }

    let data = {
        labels: axisX,
        datasets: [{
          label: namelabel,
          backgroundColor: "rgba(84,53,142,0.2)",
          borderColor: "rgba(84,53,142,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(84,53,142,0.4)",
          hoverBorderColor: "rgba(84,53,142,1)",
          data: axisY,
        }]
      };
      
      let options = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
    };
      
    Chart.Bar('chart', {
        options: options,
        data: data
    });
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

const statGameChoiсe = (data) => {
    const stat = document.querySelector('.stat-append');
    const game = document.querySelector('.stat-games');
    const mainGame = document.querySelector('.stat-game_active');
    let statNum = false;
    const mainStat = new Statistics('учи слова');
    stat.innerHTML = '';
    stat.append(mainStat.renderStatTrainingGame());
    graph(data, mainGame.id, statNum);
    game.addEventListener('click', (e) => {
        addActiveStatGame(e);
        if (e.target.closest('.stat-game').getAttribute('data-name') === 'учи слова') {
            stat.innerHTML = '';
            stat.append(mainStat.renderStatTrainingGame());
            statNum = false;
            graph(data, e.target.closest('.stat-game').id, statNum);
        } else {
            const gameStat = new Statistics(e.target.closest('.stat-game').getAttribute('data-name'));
            stat.innerHTML = '';
            stat.append(gameStat.renderStatMiniGame());
            statNum = true;
            graph(data, e.target.closest('.stat-game').id, statNum);
        }
    });
}

async function statData() {
    StatisticsAPI.initIdToken();
    const st = await StatisticsAPI.getStatistics();
    statGameChoiсe(st.optional);
    // console.log(st.optional);
}

const initStatistics = () => {
    statData();
    statLayout();
};

export default initStatistics;