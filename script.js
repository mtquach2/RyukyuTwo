var cards = [];
var index = 0;
let values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
	'J', 'Q', 'K'];
let suits = ['diamonds', 'hearts', 'spades', 'clubs'];

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
	for (const suit of suits) {
		for (const value of values) {
			cards.push(loadImage(`cards/card_${suit}_${value}.png`));
		}
	}
}

function setup() {
	let win = getWindow();
	createCanvas(win.w, win.h);
}

function draw() {
	staticRender();
}

function staticRender() {
	background(0, 0, 0);
  shuffle(cards, true);
	if (index < 52) {
		if (mouse.pressed()) {
			sprite = new Sprite(mouseX, mouseY, 64, 64);
			sprite.addImage('face', cards[index]);

			// Scale should be approx 1.5 ~ 1.75
			sprite.scale = 1.5;
			index++;
		}
	}
	else {
		index = 0;
	}
}
