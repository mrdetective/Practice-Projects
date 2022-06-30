console.log("Welcome to KataKuti.com");
let click = new Audio("./Sounds/Click.wav");
let gameover = new Audio("./Sounds/GameOver.wav");
let turn = "X";
let end = false;
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

const CheckWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[1]].innerText != '')) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            end = true;
            document.querySelector('.imgbox').getElementsByClassName('img1')[0].style.width = "15vw";
            gameover.play();
        }
    })

}
const CheckDraw = () => {
    end = true;
    let boxtexts = document.getElementsByClassName('boxtext');
    Array.from(boxtexts).forEach(e => {
        if (e.innerText == '') {
            end = false;
        }
    })
}
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText == '' && end == false) {
            boxtext.innerText = turn;
            turn = changeTurn();
            click.play();
            CheckWin();
            if (end == false) {
                CheckDraw();
                if (end == true) {
                    document.getElementsByClassName("info")[0].innerText = "It's a draw!";
                    document.querySelector('.imgbox').getElementsByClassName('img2')[0].style.width = "15vw";
                    gameover.play();
                }
            }
            if (end == false) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

reset.addEventListener('click', () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    Array.from(boxtexts).forEach(e => {
        e.innerText = "";
    })
    turn = "X";
    end = false;
    document.querySelector('.imgbox').getElementsByClassName('img1')[0].style.width = "0";
    document.querySelector('.imgbox').getElementsByClassName('img2')[0].style.width = "0";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
})