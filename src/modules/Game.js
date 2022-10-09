import { Card } from './Card';
import { Board } from './Board';
import { Timer } from './Timer';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game {
	constructor(board, score, timer) {
		this.board = board;
		this.score = score;
		this.timer = timer;
	}
	mouseWasClicked = false;
  	deck = [];
	displayMap = new Map();
 
	// interval;
	
    // timerDisplay(p){
    //   	let seconds = 60; //how many seconds per "set" interval
    //   	this.interval = setInterval(function(){
    //     console.log("Seconds remaining:", seconds);
    //     p.background(0);
    //     p.stroke(255);
    //     p.textSize(20);
    //     p.text("timer:", 450, 200);
    //     p.stroke(255);
    //     p.textSize(20);
    //     p.text(seconds, 510, 200);
    //     seconds -= 1;
    //     if(seconds == 0){
	// 		clearInterval(this.interval);
	// 		console.log("Interval has been cleared");
	// 		seconds = 60; //reset back to initial seconds
    //     }
    //   }, 1000); //how fast to count the intervals
    // }

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
     * Displays the board and top display for the game
     * Also, includes logic for selecting a card and column for game
     * @param p 
     */
    staticRender(p, width, height) {
		this.score.displayScoreTable(p, width, height);
		this.board.render(p, this.displayMap, width, height);
		this.board.initCards(p, this.displayMap, width, height);
		this.board.displayCard(this.mouseWasClicked, p, width, height);
	}

	/**
	 * Sends displayMap to clicked() in Board.js 
	 * @param px mouseX value
	 * @param p instance of p5
	 */
	updateTopDisplay(px, py) {
		this.currentCard = this.board.clicked(px, py, this.displayMap);
		this.mouseWasClicked = true;
	}

	/**
	 * Splits a full deck of cards into 4 even parts
	 * @param p p5 instance
	 */
	splitCards(p) {
		p.shuffle(this.deck, true);
		let x = 0; 
		for (let i = 0; i < 4; i++) {
			this.displayMap.set(i, this.deck.slice(x, x + 13));
			x += 13;
		}
	}
};