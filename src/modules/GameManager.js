import p5 from 'p5';
import { Board } from './Board';
import { Timer } from './Timer';
import { Score } from './Score';
import { Game } from './Game';
import { Player } from './Player';

export function getWindow() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { w: x, h: y };
}

let GM = {
    setup: () => { },
    draw: () => { },
    mouseClicked: (x, y) => { }
}

const p = new p5(p => {
    p.setup = function setup() {
        let windowSize = getWindow();
        p.createCanvas(windowSize.w, windowSize.h);
        GM.setup();
    };

    p.draw = function () {
        let windowSize = getWindow();
        p.background(0);
        GM.draw(windowSize.w, windowSize.h);
    };

    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY);
    };
});

let s = new Score(p);
const t = new Timer(p);
let b = new Board(p, t);
const play = new Player(p);
let game = new Game(p, b, s, t);

GM.setup = function () {
    game.splitCards();
}

GM.draw = function (w, h) {
    t.drawTimer(w, h);
    game.timerTrigger();
    t.drawSeconds(w, h);

    if (p.frameCount % 60 == 0) { //seems to be 60 fps?
        //   t.countDown();
    }
    game.staticRender(w, h);
    play.renderTotalScore(w, h);

    if (b.boardIsFull()) {
        play.updateLevel();
        play.updateTotalScore();
        s = new Score(p);
        b = new Board(p, t);
        game = new Game(p, b, s, t);
    }
}

GM.mouseClicked = function (x, y) {
    game.updateTopDisplay(x, y);
    b.chooseCol(y, game.recentMoves);
}

export { game, s, t, b, play, GM }; //exporting for tests and one instance throughout code