import { Hand } from './Hand';

export class Board {
    constructor(p5, timer) {
        this.p = p5
        this.counts = [12, 12, 12, 12];
        this.currentCard;
        this.col = 0;
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];
        this.timer = timer;

        this.boardX = 0;
        this.boardY = 0;
        this.xPositions = [];
        this.yPositions = [];
        this.marker;
        this.cardPlaced = false;
        this.cardSelected = false;

        this.jpFont;
        this.reverseIndices = {
            4: 0,
            3: 1,
            2: 2,
            1: 3,
            0: 4
        };
    }

    addCard(column, card, score) {
        if (card == null) {
            return;
        }

        if (!this.boardCols[column].isFull()) {
            const row = this.boardCols[column].addCard(card, score);
            this.boardRows[row].addCard(card, score);

            // Major Diagonal
            if (row == column) {
                this.boardDiag[0].addCard(card, score);
            }

            // Reverse Diagonal
            if (this.reverseIndices[column] == row) {
                this.boardDiag[1].addCard(card, score);
            }
        }
        else {
            return -1;
        }
    }

    render(displayMap, w, h) {
        this.boardX = w / 3;
        this.boardY = h / 3;

        for (let x = 4; x >= 0; x--) {
            this.xPositions[x] = this.boardX + 33 + 65 * (x + 1);
        }

        for (let y = 2; y >= 0; y--) {
            this.yPositions[y] = this.boardY / 2 - 33 * y;
        }

        this.renderBoard();
        this.renderBoardCards();
        this.renderTopDisplay(displayMap);
        this.renderCardsLeft(w, h);
    }

    renderBoardCards() {
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        // Populates the card evaluation
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];
            if (rowHand.rank != -1) { // Display rank for hands (rows)
                this.p.text(`${rowHand.rankTable[rowHand.rank]}`, this.boardX, this.boardY + (i + 1) * 65 + 10, 40, 40);
            }
            if (colHand.rank != -1) { // Display rank for hands (columns)
                this.p.text(`${colHand.rankTable[colHand.rank]}`, this.boardX + (i + 1) * 65 + 10, this.boardY + (this.boardRows.length + 1) * 65 + 20, 40, 40);
            }
            for (let j = 0; j < this.boardRows.length; j++) {
                colHand.showCard(j, this.boardX + (i + 1) * 65, this.boardY + (j + 1) * 65); //displays a card throughout each col starting from the bottom left square going up 
            }
        }

        let majorHand = this.boardDiag[0];
        let reversehand = this.boardDiag[1];

        if (majorHand.rank != -1) {
            this.p.text(`${majorHand.rankTable[majorHand.rank]}`, this.boardX, this.boardY + 10, 40, 40); // Display rank for major diagonal
        }
        if (reversehand.rank != -1) {
            this.p.text(`${reversehand.rankTable[reversehand.rank]}`, this.boardX, this.boardY + (this.boardRows.length + 1) * 65 + 20, 40, 40); // Display rank for reverse diagonal
        }
    }

    renderBoard() {
        // Draws the board outlines
        this.p.noFill();
        this.p.stroke(255, 0, 0);
        for (let i = 0; i < this.boardCols.length; i++) {
            this.p.rect(this.boardX, this.boardY + (i + 1) * 65 + 10, 40, 40); // Rank box for rows
            this.p.rect(this.boardX + (i + 1) * 65 + 10, this.boardY + (this.boardRows.length + 1) * 65 + 20, 40, 40); // Rank box for cols

            for (let j = 0; j < this.boardRows.length; j++) {
                this.p.rect(this.boardX + (i + 1) * 65, this.boardY + (j + 1) * 65, 65, 65); // Board
            }
        }
        
        this.p.rect(this.boardX, this.boardY + 10, 40, 40); // Rank box for major diagonal
        this.p.rect(this.boardX, this.boardY + (this.boardRows.length + 1) * 65 + 20, 40, 40); // Rank box for reverse diagonal
    }

    /**
     * Creates a 1x4 array/rectangle and displays cards to use for game
     */
    renderTopDisplay() {
        this.p.noFill();
        this.p.stroke(0, 0, 255);
        for (let i = 0; i < 4; i++) {
            for (let y = 0; y < 3; y++) {
                this.p.rect(this.boardX + (i + 1) * 65 + 65 / 2, this.yPositions[y], 65, 65); //top display
            }
        }
        for (let i = 0; i < 5; i++) {
            this.p.rect(this.boardX + (i + 1) * 65, this.yPositions[0] + 65, 65, 65); //1x5 array
        }
    }

    /**
     * Displays rectangle for cards left part
     * Also displays how many cards remaining in each column 
     * @param w window width
     * @param h window height
     */
    renderCardsLeft(w, h) {
        this.p.stroke(255, 0, 0);
        let width = w * 3;
        let height = h * 3;
        this.p.rect(this.boardX * 2 + this.boardX / 3, this.boardY / 10 + this.boardY, width / 5, height / 2);
        for (let i = 0; i < 4; i++) {
            for (let x = 0; x < this.counts[i] + 1; x++) {
                this.p.image(this.marker, width - width / 4.5 + (i * width / 20), height / 2.5 + (x * height / 30), 50, 50);
            }
        }
    }

    /**
     * Used to load card back image for cards left part
     */
    loadCardsLeft() {
        this.marker = this.p.loadImage('../../static/cards/card_back.png');
    }

    loadJPFont() {
        this.jpFont = this.p.loadFont("../../static/jackeyfont.ttf");
    }

    /**
     * Method used to check to see if a specific card from the top display was clicked
     * then updates the top display and displays it in 1x5 array for column choosing
     * @param px where our mouse's x-axis is at
     * @param py where our mouse's y-axis is at
     * @param displayMap map for deck of card
     */
    clicked(px, py, displayMap) {
        if (py >= this.yPositions[0] && py < this.yPositions[0] + 65) {
            if (this.currentCard != null) {
                return;
            }
            for (let i = 0; i < 4; i++) {
                if (px >= this.xPositions[i] && px < this.xPositions[i + 1] && this.counts[i] >= 0) {
                    this.currentCard = displayMap.get(i)[this.counts[i]];
                    this.counts[i]--;
                }
            }
        }
    }

    isFull(index) {
        return index < 5 && this.boardCols[index].isFull(); //checks to see if column is full 
    }

    isBoardFull() {
        for (const col of this.boardCols) {
            if (!col.isFull()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Displays cards in the top display
     * @param displayMap map for split deck of cards
     */
    initCards(displayMap) {
        for (let i = 0; i < 4; i++) {
            let offset = -2;
            for (let l = 0; l < 3; l++) {
                if ((this.counts[i] + offset) >= 0) {
                    displayMap.get(i)[this.counts[i] + offset].showImage(this.xPositions[i], this.yPositions[2 - l]);
                }
                offset++;
            }
        }
    }

    /**
     * Displays card selected from top display into 1x5 array
     * Moves with mouse's x-axis
     * @param mouseWasClicked boolean to check to see if a card was previously selected
     */
    displayCard(mouseWasClicked) {
        if (mouseWasClicked == true && this.currentCard != null) {
            let bounds = this.p.constrain(this.p.mouseX, this.boardX + 65, this.boardX + 65 * 5);
            this.currentCard.showImage(bounds, this.yPositions[0] + 65);
        }
    }

    /**
     * Displays selected card into the clicked column 
     * @param py mouse's y-axis 
     * @param recentMoves data structure that stores the last 3 recent moves
     * @param score score object to update
     */
    chooseCol(py, recentMoves, score) {
        this.cardSelected = true;
        if (py >= this.boardY - 65 && py < this.boardY) {
            for (let col = 0; col < 5; col++) {
                if (this.p.mouseX >= this.boardX + (col + 1) * 65 && this.p.mouseX < this.boardX + (col + 2) * 65) {
                    this.col = col;
                    break;
                }
            }
            if (this.col != -1 && !this.boardCols[this.col].isFull()) {
                if (this.timer.seconds != 0) {
                    this.addCard(this.col, this.currentCard, score);
                    recentMoves.push(this.currentCard);
                    this.movesUpdate(recentMoves);
                    this.cardPlaced = true;
                    this.currentCard = null;
                    this.cardSelected = false;
                }
            }
            this.col = -1;
        }
    }

    /**
     * Gets the first card from the display map, starting from leftmost column
     * @param displayMap the map showing the cards that the player has available to use.
     * @returns the first card 
     */
    getFirstCard(displayMap) {
        let firstCard;
        for (let i = 0; i < 4; i++) {
            if (this.counts[i] >= 0) {
                firstCard = displayMap.get(i)[this.counts[i]];
                if (firstCard != null) {
                    firstCard = displayMap.get(i)[this.counts[i]];
                    this.counts[i]--;
                    return firstCard;
                }
            }
        }
    }

    /**
     * Keeps track of the latest three moves. Removes the first move whenever a new move is added
     * @param recentMoves data structure that stores last 3 moves
     */
    movesUpdate(recentMoves) {
        if (recentMoves.length > 3) {
            recentMoves.shift(); //removes first item from array
        }
    }

    renderInstructions(w, h) {
        let instrX = this.boardX * 2 + this.boardX / 3;
        let instrY = this.boardY / 10 + this.boardY + h/2

		this.p.stroke(255, 0, 0);
        this.p.rect(instrX, instrY, w/5, h/8);
        this.p.textFont(this.jpFont, 32);
        this.p.stroke(255, 255, 255);
        this.p.fill(255, 255, 255);

        this.p.textAlign(this.p.LEFT, this.p.TOP);

        if (!this.cardSelected || this.currentCard == null) {
            this.p.text("カードを", instrX + 5, instrY + 5, w/5, h/8);
        }
        else {
            this.p.text("ラインを", instrX + 5, instrY + 5, w/5, h/8);
        }
        this.p.text("選んでください。", instrX + 5, instrY + 40, w/5, h/8);
	}
}