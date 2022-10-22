import { Board } from './Board';
import { Card } from './Card';
import { Score } from './Score';

/**
 * Initializer class. Everything will get initialized/set up here before being put into main.ts
 */
export class Game { //TODO need a reset method and something to keep score of rounds
	constructor(p5, board, score, timer) {
		this.p5 = p5
		this.board = board;
		this.score = score;
		this.timer = timer;
		this.level = 1;
		this.state = 0;
		this.bonus = 0;

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
		this.score.fillScoreTable();
	}

	resetGame() {
		this.board = new Board(this.p5, this.timer);
		this.score = new Score(this.p5);

		this.board.loadCardsLeft();
		this.score.fillScoreTable();

		if (this.state == 2) {
			this.level++;
		}
		else {
			this.level = 1;
			this.bonus = 0;
		}

		console.log("NEW GAME");
		console.log("Level to " + this.level + " with bonus " + this.bonus);
		this.score.setClearPoint(this.level, this.bonus);
		this.state = 1;
	}

	menu(width, height) {
		// TODO: Implement main menu but better
		this.p5.stroke(255, 255, 255);
		this.p5.fill(255, 255, 255);
		this.p5.rect(width/3, height/3, 400, 150);

		this.p5.stroke(0, 0, 0);
		this.p5.fill(0, 0, 0);
		this.p5.textSize(64);
		this.p5.text("CLICK TO PLAY GAME", width/3, height/3, 400, 150);

		if (this.p5.mouseIsPressed) {
			if (width/3 < this.p5.mouseX && this.p5.mouseX < width/3 + 400 && height/3 < this.p5.mouseY && this.p5.mouseY < height/3 + 150) {
				this.p5.textSize(20);
				this.state = 1;
			}
		}
	}

	play(width, height) {
		// Render game elements
		this.renderLevel(width, height);
		this.score.render(width, height);
		this.board.render(this.displayMap, width, height);
		this.board.initCards(this.displayMap, width, height);
		this.board.displayCard(this.mouseWasClicked, width, height);
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

	omikuji(width, height) {
		// TODO: Implement omikuji selection an score update
		this.p5.stroke(255, 255, 255);
		this.p5.fill(255, 255, 255);
		this.p5.rect(width/3, height/3, 400, 400);

		this.p5.stroke(0, 0, 0);
		this.p5.fill(0, 0, 0);
		this.p5.textSize(64);
		this.p5.text("OMIKUJI, CLICK FOR 1500 BONUS", width/3, height/3, 400, 400);

		if (this.p5.mouseIsPressed) {
			if (width/3 < this.p5.mouseX && this.p5.mouseX < width/3 + 400 && height/3 < this.p5.mouseY && this.p5.mouseY < height/3 + 400) {
				this.p5.textSize(20);
				this.bonus = 1500;
				this.resetGame();
			}
		}
	}

	gameOver(width, height) {
		// TODO: Implement a game over screen
		this.p5.stroke(255, 255, 255);
		this.p5.fill(255, 255, 255);
		this.p5.rect(width/3, height/3, 400, 400);

		this.p5.stroke(0, 0, 0);
		this.p5.fill(0, 0, 0);
		this.p5.textSize(64);
		this.p5.text("GAME OVER, CLICK TO RESET", width/3, height/3, 400, 400);

		if (this.p5.mouseIsPressed) {
			if (width/3 < this.p5.mouseX && this.p5.mouseX < width/3 + 400 && height/3 < this.p5.mouseY && this.p5.mouseY < height/3 + 400) {
				this.p5.textSize(20);
				this.resetGame();
			}
		}
	}

	/**
	 * Displays the board and top display for the game
	 * Also, includes logic for selecting a card and column for game
	 */
	staticRender(width, height) {
		// State is 0, load main menu
		if (this.state == 0) {
			this.menu(width, height);
		}
		
		// State is 1, play game
		if (this.state == 1) {
			this.play(width, height);
		}

		// State is 2, omikuji
		if (this.state == 2) {
			this.omikuji(width, height);
		}

		// State is 3, game over
		if (this.state == 3) {
			this.gameOver(width, height);
		}
	}

	renderLevel(w, h) {
		this.p5.stroke(255);
		this.p5.text(`LVL ${this.level}`, w/3, h/8, 60, 60);
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
	timerTrigger() { //TODO clean up 
		if (this.board.cardPlaced == true) {
			this.timer.resetTimer();
			this.board.cardPlaced = false;
		}
		else if (this.board.cardPlaced == false && this.board.cardSelected == true && this.timer.seconds == 0) {
			for (let i = 0; i <= 5; i++) {
				if (this.board.addCard(i, this.board.currentCard) != -1) {
					this.recentMoves.push(this.board.currentCard);
					this.board.movesUpdate(this.recentMoves);
					this.board.currentCard = null;
					this.board.cardSelected = false;
					break;
				}
			}
			this.timer.resetTimer();
		}
		else if (this.board.cardPlaced == false && this.board.cardSelected == false && this.timer.seconds == 0) {
			let firstCard = this.board.getFirstCard(this.displayMap);
			for (let i = 0; i < 5; i++) {
				if (firstCard != null) {
					if (this.board.addCard(i, firstCard) != -1) {
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

	cancelDisplay(w, h) {
		this.p5.stroke(255, 0, 0);
		this.p5.rect(w - w / 4.5, h / 25, w / 5, h / 10);
		this.p5.stroke(255);
		this.p5.textSize(20);
		this.p5.text("cancels left:", w - w / 5.5, h / 10);
		this.p5.stroke(255);
		this.p5.textSize(20);
		this.p5.text(this.cancelsLeft, w - w / 12, h / 10);
	}

	/**
	 * Gets the ranking of the poker hand from Hand.js
	 * @param rank poker hand ranking
	 */
	getRank(rank) {
		this.score.updateScore(rank);
	}
};
