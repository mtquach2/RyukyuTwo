import p5 from 'p5';
import { Cards } from './Cards';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game {
    suits = ['diamonds', 'hearts', 'spades', 'clubs']
	values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10',
			'J', 'Q', 'K']
    cards = []
    index = 0
    row = 0;
    position = 0;
    
    /**
     * Method to preload images and initializes Card objects for an entire deck of cards
     * @param p reference to p5
     */
    load(p) {
		for (const suit of this.suits) {
			for (const value of this.values) {
				this.cards.push(new Cards(`${suit}`, `${value}`, p.loadImage(`../../static/cards/card_${suit}_${value}.png`)));
			}
		}
	}

    /**
     * Displays an entire deck of cards in one row
     * then repeats displaying a deck in the rest of the rows on screen/canvas
     * @param p 
     */
    staticRender(p) {
		if (this.index < 52) {
			this.cards[this.index].showImage(this.position, this.row, p); //Shows image for the given card (i.e. cards[index])
		}
		else {
			this.index = -1;
			this.row += 100;
			this.position = -10;
		}
		this.index++;
		this.position += 10;

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

    add(a, b) {
        return a + b;
    }
};