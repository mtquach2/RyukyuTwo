// import { Cards } from './modules/Cards.js';
console.log("AFTER IMPORT")
// let deck = new Cards();

function getWindow() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return { w: x, h: y };
}

function randColor() {
  return color(random(255), random(255), random(255));
}

function preload() {
  // deck.load();
}

function setup() {
  let win = getWindow();
  console.log(`window is ${win}`)
  createCanvas(win.w, win.h);
  background(randColor())
}

function draw() {
  // deck.staticRender();
}