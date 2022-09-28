import p5 from 'p5';
import { Cards } from './Cards';

let row = 0;
let position = 0;

export class Game {
    suits : string[] = ['diamonds', 'hearts', 'spades', 'clubs']
	values : string[] = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
			'J', 'Q', 'K']
    cards : Cards[] = []
    index : number = 0

    load(p:p5) {
		for (const suit of this.suits) {
			for (const value of this.values) {
				this.cards.push(new Cards(`${suit}`, `${value}`, p.loadImage(`../../static/cards/card_${suit}_${value}.png`)));
			}
		}
	}

    staticRender(p:p5) {
		
		// Generates decks in order and makes each deck a new row of images
		if (this.index < 52) {
			this.cards[this.index].showImage(position, row, p);
		}
		else {
			this.index = -1;
			row += 100;
			position = -10;
		}
		this.index++;
		position += 10;

		// if (this.index < 52) {
		// 	if (p5play.mouse.pressed()) {
		// 		let sprite = new p5play.Sprite(p.mouseX, p.mouseY, 64, 64);
		// 		sprite.addImage('face', this.cards[this.index]);

		// 		// Scale should be approx 1.5 ~ 1.75
		// 		sprite.scale = 1.5;
		// 		this.index++;
		// 	}
		// }
		// else {
		// 	this.index = 0;
		// }
	}
};