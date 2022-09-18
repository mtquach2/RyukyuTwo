function getWindow() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return { w: x, h: y }
}

function randColor() {
  return color(random(255), random(255), random(255));
}

let img;
let cards = [];
let values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    'J', 'Q', 'K'];
let suits = ['diamonds', 'hearts', 'spades', 'clubs'];

function preload() {
  img = loadImage("cards/card_back.png");

  for (let s in suits) {
    for (let v in values) {
      cards.push(loadImage('cards/card_' + suits[s] + '_' + values[v] + '.png'));
    }
  }
}

function setup() {
  let win = getWindow();
  createCanvas(win.w, win.h);
  for (let x = 0; x < 52; x++) {
      image(cards[x], x*10, 0, 64, 64);
  }
}

function draw() {
  
}