import { Card } from './Card';
import { Hand } from './Hand';

export class Board {
    constructor() {
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
                p.rect(40, 100 + i * 65, 40, 40);
                p.text(`${this.rankTable[rowHand.rank]}`, 50, 110 + i * 65, 20, 20);
            }
            if (colHand.rank != -1) { //squares for each col to display best hand in col
                p.rect(115 + i * 65, 450, 40, 40);
                p.text(`${this.rankTable[colHand.rank]}`, 125 + i * 65, 460, 20, 20);
            }
            for (let j = 0; j < this.boardRows.length; j++) {
                // Create rectangle border
                p.rect(100 + i * 65, 100 + j * 65, 65, 65); //makes a visible 1x5 array for each of the 5 rows 
                
                
                colHand.showCard(j, 100 + i * 65, 100 + j * 65, p); //displays a card throughout each col starting from the bottom left square going up 
            }
        }
    }

    renderTopDisplay(p, displayMap, count) {
        p.noFill();
        p.stroke(0, 0, 255);
        let x = 0;
        while (x < 4) {
            p.rect(135 + x * 65, 10, 65, 65);
            displayMap.get(x)[count].showImage(135 + x * 65, 10, p);
            x++;
            //TODO Store x axis from showImage()
                //so that we can see if x is equal to mouseX 
                //y axis is always 10 so check if mouseY is at 10
                //if x-axis == mouseX 
                    //reverse math to get x variable and decrement count from that x var
        } //TODO store card that was from previous count (card that was clicked) so we can move it 
        
    }

    clicked() {

    }
    isFull(index) {
        return index < 5 && this.boardCols[index].isFull(); //checks to see if column is full 
    }
}