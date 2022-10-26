import p5 from 'p5';
import { Board } from './Board';
import { Timer } from './Timer';
import { Score } from './Score';
import { Game } from './Game';
import { Omikuji } from './Omikuji';

export function getWindow() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { w: x, h: y };
}

const GM = {
    setup: () => { },
    draw: () => { },
    mouseClicked: (x, y) => { }
}

const p = new p5(p => {
    const windowSize = getWindow();
    p.setup = function setup() {
        p.createCanvas(windowSize.w, windowSize.h);
        GM.setup();
    };

    p.draw = function draw() {
        p.background(0);
        GM.draw(p.windowWidth, p.windowHeight);
    };

    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY);
    };

    p.windowResized = function windowResized() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
});

let score = new Score(p);
let timer = new Timer(p);
let board = new Board(p, timer);
let state = 0;

const game = new Game(p, board, score, timer);
const omikuji = new Omikuji(p, score);

function resetGame(currentState) {
    console.log("NEW GAME");

    board = new Board(p, timer);
    score.resetScore();

    if (currentState == 3) {
        score.setClearPoint(1, 0);
    }

    board.loadCardsLeft();
    board.loadJPFont();
    game.board = board;

    state = 1;
}

function menu(width, height) {
    // TODO: Implement main menu but better
    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.rect(width / 3, height / 3, 400, 150);

    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.textSize(64);
    p.text("CLICK TO PLAY GAME", width / 3, height / 3, 400, 150);

    if (p.mouseIsPressed) {
        if (width / 3 < p.mouseX && p.mouseX < width / 3 + 400 && height / 3 < p.mouseY && p.mouseY < height / 3 + 150) {
            p.textSize(20);
            state = 1;
        }
    }
}

function gameOver(width, height) {
    // TODO: Implement a game over screen
    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.rect(width / 3, height / 3, 400, 400);

    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.textSize(64);
    p.text("GAME OVER, CLICK TO RESET", width / 3, height / 3, 400, 400);

    if (p.mouseIsPressed) {
        if (width / 3 < p.mouseX && p.mouseX < width / 3 + 400 && height / 3 < p.mouseY && p.mouseY < height / 3 + 400) {
            p.textSize(20);
            resetGame(3);
        }
    }
}

GM.setup = function () {
    game.splitCards();
}

GM.draw = function (width, height) {
    let scaleX = width / 1440;
    let scaleY = height / 790;

    console.log("STATE: " + state);

    // State is 0, main menu
    if (state == 0) {
        menu(width, height);
    }

    // State is 1, play game
    if (state == 1) {
        console.log("State 1");
        state = game.play(width, height, scaleX, scaleY);
    }

    // State is 2, omikuji
    if (state == 2) {
        console.log("State 2");
        state = omikuji.omikuji(game.level, width, height, scaleX, scaleY);
    }

    // State is 3, game over
    if (state == 3) {
        gameOver(width, height);
    }

    if (state == 4) {
        console.log("State 4");
        resetGame(4);
    }
}

GM.mouseClicked = function (x, y) {
    game.updateTopDisplay(x, y);
    board.chooseCol(y, game.recentMoves, score);
}

export { game, score, timer, board, GM }; //exporting for tests and one instance throughout code
