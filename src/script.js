import p5 from 'p5';
import { Game } from '/src/modules/Game.js';
let game = new Game(); 

function getWindow() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return { w: x, h: y };
}

new p5(p => {
  let bg, sprite;

  function randColor() {
    return p.color(p.random(255), p.random(255), p.random(255));
  };

  p.preload = function preload() {
    game.load(p);
  };

  p.setup = function setup() {
    let window = getWindow()
    p.createCanvas(window.w, window.h);
    p.background(randColor());
  };

  p.draw = function () {
    game.staticRender(p);
  };

});