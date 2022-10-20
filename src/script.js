import p5 from 'p5';
import { Board } from './modules/Board';
import { Timer } from './modules/Timer';
import { Game } from './modules/Game';
import { Score } from './modules/Score';
let score = new Score();
let timer = new Timer();
let board = new Board(timer);
let game = new Game(board, score, timer);
let windowSize;
//let timerGraphics;
//let seconds = 60;
let frameCounter = 0; //maybe use frameCount()?
export { score };

function getWindow() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return { w: x, h: y };
}

"use strict";
new p5(p => {
  p.preload = function preload() {
    game.load(p);
  };

  p.setup = function setup() {
    windowSize = getWindow();
    p.createCanvas(windowSize.w, windowSize.h);
    game.splitCards(p);
  };

  p.draw = function () {
    windowSize = getWindow();
    p.background(0);
    timer.drawTimer(p, windowSize.w, windowSize.h);
    game.timerTrigger();
    timer.drawSeconds(p, windowSize.w, windowSize.h);

    if (p.frameCount % 60 == 0) { //seems to be 60 fps?
      timer.countDown();
    }
    game.staticRender(p, windowSize.w, windowSize.h);
  };

  p.mouseClicked = function mouseClicked() {
    game.updateTopDisplay(p.mouseX, p.mouseY);
    board.chooseCol(p.mouseY, p, game.recentMoves);
  };
});