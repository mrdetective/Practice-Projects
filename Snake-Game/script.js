let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('./Sounds/Eat.wav');
const gameover = new Audio('./Sounds/Gameover.wav');
const movesound = new Audio('./Sounds/Direction.wav');
const music = new Audio('./Sounds/GameMusic.mp3');
let lastPaintTime = 0;
let snakeArr = [{
    x: 13,
    y: 15
}];
let food = { x: 7, y: 8 };
let score = 0;
let hiscore = 0;
let speed = 9;

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sArr) {
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[i].x == sArr[0].x && sArr[i].y == sArr[0].y) {
            return true;
        }
    }
    if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        gameover.play();
        music.pause();
        if (score > hiscore) {
            hiscore = score;
            highscore.innerHTML = "Highscore: " + hiscore;
        }
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any Key to Play Again!");
        snakeArr = [{ x: 13, y: 15 }];
        if (typeof music.loop == 'boolean') {
            music.loop = true;
        } else {
            music.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        music.play();
        scoreBox.innerHTML = "Score: " + 0;
        score = 0;
    }
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //Start the Game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});