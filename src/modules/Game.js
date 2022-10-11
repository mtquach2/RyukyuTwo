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

	x = 0;

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
		// console.log("CARD PLACED:",this.board.cardPlaced);
		if(this.board.cardPlaced == true){
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if(this.board.cardPlaced == false && this.board.cardSelected == true && this.timer.seconds == 0) {
			for(let i = 0; i <= 5; i++){
				if(this.board.addCard(i, this.board.currentCard) != -1){
					this.board.currentCard = null;
					this.board.cardSelected = false;
					console.log("Card selected but not placed --> Added to board")
					break; //card added successfully
				}
			}
			this.timer.resetTimer();
		}
		else if(this.board.cardPlaced == false && this.board.cardSelected == false && this.timer.seconds == 0){
			let placed = false;
			// console.log("TOP DISPLAY FIRST COL:", this.displayMap.get(0));
			// console.log("TOP DISPLAY SECOND COL:", this.displayMap.get(1));
			// console.log("TOP DISPLAY THIRD COL:", this.displayMap.get(2));
			// console.log("TOP DISPLAY FOURTH COL:", this.displayMap.get(3));
			//console.log("TOP DISPLAY CARD: ", this.displayMap.get(i)[this.board.counts[x]]);
			// for(let i = 0; i < 5; i++){ 
			// 	for(let x = 0; x < 4; x++){ 
			// 		console.log("TOP DISPLAY CARD: ", this.displayMap.get(x)[this.board.counts[x]]);
			// 		console.log("X IS CURRENTLY:", x);
			// 		if(this.displayMap.get(x)[this.board.counts[x]].value != null){
			// 			if(this.board.addCard(i, this.displayMap.get(x)[this.board.counts[x]]) != -1){
			// 				this.board.currentCard = null;
			// 				this.board.counts[x]--;
			// 				console.log("Getting card from topDisplay --> Added to board")
			// 				placed = true;
			// 				break; 
			// 			}
			// 		}
			// 	}
			// 	if(placed == true){
			// 		placed = false;
			// 		break;
			// 	}
			// }

			console.log("TOP DISPLAY FIRST COL:", this.displayMap.get(0));
			console.log("TOP DISPLAY SECOND COL:", this.displayMap.get(1));
			console.log("TOP DISPLAY THIRD COL:", this.displayMap.get(2));
			console.log("TOP DISPLAY FOURTH COL:", this.displayMap.get(3));
			let firstCard = this.board.getFirstCard(this.displayMap);
			for(let i = 0; i < 5; i++){ 
				if(firstCard != null){
					//this.board.addCard(i, firstCard)
					if(this.board.addCard(i, firstCard) != -1){
						this.board.currentCard = null;
						console.log("Getting card from topDisplay --> Added to board")
						break;
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