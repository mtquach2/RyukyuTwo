/**
 * Creates an object for each card in a deck of cards
 */
export class Card {

	constructor(p5, suit, value, img, col, loc) {
		this.p = p5
		this.suit = suit;
		this.value = value;
		this.img = img;
		this.col = col;
		this.loc = loc;
	}

	/**
	 * Displays the image associated with the given card 
	 * @param x x-axis for where we want the card
	 * @param y y-axis for where we want the card
	 */
	showImage(x, y, scaleX, scaleY) {
		this.p.imageMode(this.p.CORNER);
		this.p.image(this.img, x, y, 64 * scaleX, 64 * scaleY);
	}

	getSuit() {
		return this.suit;
	}

	getValue() {
		return this.value;
	}

	getImage() {
		return this.img;
	}

	getCol() {
		return this.col;
	}
};