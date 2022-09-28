import p5 from 'p5';
import { Game } from './modules/Game';
// import Sprite from 'p5-play' IF ANYONE HAS EVER DONE THIS IN TS BEFORE
// import whatever code we need from ./modules

let game = new Game();
import './style.css';

function getWindow() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return { w: x, h: y };
}

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5;

  function randColor() {
    return p.color(p.random(255), p.random(255), p.random(255));
  }

  p.preload = function preload() {
    game.load(p);
  }

  p.setup = function setup() {
    let window = getWindow()
    p.createCanvas(window.w, window.h);
    p.background(randColor());
  };

  p.draw = function draw() {
    game.staticRender(p);
  };
}, document.getElementById('app')!);

_app;