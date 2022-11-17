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
		this.gameStateSaver = [];
		this.stateSaver();

		this.paperFrameLong;
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

		this.board.load();
		this.score.fillScoreTable();
		this.paperFrameLong = this.p5.loadImage("/static/UI/paperStrip.png");
	}

	play(width, height, scaleX, scaleY) {
		// Render game elements
		this.renderLevel(width, height, scaleX, scaleY);

		this.score.render(width, height, scaleX, scaleY);

		this.board.render(this.displayMap, width, height, scaleX, scaleY);
		this.board.displayCards(this.displayMap, width, height);
		this.board.displayCard(this.mouseWasClicked, width, height);
		this.board.renderInstructions(width, height);

		this.cancelDisplay(width, height, scaleX, scaleY);

		this.timer.drawTimer(width, height, scaleX, scaleY);
		this.timerTrigger();
		this.timer.drawSeconds(width, height, scaleX, scaleY);

		// Every 60 frames, decrement timer
		if (this.p5.frameCount % 60 == 0) {
			this.timer.countDown();
		}

		if (this.board.isBoardFull()) {
			if (this.score.isWin()) {
				return 5;
			}
			else {
				let sound = new Audio('/static/sounds/continue.mp3');
				sound.volume = 0.5;
				sound.play();
				return 2;
			}
		}

		return 1;
	}

	/**
	 * Saves the state of the board, score and counts after a card is dropped
	 */
	stateSaver(){
		let currBoard = this.board.boardCols.map(r => {
			return r.hand.map(c => {
				return `${c.value}${c.suit}`
			})
		})

		let cardDisplay = [];
		for(var i = 0; i < 4; i++){
			cardDisplay.push(this.board.counts[i]);
		}

		const gameState = {
			score : this.score.currentScore,
			board : currBoard, 
			counts : cardDisplay
		}

		this.gameStateSaver.push(gameState);

		if(this.gameStateSaver.length > 4){
			this.gameStateSaver.shift();
		}
	}

	intToKanji(number) {
		let kanji = "";

		const kanji_table = {
			0: "",
			1: "一",
			2: "二",
			3: "三",
			4: "四",
			5: "五",
			6: "六",
			7: "七",
			8: "八",
			9: "九",
			10: "十",
			100: "百"
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

	renderLevel(w, h, scaleX, scaleY) {
		this.p5.strokeWeight(3);
		this.p5.noFill();
		this.p5.stroke(204, 97, 61);
		this.p5.rect(w / 3, h / 8, 70 * scaleX, 80 * scaleY);

		this.p5.strokeWeight(1);
		this.p5.stroke(0, 0, 0);
		this.p5.fill(255, 255, 255);
		this.p5.textAlign(this.p5.CENTER, this.p5.TOP);
		this.p5.textSize(40 * Math.min(scaleX, scaleY));
		this.p5.text(`${this.intToKanji(this.level)}`, w / 3, h / 8, 80 * scaleX, 80 * scaleY);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.text(`面`, w / 3, h / 8 + 10 * scaleY, 80 * scaleX, 80 * scaleY);
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
		console.log(this.displayMap);
	}

	/**
	 * Shuffles the deck for a reset
	*/
	reShuffle() {
		for (let i = 0; i < 4; i++) {
			this.displayMap.set(i, this.p5.shuffle(this.displayMap.get(i), true));
		}
	}

	/**
	 * Triggers timer to reset if card is dropped, selected but not dropped, or no selection at all.
	 */
	 timerTrigger() {
		if (this.board.cardPlaced == true) { 
			this.stateSaver();
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if (this.board.cardPlaced == false && this.board.cardSelected == true && this.board.columnSelected == false && this.timer.seconds == 0) {
			for(let i = 0; i <= 5; i++){
				if(this.board.addCard(i, this.board.currentCard) != -1){
					this.stateSaver();
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
						this.stateSaver();
						this.board.currentCard = null;
						break;
					}
				}
			}
			this.timer.resetTimer();
		}
	}

	/**
	 * Draws the cancel display 
	 * @param w the width of the display
   	 * @param h the height of the display
   	 * @param scaleX the x value for scaling
   	 * @param scaleY the y value for scaling
	 */
	cancelDisplay(w, h, scaleX, scaleY) {
		this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
		this.p5.image(this.paperFrameLong, w - w / 4.5, h / 6.5, w / 5, h / 15);

		this.p5.strokeWeight(3);
		this.p5.stroke(0, 0, 0);
		this.p5.fill(255, 255, 255);
		this.p5.textSize(20 * Math.min(scaleX, scaleY));
		this.p5.text("CANCELS", w - w / 6, h / 5.25);

		this.p5.textFont("Helvetica");
		this.p5.text("🐉".repeat(this.cancelsLeft), w - w / 10, h / 5.25);
	}

	/**
	 * Gets the ranking of the poker hand from Hand.js
	 * @param rank poker hand ranking
	 */
	getRank(rank) {
		this.score.updateScore(rank);
	}

	resetLevel() {
		this.level = 1;
	}

	getState() {
		return this.state;
	}

	setState(state) {
		this.state = state;
	}

};
