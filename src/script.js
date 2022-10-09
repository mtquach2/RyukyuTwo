import p5 from 'p5';
import { Board } from './modules/Board';
import { Game } from '/src/modules/Game.js';
import { Timer } from './modules/Timer';
let game = new Game(new Board()); 
let timer = new Timer(game);
let timerGraphics;
let seconds = 60;
let frameCounter = 0; //maybe use frameCount()?

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
    p.background(0);
    timerGraphics = p.createGraphics(window.w, window.h);
    //console.log(p.frameRate);

  };

  p.draw = function () { //30 fps or is it actually 60 fps?
    frameCounter++;
    if(frameCounter % 60 == 0){ //seems to be 60 fps?
      console.log("in draw function if statement");
      timer.drawTimer(timerGraphics);
      frameCounter = 0; 
      console.log("FrameCounter refreshed");
      p.image(p, 0, 0); //take timerGraphics and load it onto canvas
    }
    game.staticRender(p);

  };

  // p.drawTimer = function() {
  //   timerGraphics.background(0); //"reset" background so that there will not be an overlap
  //   timerGraphics.stroke(255);
  //   timerGraphics.textSize(20);
  //   timerGraphics.text("timer:", 600, 200);
  //   timerGraphics.stroke(255);
  //   timerGraphics.textSize(20);
  //   timerGraphics.text(seconds, 660, 200);
  //   seconds--;
  //   if(seconds == 0){
  //     seconds = 60;
  //   }
  //   p.image(timerGraphics, 0, 0); //take timerGraphics and load it onto canvas
  // }
});
