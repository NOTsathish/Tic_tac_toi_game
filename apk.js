const boxes = document.querySelectorAll('.box');
const statustxt = document.querySelector(".status");
const btnrestart = document.getElementById("restart");


let x = "<img src='download.png' style='height:50px; width:50px;' />";
let o = "<img src='download.jpeg' style='height:50px; width:50px;' />";

const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = x;
let player = "x";
let running = false;

Init();

function Init() {
    boxes.forEach((box, index) => {
        box.dataset.index = index;
        box.addEventListener('click', boxclick);
    });
    btnrestart.addEventListener('click', restart);
    statustxt.textContent = `${player} Your Turn`;
    running = true;
}

function boxclick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) {
        return;
    }
    updatebox(this, index);
    checkwinner();
}

function updatebox(box, index) {
    options[index] = player;
    box.innerHTML = currentplayer;
}

function changePlayer() {
    player = (player === 'x') ? "o" : "x";
    currentplayer = (currentplayer === x) ? o : x;
    statustxt.textContent = `${player} your turn`;
}

function checkwinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if (box1 === "" || box2 === "" || box3 === "") {
            continue;
        }
        if (box1 === box2 && box2 === box3) {
            isWon = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
            break;
        }
    }

    if (isWon) {
        statustxt.textContent = `${player} Won..`;
        running = false;
    } else if (!options.includes("")) {
        statustxt.textContent = "Game draw..";
        running = false;
    } else {
        changePlayer();
    }
}

function restart() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentplayer = x;
    player = "x";
    running = true;
    statustxt.textContent = `${player} your turn`;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}

