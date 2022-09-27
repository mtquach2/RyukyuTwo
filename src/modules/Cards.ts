export class Cards {
	cards : []
	index : number
	suits : string[]
	values : string[]
	constructor() {
		this.cards = [];
		this.index = 0;
		this.values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
			'J', 'Q', 'K'];
		this.suits = ['diamonds', 'hearts', 'spades', 'clubs'];
	}

	staticRender(p:p5) {
		p.shuffle(this.cards, true);
		if (this.index < 52) {
			if (p.mouse.pressed()) {
				let sprite = new p.Sprite(p.mouseX, p.mouseY, 64, 64);
				sprite.addImage('face', this.cards[this.index]);

				// Scale should be approx 1.5 ~ 1.75
				sprite.scale = 1.5;
				this.index++;
			}
		}
		else {
			this.index = 0;
		}
	}

	load(p:p5) {
		for (const suit of this.suits) {
			for (const value of this.values) {
				this.cards.push(p.loadImage(`../cards/card_${suit}_${value}.png`));
			}
		}
	}
};