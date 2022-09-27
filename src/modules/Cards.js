export class Cards {
	constructor() {
		this.cards = [];
		this.index = 0;
		this.values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
			'J', 'Q', 'K'];
		this.suits = ['diamonds', 'hearts', 'spades', 'clubs'];
	}

	staticRender() {
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

	load() {
		for (const suit of suits) {
			for (const value of values) {
				cards.push(loadImage(`../cards/card_${suit}_${value}.png`));
			}
		}
	}
};