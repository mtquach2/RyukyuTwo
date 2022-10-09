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
	mouseWasClicked = false;
  deck = [];
	col = 0;

	displayMap = new Map();
  currentCard; 
 
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

		//shuffles the deck and then splits the deck into 4 equal decks 
		p.shuffle(this.deck, true);
		this.displayMap.set(0, this.deck.slice(0,13));
		this.displayMap.set(1, this.deck.slice(13, 26));	
		this.displayMap.set(2, this.deck.slice(26, 39));
		this.displayMap.set(3, this.deck.slice(39, 52));	
		console.log(this.displayMap);
	}

    /**
     * Displays an entire deck of cards in one row
     * then repeats displaying a deck in the rest of the rows on screen/canvas
     * @param p 
     */
    staticRender(p) {
		this.board.render(p);
		this.board.renderTopDisplay(p, this.displayMap);
		// If you left click, then it will fill the entire board with 5-of-a-kind columns and straight flush rows to test some hand ranking
		p.shuffle(this.deck, true);
		// if (p.mouseButton == p.LEFT && this.index < 52 && this.col < 5) {
		// 	this.board.addCard(this.col, this.deck[this.index++]);
			
		// 	if (this.board.isFull(this.col)) {
		// 		this.col++;
		// 	}
		// }
		if (this.mouseWasClicked == true && this.currentCard != null) {
			let bounds = p.constrain(p.mouseX, 200, 460);
			this.currentCard.showImage(bounds, 200, p); 
		}
	}
	/**
	 * Sends displayMap to clicked() 
	 * @param px mouseX value
	 * @param p instance of p5
	 */
	updateTopDisplay(px, p) {
		this.currentCard = this.board.clicked(px, this.displayMap, p);
		this.mouseWasClicked = true;
	}

	placeCard(p) {
		if (this.col < 5 && p.mouseX >= 200 && p.mouseX < 265) {
			this.col = 0;
		}
		else if (this.col < 5 && p.mouseX >= 265 && p.mouseX < 330) {
			this.col = 1;
		}
		else if (this.col < 5 && p.mouseX >= 330 && p.mouseX < 395) {
			this.col = 2;
		}
		else if (this.col < 5 && p.mouseX >= 395 && p.mouseX < 460) {
			this.col = 3;
		}
		else if (this.col < 5 && p.mouseX >= 460 && p.mouseX < 525) {
			this.col = 4;
		}
		this.board.addCard(this.col, this.currentCard);
		this.currentCard = null;
	}
};