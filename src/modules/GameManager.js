import p5 from 'p5';
import { Board } from './Board';
import { Timer } from './Timer';
import { Score } from './Score';
import { Game } from './Game';

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
    p.setup = function setup() {
        const windowSize = getWindow();
        p.createCanvas(windowSize.w, windowSize.h);
        GM.setup();
    };

    p.draw = function () {
        const windowSize = getWindow();
        p.background(0);
        GM.draw(windowSize.w, windowSize.h);
    };

    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY);
    };
});

let score = new Score(p);
let timer = new Timer(p);
let board = new Board(p, timer);

const game = new Game(p, board, score, timer);

GM.setup = function () {
    game.splitCards();
}

GM.draw = function (w, h) {
    game.staticRender(w, h);
}

GM.mouseClicked = function (x, y) {
    game.updateTopDisplay(x, y);
    board.chooseCol(y, game.recentMoves);
}

export { game, GM };