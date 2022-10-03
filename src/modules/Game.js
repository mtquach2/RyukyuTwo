import { Card } from './Card';
import { Board } from './Board';
import { Timer } from './Timer';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game {
	constructor(board, timer) {
		this.board = board;
		this.timer = timer;
	}
	
    deck = [];
    index = 0;
	col = 0;
 
	interval;
	
	timerDisplay(p){
		let seconds = 60; //how many seconds per "set" interval
		this.interval = setInterval(function(){
			console.log("Seconds remaining:", seconds);
			p.background(0);
			p.stroke(255);
			p.textSize(20);
			p.text("timer:", 450, 200);
			p.stroke(255);
			p.textSize(20);
			p.text(seconds, 510, 200);
			seconds -= 1;
			if(seconds == 0){
				clearInterval(this.interval);
				console.log("Interval has been cleared");
				seconds = 60; //reset back to initial seconds
			}
		}, 1000); //how fast to count the intervals
	}
    
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
	}

    /**
     * Displays an entire deck of cards in one row
     * then repeats displaying a deck in the rest of the rows on screen/canvas
     * @param p 
     */
    staticRender(p) {
		this.board.render(p);
		// If you left click, then it will fill the entire board with 5-of-a-kind columns and straight flush rows to test some hand ranking
		p.shuffle(this.deck, true);
		if (p.mouseButton == p.LEFT && this.index < 52 && this.col < 5) {
			this.board.addCard(this.col, this.deck[this.index++]);
			
			if (this.board.isFull(this.col)) {
				this.col++;
			}
		}
	}

    add(a, b) {
        return a + b;
    }
};