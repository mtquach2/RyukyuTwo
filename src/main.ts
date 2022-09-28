import p5 from 'p5';
import { Cards } from './modules/Cards';
import { Sprite } from 'src/p5.play.js'
//need to figure out how to import p5.play
import './style.css';

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5;
  const cards = new Cards();
  const x = 100;
  const y = 100;
  p.preload = function preload() {
    cards.load(p);
  };
  p.setup = function setup() {
    p.createCanvas(500, 500);

  };

  p.draw = function draw() {
    p.background(0);
    p.fill(205);
    p.rect(x, y, 50, 50);
    cards.staticRender(p);
  };
}, document.getElementById('app')!);

_app;