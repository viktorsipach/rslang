import Statistics from './renderStatisticsPage';
import StatisticsAPI from '../../API/statisticsAPI';

async function statData() {
    StatisticsAPI.initIdToken();
    const st = await StatisticsAPI.getStatistics();
    console.log(st);
}

const DATA = {
    savanna: {
        '03.07.2020-20:46:55': '50%',
        '04.07.2020-20:46:55': '60%',
        '05.07.2020-20:46:55': '70%',
        '06.07.2020-20:46:55': '90%',
        '07.07.2020-20:46:55': '100%',
    },
    audioсall: {
        '03.07.2020-20:46:55': '30%',
        '04.07.2020-20:46:55': '46%',
        '05.07.2020-20:46:55': '58%',
        '06.07.2020-20:46:55': '71%',
        '07.07.2020-20:46:55': '90%',
    },
    speakit: {
        '03.07.2020-20:46:55': '25%',
        '04.07.2020-20:46:55': '36%',
        '05.07.2020-20:46:55': '60%',
        '06.07.2020-20:46:55': '81%',
        '07.07.2020-20:46:55': '98%',
    },
    puzzle: {
        '03.07.2020-20:46:55': '37%',
        '04.07.2020-20:46:55': '56%',
        '05.07.2020-20:46:55': '63%',
        '06.07.2020-20:46:55': '81%',
        '07.07.2020-20:46:55': '100%',
    },
    findwords: {
        '03.07.2020-20:46:55': '15%',
        '04.07.2020-20:46:55': '36%',
        '05.07.2020-20:46:55': '48%',
        '06.07.2020-20:46:55': '75%',
        '07.07.2020-20:46:55': '80%',
    },
    sprint: {
        '03.07.2020-20:46:55': '20%',
        '04.07.2020-20:46:55': '41%',
        '05.07.2020-20:46:55': '68%',
        '06.07.2020-20:46:55': '71%',
        '07.07.2020-20:46:55': '91%',
    },
    training: {
        '03.07.2020-20:46:55': '10%',
        '04.07.2020-20:46:55': '16%',
        '05.07.2020-20:46:55': '38%',
        '06.07.2020-20:46:55': '61%',
        '07.07.2020-20:46:55': '95%',
    }
};

const statLayout = () => {
    const page = document.querySelector('.page');
    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper__stat-page';

    wrapper.innerHTML = `
    <div class="stat-menu">
        <ul class="stat-games">
            <li class="stat-game stat-game_active" id="training">учи слова</li>
            <li class="stat-game" id="speakit">говори</li>
            <li class="stat-game" id="puzzle">пазл</li>
            <li class="stat-game" id="savanna">саванна</li>
            <li class="stat-game" id="audioсall">аудиовызов</li>
            <li class="stat-game" id="sprint">спринт</li>
            <li class="stat-game" id="findwords">найди слова</li>
        </ul>
    </div>
    <div class="stat-append"></div>
    `;

    page.innerHTML = '';
    page.append(wrapper);
}

// const statSchedule = (namesGame, idx) => {
//     let canvas = document.getElementById('canvas');
//     let ctx = canvas.getContext('2d');

//     canvas.width = 500;
//     canvas.height = 500;
    
//     ctx.fillStyle = "black"; // Задаём чёрный цвет для линий 
//     ctx.lineWidth = 2.0; // Ширина линии
//     ctx.beginPath(); // Запускает путь
//     ctx.moveTo(30, 10); // Указываем начальный путь
//     ctx.lineTo(30, 460); // Перемешаем указатель
//     ctx.lineTo(500, 460); // Ещё раз перемешаем указатель
//     ctx.stroke(); // Делаем контур

//     // Цвет для рисования
//     ctx.fillStyle = "black";
//     // Цикл для отображения значений по Y 
//     for(let i = 0; i < 6; i += 1) { 
//         ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60); 
//         ctx.beginPath(); 
//         ctx.moveTo(25, i * 80 + 60); 
//         ctx.lineTo(30, i * 80 + 60); 
//         ctx.stroke(); 
//     }
//     // Массив с меткам месяцев
//     let labels = [];
//     let data = [];
//     for (let key in namesGame[idx]) {
//         labels.push(key.substring(0, key.length - 9));
//         data.push(namesGame[idx][key].substring(0, namesGame[idx][key].length - 1));
//     }
//     // console.log(labels2);
//     // console.log(data2);
//     // let labels = ["05.07.20", "05.07.20", "06.07.20", "06.07.20", "07.07.20"]; 
//     // Выводим меток
//     for(var i=0; i<labels.length; i++) { 
//         ctx.fillText(labels[i], 50+ i*100, 475); 
//     }
    
//     // console.log(DATA.savanna);
//     // Объявляем массив данных графика
//     // let data = [ 10, 23, 39, 54, 91 ]; 
//     // Назначаем зелёный цвет для графика
//     ctx.fillStyle = "green"; 
//     // Цикл для отрисовки графиков
//     for(var i=0; i<data.length; i++) { 
//         var dp = data[i]; 
//         ctx.fillRect(40 + i*100, 460-dp*5 , 50, dp*5); 
//     }
// }



// const statScheduleMain1 = () => {
//     var canvas ;
//     var context ;
//     var Val_max;
//     var Val_min;
//     var sections;
//     var xScale;
//     var yScale;
//             // Values for the Data Plot, they can also be obtained from a external file
//     var Apple =  [100, 102, 87, , 100, 123, 100, 90, 87, 91, 93, 88];
//     var Samsung = [30, 50, 70, 80, 90, 100, 95, 91, 85, 92, 99, 130];
//     var Nokia =   [20, -10, -20, -25, -40, 5, 10, 28, 30, 43, 65, 80];

//     function init() {
//             // set these values for your data 
//         sections = 12;
//         Val_max = 130;
//         Val_min = -40;
//         var stepSize = 10;
//         var columnSize = 50;
//         var rowSize = 50;
//         var margin = 10;
//         var xAxis = [" ", "Jan", "Feb", "Mar", "Apr",
//         "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
//             //
            
//         canvas = document.getElementById("canvas");
//         context = canvas.getContext("2d");
//         context.fillStyle = "#0099ff"
//         context.font = "20 pt Verdana"
//         canvas.width = 500;
//         canvas.height = 500;
        
//         yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
//         xScale = (canvas.width - rowSize) / sections;
        
//         context.strokeStyle="#009933"; // color of grid lines
//         context.beginPath();
//             // print Parameters on X axis, and grid lines on the graph
//         for (let i=1;i<=sections;i++) {
//             var x = i * xScale;
//             context.fillText(xAxis[i], x,columnSize - margin);
//             context.moveTo(x, columnSize);
//             context.lineTo(x, canvas.height - margin);
//         }
//             // print row header and draw horizontal grid lines
//         var count =  0;
//         for (let scale=Val_max;scale>=Val_min;scale = scale - stepSize) {
//             var y = columnSize + (yScale * count * stepSize); 
//             context.fillText(scale, margin,y + margin);
//             context.moveTo(rowSize,y)
//             context.lineTo(canvas.width,y)
//             count++;
//         }
//         context.stroke();
        
//         context.translate(rowSize,canvas.height + Val_min * yScale);
//         context.scale(1,-1 * yScale);
        
//             // Color of each dataplot items
            
//         context.strokeStyle="#FF0066";
//         plotData(Apple);
//         context.strokeStyle="#9933FF";
//         plotData(Samsung);
//         context.strokeStyle="#000";
//         plotData(Nokia);
//     }

//     function plotData(dataSet) {
//         context.beginPath();
//         context.moveTo(0, dataSet[0]);
//         for (let i=1;i<sections;i++) {
//             context.lineTo(i * xScale, dataSet[i]);
//         }
//         context.stroke();
//     }

//     init();
// }

// const statScheduleMain2 = () => {
//     var canvas ;
//     var context ;
//     var noItems;
//     var xScalar;
//     var yScalar;
//     var radius;
//     var pie;
//             // values for each entity on the Graph 
//     var itemsName = [ "Chrome", "Firefox", "Opera", "I E" ];
//     var case1Value = [ 500, 300, 100, 100 ];
//     var case2Value = [ 550, 250, 100 ,100 ];
//     var case3Value = [ 650, 200, 150, 150 ];
//     var sectorColor = ["#339933", "#9933FF", "#FF6666", "#3333CC" ];

//     function init() {
//             // set values for data
//         noItems = 4;        
//         canvas = document.getElementById("canvas");
//         pie = document.getElementById("pie");
//         context = canvas.getContext("2d");
//         canvas.width = 500;
//         canvas.height = 500;
//         drawPie();
//     }

//     init();

//     function drawPie() {
//         radius = canvas.height / 3;
//         var centerX = canvas.width / 2;
//         var centerY = canvas.height / 2;
//         context.strokeStyle = "black";
//         context.font = "17 pt Arial";
//         context.textAlign = "center";
//         context.textBaseline = "middle";
//             // get data for each case
//         var itemsValue = case1Value;
//         if (pie.value=="case2")
//             itemsValue = case2Value;
//         if (pie.value=="case3")
//             itemsValue = case3Value;
    
//             // compute total value of the pie 
//         var sum = 0;
//         for (let i=0;i<noItems;i++) {
//             sum = sum + itemsValue[i];
//         }
//             // initialize the drawing 
//         context.clearRect(0,0, canvas.width, canvas.height);
//         var initialAngle = 0;
        
//         // draw for each data item 
//         for (let i=0;i<noItems;i++) { 
//             // draw each part of the pie 
//             var sector = itemsValue[i] / sum;
//             var wedge = 2 * Math.PI * sector;
//             context.beginPath();
//             var Newangle = initialAngle + wedge;
//             context.arc(centerX, centerY, radius, initialAngle, Newangle);
//             context.lineTo(centerX, centerY);
//             context.closePath();
//             context.fillStyle = sectorColor[i];
//             context.fill();    // fill the sectors with specific colors
//             context.stroke();  // stroke the outlines
            
            
//                 // define angle for wedge
//             var nameAngle = initialAngle + wedge / 2;
//                 // set x,y for label outside center of wedge
//                 // adjust for fact text is wider than it is tall
//             var nameX = centerX + Math.cos(nameAngle) * radius * 1.4;
//             var nameY = centerY + Math.sin(nameAngle) * radius * 1.3 - 14;
//                 // print name and value with black shadow
//             context.save();
//             context.fillStyle = sectorColor[i];
//             context.fillText(itemsName[i], nameX, nameY);
//             context.fillText( itemsValue[i] + " million", nameX, nameY + 15);
//             context.restore();
//                 // update beginning angle for next wedge
//             initialAngle = initialAngle + wedge;
//         }
//     }
// }

const statScheduleMain3 = (namesGame, idx) => {
    var canvas ;
    var context ;
    // var tipCanvas;
    // var tipCtx;
    var Val_Max;
    var Val_Min;
    var sections;
    var xScale;
    var yScale;
    var y;
            // values of each item on the graph
    let itemName = [];
    let itemValue = [];
    for (let key in namesGame[idx]) {
        itemName.push(key.substring(0, key.length - 9));
        itemValue.push(namesGame[idx][key].substring(0, namesGame[idx][key].length - 1));
    }

    console.log(itemName);
    console.log(itemValue);
    
    // var itemName = [ "USA", "China", "India", "Japan" , "Germany"];
    // var itemValue = [ 14, 35, 53, 69, 84 ];

    function init() {
        // intialize values for each variables
        sections = 5;
        Val_Max = 100;
        var stepSize = 10;
        var columnSize = 50;
        var rowSize = 60;
        var margin = 10;
        var header = "In %" 
            //
            
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        // tipCanvas = document.getElementById("tip");
        // tipCtx = tipCanvas.getContext("2d");
        context.fillStyle = "#000;"
        canvas.width = 500;
        canvas.height = 500;
        
        yScale = (canvas.height - columnSize - margin) / (Val_Max);
        xScale = (canvas.width - rowSize) / (sections + 1);
        
        context.strokeStyle="#000;"; // background black lines
        context.beginPath();
            // column names 
        context.font = "19 pt Arial;"
        context.fillText(header, 0, columnSize - margin);
            // draw lines in the background
        context.font = "16 pt Helvetica"
        var count =  0;
        for (let scale=Val_Max;scale>=0;scale = scale - stepSize) {
            y = columnSize + (yScale * count * stepSize); 
            context.fillText(scale, margin,y + margin);
            context.moveTo(rowSize,y)
            context.lineTo(canvas.width,y)
            count++;
        }
        context.stroke();
        
            // print names of each data entry
        context.font = "20 pt Verdana";
        context.textBaseline="bottom";
        for (let i=0;i<5;i++) {
            // computeHeight(itemValue[i]);
            context.fillText(itemName[i], xScale * (i+1), canvas.height + 2/*y - margin*/);
        }
        
            // shadow for graph's bar lines with color and offset
    
        context.fillStyle="#9933FF;";
        context.shadowColor = 'rgba(128,128,128, 0.5)';
        
        //shadow offset along X and Y direction 
        context.shadowOffsetX = 9;
        context.shadowOffsetY = 3;
    
        // translate to bottom of graph  inorder to match the data 
        context.translate(0,canvas.height - margin);
        context.scale(xScale,-1 * yScale);
    
            // draw each graph bars 
        for (let i=0;i<5;i++) {
            context.fillRect(i+1, 0, 0.3, itemValue[i]);
        }

        function windowToCanvas(canvas, x, y) {
            var bbox = canvas.getBoundingClientRect();
            return { x: x - bbox.left * (canvas.width / bbox.width),
                y: y - bbox.top * (canvas.height / bbox.height)
            };
        }
        canvas.onmousemove = function (e) {
            var loc = windowToCanvas(canvas, e.clientX, e.clientY);
            for (let i=0;i<5;i++) {
                if (loc.x > xScale && loc.x < xScale + 22 && loc.y < itemValue[i]) {
                    console.log('good');
                }
            }
            // drawBackground();
            // drawSpritesheet();
            // console.log(loc.x, loc.y);
            // updateReadout(loc.x, loc.y);
        };
    }   

    init();

    function computeHeight(value) {
        y = canvas.height - value * yScale ;    
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
    // console.log(mainGame.textContent);
    const mainStat = new Statistics('учи слова');
    stat.innerHTML = '';
    stat.append(mainStat.renderStatTrainingGame());
    // statSchedule();
    // statScheduleMain1();
    // statScheduleMain2();
    statScheduleMain3(DATA, mainGame.id);
    game.addEventListener('click', (e) => {
        // console.log(e.target.id);
        addActiveStatGame(e);
        if (e.target.innerHTML === 'учи слова') {
            stat.innerHTML = '';
            stat.append(mainStat.renderStatTrainingGame());
            // statSchedule();
            // statScheduleMain1();
            // statScheduleMain2();
            statScheduleMain3(DATA, e.target.id);
        } else {
            // console.log(e.target.innerHTML);
            const gameStat = new Statistics(e.target.innerHTML);
            stat.innerHTML = '';
            stat.append(gameStat.renderStatMiniGame());
            // statSchedule(DATA, e.target.id);
            statScheduleMain3(DATA, e.target.id);
        }
    });
}

const initStatistics = () => {
    statData();
    statLayout();
    statGameChoiсe();
};

export default initStatistics;