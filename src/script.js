import p5 from 'p5';
import { GM } from './modules/GameManager';
import { getWindow } from './modules/GameManager';

const p = new p5(p => {
  p.setup = function setup() {
    let windowSize = getWindow();
    p.createCanvas(windowSize.w, windowSize.h);
    GM.setup();
  };

  p.draw = function () {
    p.background(0);
    GM.draw();
  };

  p.mouseClicked = function mouseClicked() {
      GM.mouseClicked(p.mouseX, p.mouseY);
  };
});