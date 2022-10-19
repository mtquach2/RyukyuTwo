import { Card } from './Card';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game { //TODO need a reset method and something to keep score of rounds
	constructor(board, score, timer) {
		this.board = board;
		this.score = score;
		this.timer = timer;
	}
	mouseWasClicked = false;
  	deck = [];
	displayMap = new Map();

	x = 0;

	cancelsLeft = 3;
	recentMoves = [];

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
		this.board.loadCardsLeft(p);
		this.score.fillScoreTable();
	}

    /**
     * Displays the board and top display for the game
     * Also, includes logic for selecting a card and column for game
     * @param p 
     */
    staticRender(p, width, height) {
		this.score.render(p, width, height);
		this.board.render(p, this.displayMap, width, height);
		this.board.initCards(p, this.displayMap, width, height);
		this.board.displayCard(this.mouseWasClicked, p, width, height);
		// this.renderDivider(p, width, height);
		this.cancelDisplay(p);
	}

	renderDivider(p, width, height) { //TODO fix 
        p.stroke(0, 255, 0);
        p.line(width/4, 0, width/4, height);
        p.line(width * 2/3, 0, width * 2/3, height);
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

	/**
	 * Triggers timer to reset if card is dropped, selected but not dropped, or no selection at all.
	 */
	timerTrigger() {
		if(this.board.cardPlaced == true){
			this.recentMoves.push(this.board.currentCard);
			this.board.movesUpdate(this.recentMoves);
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if(this.board.cardPlaced == false && this.board.cardSelected == true && this.timer.seconds == 0) {
			for(let i = 0; i <= 5; i++){
				if(this.board.addCard(i, this.board.currentCard) != -1){
					this.recentMoves.push(this.board.currentCard);
					this.board.movesUpdate(this.recentMoves);
					this.board.currentCard = null;
					this.board.cardSelected = false;
					break; 
				}
			}
			this.timer.resetTimer();
		}
		else if(this.board.cardPlaced == false && this.board.cardSelected == false && this.timer.seconds == 0){
			let firstCard = this.board.getFirstCard(this.displayMap);
			for(let i = 0; i < 5; i++){ 
				if(firstCard != null){
					if(this.board.addCard(i, firstCard) != -1){
						this.recentMoves.push(firstCard);
						this.board.movesUpdate(this.recentMoves);
						this.board.currentCard = null;
						break;
					}
				}
			}
			this.timer.resetTimer();
		}
	}

	cancelDisplay(p){
		p.stroke(255);
		p.textSize(20);
		p.text("cancels left:", 900, 100);
		p.stroke(255);
		p.textSize(20);
		p.text(this.cancelsLeft, 1020, 100);
	}

};