import { Hand } from './Hand';

export class Board {
    constructor(p5, timer) {
        this.p5 = p5
        this.counts = [12, 12, 12, 12];
        this.currentCard;
        this.col = 0;
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];
        this.timer = timer;

        this.scaleX = 1;
        this.scaleY = 1;
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

    render(displayMap, w, h, scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.boardX = w / 3;
        this.boardY = h / 3;

        for (let x = 4; x >= 0; x--) {
            this.xPositions[x] = this.boardX + 33 * this.scaleX + (x + 1) * 65 * this.scaleX;
        }

        for (let y = 2; y >= 0; y--) {
            this.yPositions[y] = this.boardY / 2 - 33 * y * this.scaleY;
        }

        this.renderBoard();
        this.renderBoardCards();
        this.renderTopDisplay(displayMap);
        this.renderCardsLeft(w, h);
    }

    renderBoardCards() {
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.fill(255, 0, 0);
        this.p5.strokeWeight(1);
        // Populates the card evaluation
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];
            if (rowHand.rank != -1) { // Display rank for hands (rows)
                this.p5.text(`${rowHand.rankTable[rowHand.rank]}`, this.boardX, this.boardY + (i + 1) * 65 * this.scaleY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);
            }
            if (colHand.rank != -1) { // Display rank for hands (columns)
                this.p5.text(`${colHand.rankTable[colHand.rank]}`, this.boardX + (i + 1) * 65 * this.scaleX + 10 * this.scaleX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);
            }
            for (let j = 0; j < this.boardRows.length; j++) {
                colHand.showCard(j, this.boardX + (i + 1) * 65 * this.scaleX, this.boardY + (j + 1) * 65 * this.scaleY, this.scaleX, this.scaleY); //displays a card throughout each col starting from the bottom left square going up 
            }
        }

        let majorHand = this.boardDiag[0];
        let reversehand = this.boardDiag[1];

        if (majorHand.rank != -1) {
            this.p5.text(`${majorHand.rankTable[majorHand.rank]}`, this.boardX, this.boardY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Display rank for major diagonal
        }
        if (reversehand.rank != -1) {
            this.p5.text(`${reversehand.rankTable[reversehand.rank]}`, this.boardX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Display rank for reverse diagonal
        }
    }

    renderBoard() {
        // Draws the board outlines
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(255, 0, 0);
        for (let i = 0; i < this.boardCols.length; i++) {
            this.p5.rect(this.boardX, this.boardY + (i + 1) * 65 * this.scaleY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for rows
            this.p5.rect(this.boardX + (i + 1) * 65 * this.scaleX + 10 * this.scaleX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for cols

            for (let j = 0; j < this.boardRows.length; j++) {
                this.p5.rect(this.boardX + (i + 1) * 65 * this.scaleX, this.boardY + (j + 1) * 65 * this.scaleY, 65 * this.scaleX, 65 * this.scaleY); // Board
            }
        }

        this.p5.rect(this.boardX, this.boardY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for major diagonal
        this.p5.rect(this.boardX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for reverse diagonal
    }

    /**
     * Creates a 1x4 array/rectangle and displays cards to use for game
     */
    renderTopDisplay() {
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(0, 0, 255);
        for (let i = 0; i < 4; i++) {
            for (let y = 0; y < 3; y++) {
                this.p5.rect(this.boardX + (i + 1) * 65 * this.scaleX + 65 * this.scaleX / 2, this.yPositions[y], 65 * this.scaleX, 65 * this.scaleY); //top display
            }
        }
        for (let i = 0; i < 5; i++) {
            this.p5.rect(this.boardX + (i + 1) * 65 * this.scaleX, this.yPositions[0] + 65 * this.scaleY, 65 * this.scaleX, 65 * this.scaleY); //1x5 array
        }
    }

    /**
     * Displays rectangle for cards left part
     * Also displays how many cards remaining in each column 
     * @param w window width
     * @param h window height
     */
    renderCardsLeft(width, height) {
        this.p5.stroke(255, 0, 0);
        this.p5.rect(this.boardX * 2 + this.boardX / 3, this.boardY / 10 + this.boardY, width / 5, height / 2);
        for (let i = 0; i < 4; i++) {
            for (let x = 0; x < this.counts[i] + 1; x++) {
                this.p5.image(this.marker, width - width / 4.5 + (i * width / 20), height / 2.5 + (x * height / 30), 50 * this.scaleX, 50 * this.scaleY);
            }
        }
    }

    /**
     * Used to load card back image for cards left part
     */
    loadCardsLeft() {
        this.marker = this.p5.loadImage('../../static/cards/card_back.png');
    }

    loadJPFont() {
        this.jpFont = this.p5.loadFont("../../static/jackeyfont.ttf");
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
                    displayMap.get(i)[this.counts[i] + offset].showImage(this.xPositions[i], this.yPositions[2 - l], this.scaleX, this.scaleY);
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
            let bounds = this.p5.constrain(this.p5.mouseX, this.boardX + 65 * this.scaleX, this.boardX + 65 * 5 * this.scaleX);
            this.currentCard.showImage(bounds, this.yPositions[0] + 65 * this.scaleY, this.scaleX, this.scaleY);
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
        if (py >= this.boardY - 65 * this.scaleY && py < this.boardY) {
            for (let col = 0; col < 5; col++) {
                if (this.p5.mouseX >= this.boardX + (col + 1) * 65 * this.scaleX && this.p5.mouseX < this.boardX + (col + 2) * 65 * this.scaleX) {
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
        let instrY = this.boardY / 10 + this.boardY + h / 2

        this.p5.strokeWeight(3);
        this.p5.stroke(255, 0, 0);
        this.p5.rect(instrX, instrY, w / 5, h / 8);
        this.p5.strokeWeight(1);
        this.p5.textFont(this.jpFont, 32 * Math.min(this.scaleX, this.scaleY));
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);

        this.p5.textAlign(this.p5.LEFT, this.p5.TOP);

        if (!this.cardSelected || this.currentCard == null) {
            this.p5.text("カードを", instrX + 5 * this.scaleX, instrY + 5 * this.scaleY, w / 5, h / 8);
        }
        else {
            this.p5.text("ラインを", instrX + 5 * this.scaleX, instrY + 5 * this.scaleY, w / 5, h / 8);
        }
        this.p5.text("選んでください。", instrX + 5 * this.scaleX, instrY + 40 * this.scaleY, w / 5, h / 8);
    }
}