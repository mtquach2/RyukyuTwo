import { Hand } from './Hand';

export class Board {
    constructor() { 
        this.counts = [12, 12, 12, 12];
        this.currentCard;
        this.col = 0; 
        this.boardCols = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardRows = [new Hand(), new Hand(), new Hand(), new Hand(), new Hand()];
        this.boardDiag = [new Hand(), new Hand()];
        this.rankTable = {
            1:'5K',
			2:'RSF',
			3:'SF',
			4:'4K',
			5:'FH',
			6:'ST',
			7:'FL',
			8:'3K',
			9:'2P',
			10:'1P',
			11:'H',
        }
    }
    boardX = 0;
    boardY = 0;
    xPositions = [];
    yPositions = [];

    addCard(column, card) {
        if (card == null) {
            return;
        }

        if (!this.boardCols[column].isFull()) {
            const row = this.boardCols[column].addCard(card);
            this.boardRows[row].addCard(card);

            // Major Diagonal
            if (row == column) {
                this.boardDiag[0].addCard(card);
            }

            // TODO: Test reverse diagonal
        }
    }
    
    render(p, displayMap, w, h) {
        this.boardX = w / 3;
        this.boardY = h / 3;

        for (let x = 4; x >= 0; x--) {
            this.xPositions[x] = this.boardX + 33 + 65 * (x + 1);
        }

        for (let y = 2; y >= 0; y--) {
            this.yPositions[y] = this.boardY/2 - 33 * y;
        }

        this.renderBoard(p);
		this.renderBoardCards(p);
		this.renderTopDisplay(p, displayMap);
    }

    renderBoardCards(p) {
        // Populates the card evaluation
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];
            if (rowHand.rank != -1) { // Display rank for hands (rows)
                p.text(`${this.rankTable[rowHand.rank]}`, this.boardX + 10, this.boardY + (i + 1) * 65 + 10, 20, 20);
            }
            if (colHand.rank != -1) { // Display rank for hands (columns)
                p.text(`${this.rankTable[colHand.rank]}`, this.boardX + (i + 1) * 67.5 + 10, this.boardY * 2.5 + 32.5, 20, 20);
            }
            for (let j = 0; j < this.boardRows.length; j++) {            
                colHand.showCard(j, this.boardX + (i + 1) * 65, this.boardY + (j + 1) * 65, p); //displays a card throughout each col starting from the bottom left square going up 
            }
        }
    }

    renderBoard(p) {
        // Draws the board outlines
        p.noFill();
        p.stroke(255, 0, 0);
        for (let i = 0; i < this.boardCols.length; i++) {
            p.rect(this.boardX, this.boardY + (i + 1) * 65, 40, 40); // Rank box for rows
            p.rect(this.boardX + (i + 1) * 65 + 10, this.boardY * 2.5 + 20, 40, 40); // Rank box for cols

            for (let j = 0; j < this.boardRows.length; j++) {     
                p.rect(this.boardX + (i + 1) * 65, this.boardY + (j + 1) * 65, 65, 65); // Board
            }
        }
    }

    /**
     * Creates a 1x4 array/rectangle and displays cards to use for game
     * @param p p5 instance
     */
    renderTopDisplay(p) {
        p.noFill();
        p.stroke(0, 0, 255);
        for (let i = 0; i < 4; i++) {
            for (let y = 0; y < 3; y++) {
                p.rect(this.boardX + (i + 1) * 65 + 65/2, this.yPositions[y], 65, 65); //top display
            }       
        }
        for (let i = 0; i < 5; i++) {
            p.rect(this.boardX + (i + 1) * 65, this.boardY - 65, 65, 65); //1x5 array
        }
    }

    /**
     * Method used to check to see if a specific card from the top display was clicked
     * then updates the top display and displays it in 1x5 array for column choosing
     * @param px where our mouse's x-axis is at
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

    /**
     * Displays cards in the top display
     * @param p p5 instance 
     * @param displayMap map for split deck of cards
     */
    initCards(p, displayMap) {
        for (let i = 0; i < 4; i++) {
            let offset = -2;
            for (let l = 0; l < 3; l++) {
                if ((this.counts[i] + offset) >= 0) {
                    displayMap.get(i)[this.counts[i] + offset].showImage(this.xPositions[i], this.yPositions[2 - l], p);
                }
                offset++;
            }
        } 
    }

    /**
     * Displays card selected from top display into 1x5 array
     * Moves with mouse's x-axis
     * @param mouseWasClicked boolean to check to see if a card was previously selected
     * @param p p5 instance
     */
    displayCard(mouseWasClicked, p) {
		if (mouseWasClicked == true && this.currentCard != null) { 
			let bounds = p.constrain(p.mouseX, this.boardX + 65, this.boardX + 65 * 5);
			this.currentCard.showImage(bounds, this.boardY - 65, p); 
		}
	}

    /**
     * Displays selected card into the clicked column 
     * @param p 
     */
    chooseCol(py, p) {
        if (py >= this.boardY - 65 && py < this.boardY) {
            for (let col = 0; col < 5; col++) {
                if (p.mouseX >= this.boardX + (col + 1) * 65 && p.mouseX < this.boardX + (col + 2) * 65) {
                    this.col = col;
                    break;
                }
            }
            if (this.col != -1 && !this.boardCols[this.col].isFull()) {
                this.addCard(this.col, this.currentCard);
                this.currentCard = null; 
            }

            this.col = -1;
        }
    }
}