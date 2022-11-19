import { Hand } from './Hand';
import { Card } from './Card';
import { jpegVersion } from 'canvas';
import { Score } from './Score';

export class Board {
    constructor(p5, timer) {
        this.p5 = p5
        this.counts = [12, 12, 12, 12];
        this.currentCard = null;
        this.draggingColumn = null
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
        this.p5.textSize(32);
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];

            // Display rank for hands (rows)
            this.selectFont(rowHand.rank);
            this.p5.text(`${rowHand.rankTable[rowHand.rank]}`, this.boardX, this.boardY + (i + 1) * 65 * this.scaleY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

            // Display rank for hands (columns)
            this.selectFont(colHand.rank);
            this.p5.text(`${colHand.rankTable[colHand.rank]}`, this.boardX + (i + 1) * 65 * this.scaleX + 10 * this.scaleX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

            // Display cards in board
            for (let j = 0; j < this.boardRows.length; j++) {
                colHand.showCard(j, this.boardX + (i + 1) * 65 * this.scaleX, this.boardY + (j + 1) * 65 * this.scaleY, this.scaleX, this.scaleY);
            }
        }

        let majorHand = this.boardDiag[0];
        let reversehand = this.boardDiag[1];

        // Display rank for major diagonal
        this.selectFont(majorHand.rank);
        this.p5.text(`${majorHand.rankTable[majorHand.rank]}`, this.boardX, this.boardY + 10 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);

        // Display rank for reverse diagonal
        this.selectFont(reversehand.rank);
        this.p5.text(`${reversehand.rankTable[reversehand.rank]}`, this.boardX, this.boardY + (this.boardRows.length + 1) * 65 * this.scaleY + 20 * this.scaleY, 40 * this.scaleX, 40 * this.scaleY);
    }

    renderBoard() {
        // Draws the board outlines
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(204, 97, 61);
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
        this.p5.image(this.paperFrameLight, this.boardX * 2 + this.boardX / 3, this.boardY / 20 + this.boardY, width / 5, height / 2);
        for (let i = 0; i < 4; i++) {
            for (let x = 0; x < this.counts[i] + 1; x++) {
                this.p5.image(this.marker, this.boardX * 2.05 + this.boardX / 3 + (i * width / 25), this.boardY / 10 + this.boardY + (x * height / 30), 50 * this.scaleX, 50 * this.scaleY);
            }
        }
    }

    load() {
        this.marker = this.p5.loadImage('../../static/cards/card_back.png');
        this.jpFont = this.p5.loadFont("../../static/jackeyfont.ttf");
        this.paperFrameLight = this.p5.loadImage("/static/UI/paperFrame1.png");
        this.paperFrameLong = this.p5.loadImage("/static/UI/paperStrip.png");
    }

    selectFont(rank) {
        if (rank == 0) {
            this.p5.textFont("Helvetica");
        }
        else {
            this.p5.textFont(this.jpFont);
        }
    }

    unChooseCard(){
        this.draggingColumn = null;
        this.currentCard = null;
    }

    /**
     * Method used to check to see if a specific card from the top display was clicked
     * then updates the top display and displays it in 1x5 array for column choosing
     * @param px where our mouse's x-axis is at
     * @param py where our mouse's y-axis is at
     * @param displayMap map for deck of card
     */
    clicked(px, py, displayMap, recentMoves) {
        if (py >= this.yPositions[0] && py < this.yPositions[0] + 65) {
            if (this.currentCard != null) {
                return;
            }
            for (let i = 0; i < 4; i++) {
                if (px >= this.xPositions[i] && px < this.xPositions[i + 1] && this.counts[i] >= 0) {
                    this.currentCard = displayMap.get(i)[this.counts[i]];
                    // this.counts[i]--;
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


    /**
     * Displays cards in the top display
     * @param displayMap map for split deck of cards
     */
     displayCards(displayMap) {
        for (let i = 0; i < 4; i++) {
            let offset = -2;
            for (let l = 0; l < 3; l++) {
                if ((this.counts[i] + offset) >= 0) {
                    // show the card
                    let c = displayMap.get(i)[this.counts[i] + offset]
                    if (this.currentCard !== c){
                        c.showImage(this.xPositions[i], this.yPositions[2 - l]);
                    }
                    
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
            let bounds = this.p5.constrain(this.p5.mouseX, this.boardX + 65, this.boardX + 65 * 5);
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
                if (this.p5.mouseX >= this.boardX + (col + 1) * 65 * this.scaleX && this.p5.mouseX < this.boardX + (col + 2) * 65 * this.scaleX) {
                    this.col = col;
                    break;
                }
            }
            if (this.col !== -1 && !this.boardCols[this.col].isFull()) {
                if(this.currentCard !== null){ //to make sure that player isn't just clicking on the column
                    console.log("COLUMN SELECTED");
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

    updateHands(boardState, deck){
        //console.log(this.deck);
        //console.log("ORIGINAL BOARDCOLS:", this.boardCols);
        //empty the whole board
        console.log("ORIGINAL BOARDROWS:", this.boardRows);
        console.log("ORIGINAL DIAGIONALS:", this.boardDiag)
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];

        for(var i = 0; i < boardState.board.length; i++){
            for(var j = 0; j < boardState.board[i].length ; j++){
                console.log("Looking for:", boardState.board[i][j]);
                let card;
                let tempScore = new Score();
                if(boardState.board[i][j] !== ''){ //will never be not empty
                    let value = '';
                    let suit = '';
                    if(boardState.board[i][j].charAt(0) === '0' || boardState.board[i][j].charAt(0) === '1'){
                       value = boardState.board[i][j].charAt(0) + boardState.board[i][j].charAt(1);
                       suit = boardState.board[i][j].charAt(2);
                    }
                    else{
                       value = boardState.board[i][j].charAt(0);
                       suit = boardState.board[i][j].charAt(1);
                    }
                    //console.log("VALUE IS:", value);
                    //console.log("SUIT IS:", suit);
                    tempScore.currentScore = boardState.score;
                    card = this.findCard(deck, suit, value);
                    console.log("THIS IS THE CARD FOUND:", card);
                    console.log("BOARDSTATE SCORE:", boardState.score);
                    this.boardCols[i].addCard(card, tempScore);
                    this.boardRows[this.reverseIndices[j]].addCard(card, tempScore);
                    if(i === j){
                        this.boardDiag[1].addCard(card, tempScore);
                    }
                    if(i === this.reverseIndices[j]){
                        this.boardDiag[0].addCard(card, tempScore);
                    }

                }

            }
        }

        console.log("AFTER BOARDROWS:", this.boardRows);
        console.log("AFTER DIAGONALS:", this.boardDiag);
        //console.log("AFTER BOARDCOLS:", this.boardCols);
    }

    updateTopDisplay(displayState){
        this.counts = displayState.counts;

    }

    findCard(deck, suit, value){
        // console.log("LOOKING FOR VALUE:", value);
        // console.log("LOOKING FOR SUIT:", suit);
        //let cardFound = new Card();
        for(var i = 0; i < deck.length; i++){
            //console.log("VALUE FROM DECK:",deck[i]);
            let deckValue = deck[i].getValue();
            let deckSuit = deck[i].getSuit();
            //console.log("DECK VALUE:", deckValue);
            if(deckValue === value && deckSuit === suit){
                return deck[i];
                //console.log("DECK CARD:", deck[i]);
    
            }
        }
        console.log("SUIT AND VALUE:", value, suit);
        return null;
        //console.log("CARDFOUND:", cardFound);
        //return cardFound;
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

