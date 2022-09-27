import p5 from 'p5';
// import Sprite from 'p5-play' IF ANYONE HAS EVER DONE THIS IN TS BEFORE
// import Cards
// import whatever code we need from ./modules

import './style.css';

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5;

  function randColor() {
    return p.color(p.random(255), p.random(255), p.random(255));
  }

  const x = 100;
  const y = 100;

  p.setup = function setup() {
    p.createCanvas(1000, 500);
    p.background(randColor());
  };

  p.draw = function draw() {
    
    p.fill(205);
    p.rect(x, y, 50, 50);
  };
}, document.getElementById('app')!);

_app;