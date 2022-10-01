import { Card } from './Card';
import { Board } from './Board';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game {
	constructor(board) {
		this.board = board;
	}
	
    deck = [];
    index = 0;
	col = 0;
	deck1 = [];
	deck2 = [];
	deck3 = [];
	deck4 = [];
    
    /**
     * Method to preload images and initializes Card objects for an entire deck of cards
     * @param p reference to p5
     */
    load(p) {
		const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
		const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
		
		for (const suit of suits) {
			for (const value of values) {
				this.deck.push(new Card(`${suit[0]}`, `${value}`, p.loadImage(`../../static/cards/card_${suit}_${value}.png`)));
			}
		}

		//shuffles the deck and then splits the deck into 4 equal decks 
		p.shuffle(this.deck, true);
		this.deck1 = this.deck.slice(0,13);
		console.log(this.deck1);
		this.deck2 = this.deck.slice(13, 26);
		console.log(this.deck2);
		this.deck3 = this.deck.slice(26, 39);
		console.log(this.deck3);
		this.deck4 = this.deck.slice(39, 52);
		console.log(this.deck4);
		//TODO Change arrays to be hashmap<number,array> for four separate decks 
	}

    /**
     * Displays an entire deck of cards in one row
     * then repeats displaying a deck in the rest of the rows on screen/canvas
     * @param p 
     */
    staticRender(p) {
		this.board.render(p);
		this.board.renderTopDisplay(p, this.deck1, this.deck2, this.deck3, this.deck4);
		// If you left click, then it will fill the entire board with 5-of-a-kind columns and straight flush rows to test some hand ranking
		p.shuffle(this.deck, true);
		if (p.mouseButton == p.LEFT && this.index < 52 && this.col < 5) {
			this.board.addCard(this.col, this.deck[this.index++]);
			
			if (this.board.isFull(this.col)) {
				this.col++;
			}
		}
	}
};