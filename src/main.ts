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



/*
// THIS IS AN EXAMPLE OF P5.PLAY IN INSTANCE MODE
// BECAUSE WE'RE INJECTING P5 && P5.PLAY DIRECTLY INTO THE BROWSER,
// OUR P5 HERE HAS P5.PLAY ALREADY IN IT

new p5(p => {
  let bg, sprite;

  p.setup = function () {
    p.createCanvas(800, 600).mousePressed(reset);
    bg = p.color(0o350);
    sprite = p.createSprite(p.width>>1, p.height>>1, 0o100, 0o100);
    reset();
  };

  p.draw = function () {
    p.background(bg);
    bounce();
    p.drawSprites();
  };

  function reset() {
    sprite.setVelocity(p.random(-5, 5), p.random(-5, 5));
    sprite.shapeColor = p.color('#' + p.hex(~~p.random(0x1000), 3));
  }

  function bounce() {
    const { position: { x, y }, width: w, height: h } = sprite,
          ww = w >> 1, hh = h >> 1;

    if (x < ww || x + ww >= p.width)   sprite.velocity.x *= -1;
    if (y < hh || y + hh >= p.height)  sprite.velocity.y *= -1;
  }
});
*/

_app;

