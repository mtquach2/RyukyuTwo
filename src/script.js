import p5 from 'p5';
import { GM } from './modules/GameManager';
import { getWindow } from './modules/GameManager';
import { game } from './modules/GameManager';

const p = new p5(p => {
  p.preload = function preload() {
    game.load();
  }

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