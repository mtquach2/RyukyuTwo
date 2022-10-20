/**
 * Creates an object for each card in a deck of cards
 */
export class Card {

	constructor(p5, suit, value, img) {
		this.p5 = p5
		this.suit = suit;
		this.value = value;
		this.img = img;
	}

	/**
	 * Displays the image associated with the given card 
	 * @param position x-axis for where we want the card
	 * @param row y-axis for where we want the card
	 * @param p reference to p5
	 */
	showImage(position, row) {
		this.p5.image(this.img, position, row, 64, 64);
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
};