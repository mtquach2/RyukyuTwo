// import * as p5play from 'p5.play';
import p5 from 'p5';

export class Cards {
	suit : string
	value : string
	img : p5.Image

	constructor(suit : string, value : string, img : p5.Image) {
		this.suit = suit;
		this.value = value;
		this.img = img;
	}	

	showImage(position : number, row : number, p : p5) {
		p.image(this.img, position, row, 64, 64);	
	}

	
};