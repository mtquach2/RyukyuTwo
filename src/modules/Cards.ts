// import * as p5play from 'p5.play';
import p5 from 'p5';

/**
 * Creates an object for each card in a deck of cards
 */
export class Cards {
	suit : string
	value : string
	img : p5.Image
	
	constructor(suit : string, value : string, img : p5.Image) {
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
	showImage(position : number, row : number, p : p5) {
		p.image(this.img, position, row, 64, 64);	
	}

	
};