import { Card } from './Card';
/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game {
	constructor(p5, board, score, timer) {
		this.p5 = p5
		this.board = board;
		this.score = score;
		this.timer = timer;
		this.level = 1;
		this.state = 0;

		this.deck = [];
		this.mouseWasClicked = false;
		this.displayMap = new Map();

		this.cancelsLeft = 3;
		this.recentMoves = [];
	}
	/**
	 * Method to preload images and initializes Card objects for an entire deck of cards
	 */
	load() {
		const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
		const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

		for (const suit of suits) {
			for (const value of values) {
				this.deck.push(new Card(this.p5, `${suit[0]}`, `${value}`, this.p5.loadImage(`../../static/cards/card_${suit}_${value}.png`)));
			}
		}

		this.board.loadCardsLeft();
		this.board.loadJPFont();
		this.score.fillScoreTable();
	}

	/**
	 * Displays the board and top display for the game
	 * Also, includes logic for selecting a card and column for game
	 */
	play(width, height) {
		// Render game elements
		this.renderLevel(width, height);

		this.score.render(width, height);

		this.board.render(this.displayMap, width, height);
		this.board.initCards(this.displayMap, width, height);
		this.board.displayCard(this.mouseWasClicked, width, height);
		this.board.renderInstructions(width, height);

		this.cancelDisplay(width, height);

		this.timer.drawTimer(width, height);
		this.timerTrigger();
		this.timer.drawSeconds(width, height);
	
		// Every 60 frames, decrement timer
		if (this.p5.frameCount % 60 == 0) {
			this.timer.countDown();
		}

		// Update game state if needed
		if (this.board.isBoardFull()) {
			if (this.score.isWin()) {
				console.log("Won with score " + this.score.getScore());
				this.state = 2;
			}
			else {
				// TODO: Add possibility of getting omikuji instead of straight to game over
				this.state = 3;
			}
		}	
	}

	intToKanji(number) {
		let kanji = "";

		const kanji_table = {
			0:"",
			1:"一",
			2:"二",
			3:"三",
			4:"四",
			5:"五",
			6:"六",
			7:"七",
			8:"八",
			9:"九",
			10:"十",
			100:"百"
		};

		// Hundreds
		if ((number / 100) >= 1) {
			const hundred = Math.floor(number / 100);
			kanji += (hundred != 1 ? kanji_table[hundred] : "") + kanji_table[100];

			number = number % 100;
		}

		// Tens
		if ((number / 10) >= 1) {
			const ten = Math.floor(number / 10);
			kanji += (ten != 1 ? kanji_table[ten] : "") + kanji_table[10];

			number = number % 10;
		}

		// Ones
		kanji += kanji_table[number];

		return kanji;
	}

	renderLevel(w, h) {
		this.p5.stroke(255);
		this.p5.rect(w/3, h/8, 60, 60);
		this.p5.textAlign(this.p5.CENTER, this.p5.TOP);
		this.p5.text(`${this.intToKanji(this.level)}`, w/3, h/8, 60, 60);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.text(`面`, w/3, h/8, 60, 60);
	}

	renderDivider(width, height) { //TODO fix 
		this.p5.stroke(0, 255, 0);
		this.p5.line(width / 4, 0, width / 4, height);
		this.p5.line(width * 2 / 3, 0, width * 2 / 3, height);
	}

	/**
	 * Sends displayMap to clicked() in Board.js 
	 * @param px mouseX value
	 */
	updateTopDisplay(px, py) {
		this.currentCard = this.board.clicked(px, py, this.displayMap);
		this.mouseWasClicked = true;
	}

	/**
	 * Splits a full deck of cards into 4 even parts
	 */
	splitCards() {
		this.p5.shuffle(this.deck, true);
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
		if (this.board.cardPlaced == true) {
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if (this.board.cardPlaced == false && this.board.cardSelected == true && this.board.columnSelected == false && this.timer.seconds == 0) {
			for(let i = 0; i <= 5; i++){
				if(this.board.addCard(i, this.board.currentCard) != -1){
					console.log("CARD SELECTD BUT NOT COLUMN");
					this.recentMoves.push(this.board.currentCard);
					console.log(this.recentMoves);
					this.board.movesUpdate(this.recentMoves);
					this.board.currentCard = null;
					this.board.cardSelected = false;
					this.board.columnSelected = false;
					break; 
				}
			}
			this.timer.resetTimer();
		}
		else if (this.board.cardPlaced == false && this.board.cardSelected == false && this.board.columnSelected == false && this.timer.seconds == 0) {
			let firstCard = this.board.getFirstCard(this.displayMap);
			for(let i = 0; i < 5; i++){ 
				if(firstCard != null){
					if(this.board.addCard(i, firstCard) != -1){
						console.log("CARD DROPPED FROM TOP DECK");
						this.recentMoves.push(firstCard);
						console.log(this.recentMoves);
						this.board.movesUpdate(this.recentMoves);
						this.board.currentCard = null;
						break;
					}
				}
			}
			this.timer.resetTimer();
		}
	}

	cancelDisplay(w, h) {
		this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
		this.p5.stroke(255, 0, 0);
		this.p5.noFill();
		this.p5.rect(w - w / 4.5, h / 6.5, w / 5, h / 15);
		this.p5.stroke(255);
		this.p5.textSize(20);
		this.p5.text("CANCELS LEFT:", w - w / 4.75, h / 5.25);
		this.p5.stroke(255);
		this.p5.textSize(20);
		this.p5.text(this.cancelsLeft, w - w / 20, h / 5.25);
	}

	/**
	 * Gets the ranking of the poker hand from Hand.js
	 * @param rank poker hand ranking
	 */
	getRank(rank) {
		this.score.updateScore(rank);
	}


	getState() {
		return this.state;
	}

	setState(state) {
		this.state = state;
	}

};
