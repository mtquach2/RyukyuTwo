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
	displayMap = new Map();

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

	timerTrigger() {
		//console.log(this.mouseWasClicked);
		// if(this.mouseWasClicked == true){
		// 	this.timer.resetTimer();
		// 	this.mouseWasClicked = false;
		// }
		// else if(this.mouseWasClicked == false && this.timer.seconds == 0){
		// 	console.log("NO ACTION");
		// }
		// else if(this.mouseWasClicked == false){
		// 	console.log("NO MOUSE CLICK");
		// }



		// console.log("CARD PLACED:",this.board.cardPlaced);
		if(this.board.cardPlaced == true){
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if(this.board.cardPlaced == false && this.mouseWasClicked == true && this.timer.seconds == 0) {
			let i;
			for(i = 0; i <= 5; i++){
				if(this.board.addCard(i, this.board.currentCard) != -1){
					this.board.currentCard = null;
					console.log("Card selected but not placed --> Added to board")
					break; //card added successfully
				}
			}
			this.timer.resetTimer();
		}
		else if(this.board.cardPlaced == false && this.mouseWasClicked == false && this.timer.seconds == 0){
			let i;
			for(i = 0; i < 5; i++){
				if(this.displayMap.get(0) != null){
					if(this.board.addCard(i, this.displayMap.get(i)) != -1){
						console.log("Getting card from topDisplay --> Added to board")
						break; //card added successfully
					}
				}
			}
			this.timer.resetTimer();
		}
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