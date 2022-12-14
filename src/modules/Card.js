export class Card {

	constructor(p5, suit, value, img) {
		this.p = p5
		this.suit = suit;
		this.value = value;
		this.img = img;
	}

	showImage(x, y, scaleX, scaleY) {
		// Displays image asscoiated with given card
		this.p.imageMode(this.p.CORNER);
		this.p.image(this.img, x, y, 80 * scaleX, 80 * scaleY);
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