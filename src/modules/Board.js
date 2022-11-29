import { Hand } from './Hand';
import { Score } from './Score';

export class Board {
    constructor(p, timer) {
        this.p5 = p;
        this.counts = [12, 12, 12, 12];
        this.currentCard = null;
        this.draggingColumn = null;
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
        this.arrow;
        this.reverseIndices = {
            4: 0,
            3: 1,
            2: 2,
            1: 3,
            0: 4
        };
    }

    load() {
        this.jpFont = this.p5.loadFont("/static/fonts/jackeyfont.ttf");
        this.marker = this.p5.loadImage('../../static/cards/card_back.png');
        this.paperFrameLight = this.p5.loadImage("/static/UI/paperFrame1.png");
        this.paperFrameLong = this.p5.loadImage("/static/UI/paperStrip.png");
        this.arrow = this.p5.loadImage("/static/UI/arrow.png");
    }

    resetBoard() {
        this.counts = [12, 12, 12, 12];
        this.currentCard = null;
        this.draggingColumn = null;
        this.col = 0;
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];
        this.marker;
        this.cardPlaced = false;
        this.cardSelected = false;
    }

    addCard(column, card, score) {
        // Adds a card to the board
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

            if (this.reverseIndices[column] == row) {
                this.boardDiag[1].addCard(card, score);
            }
        }
        else {
            return -1;
        }
    }

    render(displayMap, mouseWasClicked, w, h, scaleX, scaleY) {
        // Total display for main game/board
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.boardX = w / 3;
        this.boardY = h / 3.5;

        for (let x = 4; x >= 0; x--) {
            this.xPositions[x] = this.boardX + 33 * this.scaleX + (x + 1) * 80 * this.scaleX;
        }

        for (let y = 2; y >= 0; y--) {
            this.yPositions[y] = (this.boardY / 3) - 33 * y * this.scaleY;
        }
        this.mouseWasClicked = mouseWasClicked;

        this.renderBoard();
        this.renderBoardCards();
        this.renderColumnDisplay();
        this.renderCardsLeft(w, h);
        this.renderCardsTopDisplay(displayMap);
        this.displayCard(this.mouseWasClicked);
        this.renderInstructions(w, h);
    }

    renderBoardCards() {
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.fill(255, 0, 0);
        this.p5.strokeWeight(1);
        this.p5.textSize(32);
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];

            // Display rank for hands (rows)
            this.selectFont(rowHand.rank);
            this.p5.text(`${rowHand.rankTable[rowHand.rank]}`, this.boardX, this.boardY + (i + 1) * 80 * this.scaleY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

            // Display rank for hands (columns)
            this.selectFont(colHand.rank);
            this.p5.text(`${colHand.rankTable[colHand.rank]}`, this.boardX + (i + 1) * 80 * this.scaleX + 10 * this.scaleX, this.boardY + (this.boardRows.length + 1) * 80 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

            // Display cards in board
            for (let j = 0; j < this.boardRows.length; j++) {
                colHand.showCard(j, this.boardX + (i + 1) * 80 * this.scaleX, this.boardY + (j + 1) * 80 * this.scaleY, this.scaleX, this.scaleY);
            }
        }

        let majorHand = this.boardDiag[0];
        let reversehand = this.boardDiag[1];

        // Display rank for major diagonal
        this.selectFont(majorHand.rank);
        this.p5.text(`${majorHand.rankTable[majorHand.rank]}`, this.boardX, this.boardY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

        // Display rank for reverse diagonal
        this.selectFont(reversehand.rank);
        this.p5.text(`${reversehand.rankTable[reversehand.rank]}`, this.boardX, this.boardY + (this.boardRows.length + 1) * 80 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);
    }

    renderBoard() {
        // Draws the board outlines
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(204, 97, 61);
        for (let i = 0; i < this.boardCols.length; i++) {
            this.p5.rect(this.boardX, this.boardY + (i + 1) * 80 * this.scaleY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for rows
            this.p5.rect(this.boardX + (i + 1) * 80 * this.scaleX + 10 * this.scaleX, this.boardY + (this.boardRows.length + 1) * 80 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for cols

            for (let j = 0; j < this.boardRows.length; j++) {
                this.p5.rect(this.boardX + (i + 1) * 80 * this.scaleX, this.boardY + (j + 1) * 80 * this.scaleY, 80 * this.scaleX, 80 * this.scaleY); // Board
            }
        }

        this.p5.rect(this.boardX, this.boardY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for major diagonal
        this.p5.rect(this.boardX, this.boardY + (this.boardRows.length + 1) * 80 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY); // Rank box for reverse diagonal
    }

    renderColumnDisplay() {
        // 1x5 array for column selection
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(217, 153, 89);
        for (let i = 0; i < 5; i++) {
            this.p5.rect(this.boardX + (i + 1) * 80 * this.scaleX, this.yPositions[0] + 95 * this.scaleY, 80 * this.scaleX, 80 * this.scaleY); //1x5 array
        }
    }

    renderCardsLeft(width, height) {
        // Displays remaining cards in each of the columns 
        this.p5.image(this.paperFrameLight, this.boardX * 2 + this.boardX / 3, this.boardY / 4 + this.boardY, width / 5, height / 2);
        for (let i = 0; i < 4; i++) {
            for (let x = 0; x < this.counts[i] + 1; x++) {
                this.p5.image(this.marker, this.boardX * 2.05 + this.boardX / 3 + (i * width / 25), this.boardY / 3 + this.boardY + (x * height / 30), 50 * this.scaleX, 50 * this.scaleY);
            }
        }
    }

    selectFont(rank) {
        if (rank == 0) {
            this.p5.textFont("Helvetica");
        }
        else {
            this.p5.textFont(this.jpFont);
        }
    }

    /**
     * Deselect a card after clicking on it 
     */
    unChooseCard() {
        // Resets variables
        this.draggingColumn = null
        this.currentCard = null
    }

    clicked(px, py, displayMap) {
        // Selects a card from 3x4 array 
        console.log(this.scaleY);
        if (py >= this.yPositions[0] + 5 * this.scaleY && py < this.yPositions[0] + 80 * this.scaleY) {
            if (this.currentCard != null) {
                return;
            }
            for (let i = 0; i < 4; i++) {
                if (px >= this.xPositions[i] && px < this.xPositions[i + 1] && this.counts[i] >= 0) {
                    this.currentCard = displayMap.get(i)[this.counts[i]];
                    this.draggingColumn = i;
                }
            }
            this.cardSelected = true;
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

    renderCardsTopDisplay(displayMap) {
        // Displays 12 cards for preview in top display
        for (let i = 0; i < 4; i++) {
            let offset = -2;
            for (let l = 0; l < 3; l++) {
                if ((this.counts[i] + offset) >= 0) {
                    let c = displayMap.get(i)[this.counts[i] + offset] //displays cards from end of deck to beginning
                    c.showImage(this.xPositions[i], this.yPositions[2 - l], this.scaleX, this.scaleY);
                }
                offset++;
            }
        }
    }

    displayCard(mouseWasClicked) {
        if (mouseWasClicked == true && this.currentCard != null) {
            // Displays numbers for columns to choose from
            this.p5.stroke(255, 0, 0);
            this.p5.textFont("Helvetica");
            for (let col = 0; col < 5; col++) {
                this.p5.image(this.arrow, this.boardX + 35 + (col + 1) * 80 * this.scaleX, this.yPositions[0] + 155 * this.scaleY);
            }

            // Highlights box/column where card was selected
            this.p5.rect(this.xPositions[this.draggingColumn] + 12.75 * this.scaleX, this.yPositions[0], 55 * this.scaleX, 80 * this.scaleY);
        }
    }

    chooseCol(py, score) {
        // Displays card in selected column in board
        this.cardSelected = true;
        if (py >= this.boardY - 68 * this.scaleY && py < this.boardY + 33 * this.scaleY) {
            for (let col = 0; col < 5; col++) {
                if (this.p5.mouseX >= this.boardX + (col + 1) * 80 * this.scaleX && this.p5.mouseX < this.boardX + (col + 2) * 80 * this.scaleX) {
                    this.col = col;
                    break;
                }
            }
            if (this.col !== -1 && !this.boardCols[this.col].isFull()) {
                if (this.currentCard !== null) { // Checks to see that player isn't just clicking on the column
                    this.columnSelected = true;
                    if (this.timer.seconds !== 0) {
                        this.addCard(this.col, this.currentCard, score);
                        this.cardPlaced = true;
                        this.currentCard = null;
                        this.counts[this.draggingColumn] -= 1
                        this.draggingColumn = null
                        this.cardSelected = false;
                        this.columnSelected = false;
                    }
                }
            }
            this.col = -1;
        }
    }

    /**
     * Redraws the board after cancel(backspace) is pressed
     * @param boardState The previous state of board to reenact 
     * @param deck the deck of all Card objects
     */
    updateHands(boardState, deck) {
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];

        for (var i = 0; i < boardState.board.length; i++) {
            for (var j = 0; j < boardState.board[i].length; j++) {
                let card;
                let tempScore = new Score();
                if (boardState.board[i][j] !== '') {
                    let value = '';
                    let suit = '';
                    if (boardState.board[i][j].charAt(0) === '0' || boardState.board[i][j].charAt(0) === '1') {
                        value = boardState.board[i][j].charAt(0) + boardState.board[i][j].charAt(1);
                        suit = boardState.board[i][j].charAt(2);
                    }
                    else {
                        value = boardState.board[i][j].charAt(0);
                        suit = boardState.board[i][j].charAt(1);
                    }
                    tempScore.currentScore = boardState.score;
                    card = this.findCard(deck, suit, value);
                    this.boardCols[i].addCard(card, tempScore);
                    this.boardRows[this.reverseIndices[j]].addCard(card, tempScore);
                    if (i === j) {
                        this.boardDiag[1].addCard(card, tempScore);
                    }
                    if (i === this.reverseIndices[j]) {
                        this.boardDiag[0].addCard(card, tempScore);
                    }

                }

            }
        }
    }

    /**
     * Updates the topDisplay and the cards left section after Cancel(backspace) is pressed
     * @param displayState the stateSaver
     */
    updateTopDisplay(displayState) {
        this.counts = displayState.counts;

    }

    /**
     * Finds the corresponding Card object given the value and suit
     * @param deck The deck with all the Card objects
     * @param suit The suit of the card to find
     * @param value The value of the card to find
     * @returns the Card if match is found, null if no match is found
     */
    findCard(deck, suit, value) {
        for (var i = 0; i < deck.length; i++) {
            let deckValue = deck[i].getValue();
            let deckSuit = deck[i].getSuit();
            if (deckValue === value && deckSuit === suit) {
                return deck[i];
            }
        }
        return null;
    }

    getFirstCard(displayMap) {
        // Gets the first card from the display map, starting from leftmost column
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

    movesUpdate(recentMoves) {
        // Keeps track of the last three moves 
        if (recentMoves.length > 3) {
            recentMoves.shift(); //removes first item from array
        }
    }

    renderInstructions(w, h) {
        // Displays Japanese instructions
        let instrX = this.boardX * 2 + this.boardX / 3;
        let instrY = this.boardY / 10 + this.boardY + h / 1.8

        this.p5.image(this.paperFrameLong, instrX, instrY, w / 5, h / 8);
        this.p5.strokeWeight(3);
        this.p5.textFont(this.jpFont, 32 * Math.min(this.scaleX, this.scaleY));
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);

        this.p5.textAlign(this.p5.LEFT, this.p5.TOP);

        if (!this.cardSelected || this.currentCard == null) {
            this.p5.text("カードを", instrX + 10 * this.scaleX, instrY + 5 * this.scaleY, w / 5, h / 8);
        }
        else {
            this.p5.text("ラインを", instrX + 10 * this.scaleX, instrY + 5 * this.scaleY, w / 5, h / 8);
        }
        this.p5.text("選んでください。", instrX + 10 * this.scaleX, instrY + 40 * this.scaleY, w / 5, h / 8);
    }
}

