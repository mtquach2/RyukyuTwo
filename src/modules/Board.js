import { Card } from './Card';
import { Hand } from './Hand';

export class Board {
    constructor() {
        this.count1 = 12;
        this.count2 = 12;
        this.count3 = 12;
        this.count4 = 12; 
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
        for (let i = 0; i < 4; i++) {
            p.rect(230 + i * 65, 125, 65, 65); 
        }
        for (let x = 0; x < 5; x++) {
            p.rect(200 + x * 65, 200, 65, 65);
        }
        displayMap.get(0)[this.count1].showImage(230, 125, p);
        displayMap.get(1)[this.count2].showImage(295, 125, p);
        displayMap.get(2)[this.count3].showImage(360, 125, p); 
        displayMap.get(3)[this.count4].showImage(425, 125, p);
    }
    /**
     * Function used to check to see if a specific card/column is clicked 
     * then updates the card being displayed in that column
     * @param px where our mouse's x-axis is at
     * @param displayMap map for deck of cards
     * @param p p5 instance 
     */
    clicked(px, displayMap, p) {
        let currentCard;
        if (px >= 230 && px < 295 && this.count1 > 0) {
            currentCard = displayMap.get(0)[this.count1];
            displayMap.get(0)[this.count1].showImage(330, 200, p); //displays card into column selection
            this.count1--;
            displayMap.get(0)[this.count1].showImage(230, 125, p); //updates card shown in topDisplay
        }
        else if (px >= 295 && px < 360 && this.count2 > 0) {
            currentCard = displayMap.get(1)[this.count2];
            displayMap.get(1)[this.count2].showImage(330, 200, p); 
            this.count2--;
            displayMap.get(1)[this.count2].showImage(295, 125, p);
        }
        else if (px >= 360 && px < 425 && this.count3 > 0) {
            currentCard = displayMap.get(2)[this.count3];
            displayMap.get(2)[this.count3].showImage(330, 200, p); 
            this.count3--;
            displayMap.get(2)[this.count3].showImage(360, 125, p);
        }
        else if (px >= 425 && px < 490 && this.count4 > 0) {
            currentCard = displayMap.get(3)[this.count4];
            displayMap.get(3)[this.count4].showImage(330, 200, p); 
            this.count4--;
            displayMap.get(3)[this.count4].showImage(425, 125, p);
        }
        return currentCard;
    } //TODO if we click somewhere that is not a card we get an error from return statement

    isFull(index) {
        return index < 5 && this.boardCols[index].isFull(); //checks to see if column is full 
    }
}