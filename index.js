

let body = document.querySelector("body");
let gameType = 4;
let savedGameType = Number(localStorage.getItem('typeSavedGame'));
let cellsArr = [];
let initCellArr = [];
let randomNumArr = [];
let savedGameImage;
const emptyCell = {
    'left': 0,
    'top': 0
};
const restartEmptyCell = {
    'left': 0,
    'top': 0
};
let minutes = 0,
seconds = 0;


let div = document.createElement('div');
let AnsButton = document.createElement('button');
let menuBlock = document.createElement('div'),
    submenuButtons = document.createElement('div'),
    rulesBut = document.createElement('p'),
    rulesBlock = document.createElement('div');   
let but3 = document.createElement('button'),
    but4 = document.createElement('button'),
    but5 = document.createElement('button'),
    but6 = document.createElement('button'),
    but7 = document.createElement('button'),
    but8 = document.createElement('button'),
    start = document.createElement('p'),
    pause = document.createElement('button'),
    menuGameBut = document.createElement('button'),
    saveGameBut = document.createElement('button'),
    loadGameBut = document.createElement('button'),
    scoreBut = document.createElement('button'),
    gameTime = document.createElement('p'),
    gameCount = document.createElement('p'),
    audio = document.createElement('audio'),
    finishSong1 = document.createElement('audio'),
    finishSong2 = document.createElement('audio'),
    finishSong3 = document.createElement('audio'),
    finishSong4 = document.createElement('audio'),
    winnerText = document.createElement('p'),
    puzzleWrapper = document.createElement('div');


function createBody() {
    document.body.append(puzzleWrapper);
    puzzleWrapper.classList.add('puzzle_wrapper');
    puzzleWrapper.append(div);
    div.classList.add('puzzle_container');

}

function shovStartMenu() {
    document.body.append(menuBlock);
    menuBlock.classList.add('start_menu');
    menuBlock.innerHTML = `<h1 class="start_header">Приветсвую!</h1>
    <span class="h1_desc">Это обратные пятнашки!</span>
    <p class="chuse_list">Выбери вариант игры!</p>`;
    menuBlock.append(submenuButtons);
    submenuButtons.classList.add('submenu_buttons');
    menuBlock.append(scoreBut);
    scoreBut.classList.add('score_button');
    scoreBut.innerText = "Зал славы";
    scoreBut.addEventListener('click', () => {
        createScorTable();
        scoreLoader();
    });
    menuBlock.append(rulesBut);
    rulesBut.classList.add('rules');
    rulesBut.innerText = 'Для начала прочти правила!';
    rulesBut.addEventListener('click', () => {
        document.body.append(rulesBlock);
        rulesBlock.classList.add('rules_block');
        rulesBlock.innerHTML = `
        <ol>
        <li class="list_items">ЧТОБЫ ЗАКРЫТЬ ЭТО МЕНЮ - КЛИКНИТЕ ПО МНЕ!</li>
        <li class="list_items">У сложенного пазла пустая клетка находится в левом верхнем угле!</li>
        <li class="list_items">Чтобы сохранить игру для начала ее нужно начать!</li>
        <li class="list_items">Во время игры нажимаем "Меню"=>"Сохранить" - игра сохранена!</li>
        <li class="list_items">Перезагружаем страницу нажимаем "Загрузить"...</li>
        <li class="list_items">Вуаля! Фишки на своих местах. Картинка может быть другая - так и задумано!.</li>
        <li class="list_items">Можно выбрать вариант игры!</li>
        <li class="list_items">Если лень решать головомку, а на картинку посмотреть охота =>"Решить"!</li>
        <li class="list_items">Адаптив тут имеется!!! 
        Просто после значительного изменения размера экрана нужно начать новую игру!</li>
    </ol>`;
    });
    rulesBlock.addEventListener('click', () => {
        rulesBlock.remove(rulesBlock);
    });
}
shovStartMenu();

function clearField() {
    let allBut = document.querySelectorAll(".cell_container");
   
    for (let but of allBut) {
        cellsArr = [];
        
        but.remove(but);
       
    }
    document.querySelector('.puzzle_container').parentNode.removeChild(document.querySelector('.puzzle_container'));

}

function cellMix() {
    let randomNum;
    for (let i = 0; i <= 70 * (gameType ** 2); i += 1) {
            setTimeout(function() {
                randomNum = Math.floor(Math.random() * (gameType * gameType));
                if (!randomNum || randomNum === gameType * gameType) {
                    randomNum = 2;
                }
                document.querySelector(`.cell_container.cell${randomNum}`).click();
             }, 2000);
    }
 
};


function timer() {
    seconds += 1;
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    gameTime.innerHTML = `Время: ${minutes}:${seconds}`;
};
let interval;
function startTimer() {
    seconds = 0;
    minutes = 0;
    interval = setInterval(timer, 1000); 
};
function startSavedTimer() {
    seconds = Number(localStorage.getItem('seconds'));
    minutes = Number(localStorage.getItem('minutes'));
    interval = setInterval(timer, 1000); 
};

let count = 0;
function counter() {
    gameCount.innerHTML = `Счет: ${count}`;
}


function createMainButt() {

    document.body.append(gameTime);
    gameTime.classList.add('game_time');

    document.body.append(gameCount);
    gameCount.classList.add('game_count');

    document.body.append(audio);
    audio.setAttribute('data-key', 'change');
    audio.setAttribute('src', './assets/sound/change.mp3');

    document.body.append(finishSong1);
    finishSong1.setAttribute('data-finish', 'winer');
    
    

    document.body.append(pause);
    pause.classList.add('pause_button');
    pause.classList.toggle('hidden');
    pause.innerText = "Меню";
    pause.addEventListener('click', () => {
        winnerText.remove(winnerText);
        menuBlock.classList.remove('hidden');
        pause.classList.toggle('hidden');
        AnsButton.classList.add('hidden');
        menuBlock.classList.remove('hidden');
        document.querySelector('.puzzle_container').classList.add('hidden');
        document.querySelector('.puzzle_wrapper').classList.remove('puzzle_wrapper_active');
        gameTime.classList.add('hidden');
        gameCount.classList.add('hidden');
       
        clearInterval(interval);
        
    })

    menuBlock.append(menuGameBut);
    menuGameBut.classList.add('new_button');
    menuGameBut.innerText = "Новая игра!";
    menuGameBut.addEventListener('click', () => {
        if (!document.querySelector('.puzzle_container')){
            
            initCellArr = [];
            initCellArr.push(restartEmptyCell);
            randomNumArr = [];
            cellsArr = [];
            emptyCell.top = 0;
            emptyCell.left = 0;
            cellsArr.push(restartEmptyCell);
            chuseTypeGame();
    
            createBody();
            document.querySelector('.puzzle_wrapper').classList.add('puzzle_wrapper_active');
            createCell();

        }


        menuBlock.classList.add('hidden');
        pause.classList.toggle('hidden');
        AnsButton.classList.remove('hidden');
        document.querySelector('.puzzle_container').classList.remove('hidden');
        gameTime.classList.remove('hidden');
        gameCount.classList.remove('hidden');
        document.querySelector('.puzzle_wrapper').classList.add('puzzle_wrapper_active');
        randomNumArr = [];
        cellMix();
        clearInterval(timer);
        startTimer();
        count = 0;
        counter();
      
    });


    document.body.append(AnsButton);
    AnsButton.classList.add('ans_button');
    AnsButton.classList.add('hidden');
    AnsButton.innerText = "Решить";
    AnsButton.addEventListener('click', () => {
        clearInterval(timer);
        returnAns();
        AnsButton.classList.add('hidden');
        
    });

    submenuButtons.append(but3);
    but3.classList.add('3x3_button', 'game_type');
    but3.innerText = "3x3";
    but3.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }
        
        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        gameType = 3;
        chuseTypeGame();
    
        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();

        
    });

    submenuButtons.append(but4);
    but4.classList.add('4x4_button', 'game_type');
    but4.innerText = "4x4";
    but4.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }

        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        gameType = 4;
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        
        chuseTypeGame();
       
        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();

    });

    submenuButtons.append(but5);
    but5.classList.add('5x5_button', 'game_type');
    but5.innerText = "5x5";
    but5.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }

        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        gameType = 5;
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        
        chuseTypeGame();
        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();

    });

    submenuButtons.append(but6);
    but6.classList.add('6x6_button', 'game_type');
    but6.innerText = "6x6";
    but6.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }

        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        gameType = 6;
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        
        chuseTypeGame();
     
        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();

    });

    submenuButtons.append(but7);
    but7.classList.add('7x7_button', 'game_type');
    but7.innerText = "7x7";
    but7.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }

        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        gameType = 7;
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        
        chuseTypeGame();
    
        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();
       

    });
    submenuButtons.append(but8);
    but8.classList.add('8x8_button', 'game_type');
    but8.innerText = "8x8";
    but8.addEventListener("click", () => {
        if (document.querySelector('.puzzle_container')){
            clearField();
        }

        initCellArr = [];
        initCellArr.push(restartEmptyCell);
        randomNumArr = [];
        gameType = 8;
        cellsArr = [];
        emptyCell.top = 0;
        emptyCell.left = 0;
        cellsArr.push(restartEmptyCell);
        
        chuseTypeGame();

        createBody();
        document.querySelector('.puzzle_container').classList.add('hidden');
        createCell();
       
    });

    menuBlock.append(saveGameBut);
    saveGameBut.classList.add('save_game');
    saveGameBut.innerText = 'Сохранить';
    saveGameBut.addEventListener('click', () => {
        saveGame();
    });

    menuBlock.append(loadGameBut);
    loadGameBut.classList.add('load_game');
    loadGameBut.innerText = 'Загрузить';
    loadGameBut.addEventListener('click', () => {
        count = Number(localStorage.getItem('counter', count));
        minutes = Number(localStorage.getItem('minutes'));
        seconds = Number(localStorage.getItem('seconds'));
        gameType = savedGameType;
        loadGame();
       
        
    });
};


// Arr for cells
//
//

let cellArr4 = [{
    left: 0,
    top: 0
},
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; 

let cellArr3 = [{
    left: 0,
    top: 0
}, 1, 2, 3, 4, 5, 6, 7, 8]; 

let cellArr5 = [{
    left: 0,
    top: 0
},
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]; 

let cellArr6 = [{
    left: 0,
    top: 0
},
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]; 

let cellArr7 = [{
    left: 0,
    top: 0
},
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]; 
    
let cellArr8 = [{
    left: 0,
    top: 0
},
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]; 


let chuseArrCell = cellArr4;
function chuseTypeGame() {
    if (gameType === 3) {
        chuseArrCell = cellArr3;
    } else if (gameType === 4) {
        chuseArrCell = cellArr4;
    } else if (gameType === 5) {
        chuseArrCell = cellArr5;
    } else if (gameType === 6) {
        chuseArrCell = cellArr6;
    } else if (gameType === 7) {
        chuseArrCell = cellArr7;
    } else if (gameType === 8) {
        chuseArrCell = cellArr8;
    } else if (gameType === 4) {
        chuseArrCell = cellArr4;
    };
};

//
//
//
//


cellsArr.push(emptyCell);
initCellArr.push(restartEmptyCell);


function move(index) {
    let cell = cellsArr[index];

    let leftDiff = Math.abs(emptyCell.left - cell.left);
    let topDiff = Math.abs(emptyCell.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }
    
    cell.element.style.top = `${emptyCell.top * document.querySelector(
        ".cell_container").offsetWidth}px`;
    cell.element.style.left = `${emptyCell.left * document.querySelector(
        ".cell_container").offsetWidth}px`;

    let emptyLeft = emptyCell.left;

    let emptyTop = emptyCell.top;

    emptyCell.left = cell.left;
    emptyCell.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
    randomNumArr.push(cell.cellText);
    

};

const dragEnter = function (evt) {
 
    setTimeout(() => {
        console.log(evt);
        anim(evt.target);
        move(evt.target.innerText);
        ++count;
        counter();

        const audio = document.querySelector(`audio[data-key="change"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        
        setTimeout(() => {
            win(initCellArr, cellsArr);
            clearInterval(timer);  
          }, 0);
    }, 500);
    

};


function createCell(randomNum) {
    let rand = randomNum;
    if (!randomNum) {
        rand = Math.floor(1 + Math.random() * 4)
    }
    savedGameImage = rand;
    finishSong1.setAttribute('src', `./assets/sound/finish_${rand}.mp3`);

     for (let i = 1; i < chuseArrCell.length; i += 1) {
         
        let cell = document.createElement('div');
        cell.classList.add('cell_container', `cell${chuseArrCell[i]}`, `image${gameType}x${gameType}`);
        cell.setAttribute('draggable', true);
        cell.innerHTML = chuseArrCell[i];
        cell.style.backgroundImage = `url(./assets/pict/${rand}/${gameType}x${gameType}/part_${cell.innerText}.jpg)`;

        const left = i % gameType;
        const top = (i - left) / gameType;
        
        cellsArr.push({

            'element': cell,
            'left': left,
            'top': top,
            'cellText' : cell.innerText,

        });
        initCellArr.push({
            'element': cell,
            'left': left,
            'top': top,
            'cellText' : cell.innerText,
        });
        
        
        div.append(cell);
        cell.style.width = `${document.querySelector(".puzzle_container").clientWidth / gameType}px`
        cell.style.height = `${cell.offsetWidth}px`
        cell.style.top = `${top * cell.offsetWidth}px`;
        cell.style.left = `${left * cell.offsetWidth}px`;

        cell.addEventListener("click", () => {
            anim(cell);        
            move(cell.innerText);
            
        });


        cell.addEventListener('mouseup', () => {
            

            ++count;
            counter(); 

            const audio = document.querySelector(`audio[data-key="change"]`);
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
            
            setTimeout(() => {
                win(initCellArr, cellsArr);
                clearInterval(timer);  
              }, 0);
        });


        cell.addEventListener('dragenter', dragEnter);

     }
  
}


function returnAns() {
    let count = 0;
    let reverse = [];
    reverse = randomNumArr.reverse();
    let revLength = reverse.length

   let resIntr = setInterval(() => {
        document.querySelector(`.cell_container.cell${Number(reverse[count])}`).click();
        count += 1;
        if (count === revLength) {
            clearInterval(resIntr);
        }
    }, 400);

 
}


function saveGame() {
    localStorage.setItem('savedGame', JSON.stringify(randomNumArr));
    localStorage.setItem('typeSavedGame', gameType);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('counter', count);
    localStorage.setItem('savedGameImage', savedGameImage);

}
function loadGame() {
    let loadedArrCell = JSON.parse(localStorage.getItem('savedGame'));

    if (document.querySelector('.puzzle_container')) {
        clearField();
        document.querySelector('.puzzle_wrapper').classList.add('puzzle_wrapper_active');
    }
    savedGameImage = localStorage.getItem('savedGameImage')


    startSavedTimer();

    counter();
    randomNumArr = [];
    initCellArr = [];
    initCellArr.push(restartEmptyCell);
    cellsArr = [];
    emptyCell.top = 0;
    emptyCell.left = 0;
    cellsArr.push(restartEmptyCell);
    
    chuseTypeGame();

    createBody();
    document.querySelector('.puzzle_wrapper').classList.add('puzzle_wrapper_active');
    createCell(savedGameImage);
   
        menuBlock.classList.add('hidden');
        pause.classList.toggle('hidden');
        AnsButton.classList.remove('hidden');
        document.querySelector('.puzzle_container').classList.remove('hidden');
        gameTime.classList.remove('hidden');
        gameCount.classList.remove('hidden');

        
        for (let i = 0; i < loadedArrCell.length; i += 1) {
            setTimeout(function() {
                document.querySelector(`.cell_container.cell${Number(loadedArrCell[i])}`).click();
            }, 0);
            
        }
}
function anim(cell) {
    cell.animate({
        left: [cell.style.left, cell.offsetWidth],
        top: [cell.style.top, cell.offsetWidth]
    }, 500);
}


function win(obj1, obj2){
    console.log(JSON.stringify(obj1) === JSON.stringify(obj2), "result!!!!");
    if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
       
       
        let allCells = document.querySelectorAll(".cell_container");
        allCells.forEach((cell) => {
            cell.style.border = "none";
            cell.style.borderRadius = "0px";
            cell.style.color = "rgba(0, 0, 0, 0)";
        });
        console.log('YOU WIN!!!!!!!!!!!!!!!!!!!!!!!!!!!');

        const finalSound = document.querySelector(`audio[data-finish="winer"]`);
        if (!finalSound) return;
        finalSound.currentTime = 0;
        finalSound.play();

        scoreSaver();
        winnerText.classList.add('win_text');
        winnerText.innerText = `ЭТО ПОБЕДА!
         Потраченное зря время: ${minutes}мин ${seconds}сек;
        Количество ходов: ${count};`;
        body.append(winnerText);
        winnerText.addEventListener('click', () => {
            winnerText.remove(winnerText);
        });
        
    }
};

let date = new Date(),
day = date.getDate(),
month = date.getMonth(),
year = date.getFullYear();

function scoreSaver() {
    let scoreObj = {
        'date': `${day}.${month + 1}.${year}`,
        'scoreTypeGame': gameType,
        'scoreSecondsGame': seconds,
        'scoreMinutesGame': minutes,
        'scoreCounterGame': count
    }
    if (!localStorage.getItem('scoreObj1')){
            localStorage.setItem('scoreObj1', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj2')) {
            localStorage.setItem('scoreObj2', JSON.stringify(scoreObj))
        } else if (!localStorage.getItem('scoreObj3')) {
            localStorage.setItem('scoreObj3', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj4')) {
            localStorage.setItem('scoreObj4', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj5')) {
            localStorage.setItem('scoreObj5', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj6')) { 
            localStorage.setItem('scoreObj6', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj7')) {
            localStorage.setItem('scoreObj7', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj8')) {
            localStorage.setItem('scoreObj8', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj9')) {
            localStorage.setItem('scoreObj9', JSON.stringify(scoreObj));
        } else if (!localStorage.getItem('scoreObj10')) {
            localStorage.setItem('scoreObj10', JSON.stringify(scoreObj));
        } else {
            localStorage.clear();
        };
}


function scoreLoader() {
            console.log("score");
        for (let i = 1; i <= 10; i += 1) {
            if(!localStorage.getItem(`scoreObj${i}`)) {
                document.querySelector(`.score_string_${i}`).innerHTML = "Пусто!";
            } else if (localStorage.getItem(`scoreObj${i}`) == null) {
                document.querySelector(`.score_string_${i}`).innerHTML = "Пусто!";
            } else {
                let scoreType = JSON.parse(localStorage.getItem(`scoreObj${i}`)).scoreTypeGame,
                scoreSec = JSON.parse(localStorage.getItem(`scoreObj${i}`)).scoreSecondsGame,
                scoreMin = JSON.parse(localStorage.getItem(`scoreObj${i}`)).sscoreMinutesGame,
                scoreCount = JSON.parse(localStorage.getItem(`scoreObj${i}`)).scoreCounterGame,
                date = JSON.parse(localStorage.getItem(`scoreObj${i}`)).date;
                if (!scoreMin) {
                    scoreMin = 0;
                }
                if (!scoreCount) {
                    scoreCount = 0;
                }
                if (!scoreCount) {
                    scoreCount = 0;
                }
                
                document.querySelector(`.score_string_${i}`).innerHTML = `${date} - 
                Вид игры: ${scoreType}х${scoreType}; 
                Время: ${scoreMin}мин. ${scoreSec}сек.; 
                Сделано ходов: ${scoreCount}.`;
            }
            
        }
  };


function createScorTable() {

    let scoreTable = document.createElement('div');
   
    document.body.append(scoreTable);
    scoreTable.classList.add('score_table');
    scoreTable.innerHTML = `ЧТОБЫ ЗАКРЫТЬ - НАЖМИ НА МЕНЯ!!!<br>`;
    scoreTable.addEventListener('click', () => {
        scoreTable.remove(scoreTable);
    });
     
    for (let i = 1; i <= 10; i += 1) {
        let scoreString = document.createElement('p');
        scoreTable.append(scoreString);
        scoreString.classList.add(`score_string_${i}`);
        let scoreObj = JSON.parse(localStorage.getItem(`scoreObj${i}`));
    }
}




createMainButt();
