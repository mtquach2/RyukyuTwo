import { Card } from './Card';
import { Hand } from './Hand';

export class Board {
    constructor() { 
        this.xPositions = [230, 295, 360, 425, 490];
        this.yPositions = [59, 92, 125];
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

    addCard(column, card) {
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
    
    render(p) {
        // Draws the board, populates the card evaluation
        // TODO: Separate board outline/evaluation outline logic
        p.noFill();
        p.stroke(255, 0, 0);
        for (let i = 0; i < this.boardCols.length; i++) {
            let colHand = this.boardCols[i];
            let rowHand = this.boardRows[i];
            if (rowHand.rank != -1) { //squares for each row to display best hand in row
                p.rect(130, 310 + i * 65, 40, 40);
                p.text(`${this.rankTable[rowHand.rank]}`, 145, 325 + i * 65, 20, 20);
            }
            if (colHand.rank != -1) { //squares for each col to display best hand in col
                p.rect(215 + i * 65, 650, 40, 40);
                p.text(`${this.rankTable[colHand.rank]}`, 230 + i * 65, 665, 20, 20);
            }
            for (let j = 0; j < this.boardRows.length; j++) {
                // Create rectangle border
                p.rect(200 + i * 65, 300 + j * 65, 65, 65); //makes a visible 1x5 array for each of the 5 rows 
                
                
                colHand.showCard(j, 200 + i * 65, 300 + j * 65, p); //displays a card throughout each col starting from the bottom left square going up 
            }
        }
    }
    /**
     * Creates a 1x4 array/rectangle and displays cards to use for game
     * @param p p5 instance
     * @param displayMap map of deck split in 4 equal parts pre-shuffled
     */
    renderTopDisplay(p, displayMap) {
        p.noFill();
        p.stroke(0, 0, 255);
        for (let index = 0; index < 4; index++) {
            for (let i = 0; i < 3; i++) {
                p.rect(230 + index * 65, this.yPositions[i], 65, 65);
            }       
        }
        for (let x = 0; x < 5; x++) {
            p.rect(200 + x * 65, 200, 65, 65);
        }
    }
    /**
     * Function used to check to see if a specific card/column is clicked 
     * then updates the card being displayed in that column
     * @param px where our mouse's x-axis is at
     * @param displayMap map for deck of cards
     * @param p p5 instance 
     */
    clicked(px, displayMap, p) {
        for (let i = 0; i < 4; i++) {
            if (px >= this.xPositions[i] && px < this.xPositions[i + 1] && this.counts[i] > 0) {
                this.currentCard = displayMap.get(i)[this.counts[i]];
                displayMap.get(i)[this.counts[i]].showImage(330, 200, p);
                this.counts[i]--;
                displayMap.get(i)[this.counts[i]].showImage(295, 125, p);
            }
        }
    }

    isFull(index) {
        return index < 5 && this.boardCols[index].isFull(); //checks to see if column is full 
    }
    /**
     * Displays the first set of cards in the top display
     * @param displayMap map for split deck of cards
     * @param p p5 instance 
     */
    initCards(displayMap, p) {
        for (let i = 0; i < 4; i++) {
            let offset = -2;
            for (let l = 0; l < 3; l++) {
                if ((this.counts[i] - 2) >= 0) {
                    displayMap.get(i)[this.counts[i] + offset].showImage(this.xPositions[i], this.yPositions[l], p);
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
			let bounds = p.constrain(p.mouseX, 200, 460);
			this.currentCard.showImage(bounds, 200, p); 
		}
	}

    /**
     * Displays selected card into the clicked column 
     * @param p 
     */
    chooseCol(p) { //TODO figure out better way to do this
        if (this.col < 5 && p.mouseX >= 200 && p.mouseX < 265) {
			this.col = 0;
		}
		else if (this.col < 5 && p.mouseX >= 265 && p.mouseX < 330) {
			this.col = 1;
		}
		else if (this.col < 5 && p.mouseX >= 330 && p.mouseX < 395) {
			this.col = 2;
		}
		else if (this.col < 5 && p.mouseX >= 395 && p.mouseX < 460) {
			this.col = 3;
		}
		else if (this.col < 5 && p.mouseX >= 460 && p.mouseX < 525) {
			this.col = 4;
		}
		this.addCard(this.col, this.currentCard);
		this.currentCard = null; 
    } //TODO maybe include game over boolean? while the game isn't over see what column was clicked?
}