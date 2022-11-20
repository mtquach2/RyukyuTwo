export class Instructions {
    constructor(p) {
        this.p5 = p;
        this.bg;
        this.buttonSelected;
        this.jpFont;
    }

    load() {
        this.bg = this.p5.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        this.buttonSelected = this.p5.loadImage("/static/UI/Buttons/ButtonBlankSelected.png");
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
    }

    instructionsScreen(width, height, scaleX, scaleY) {
        this.p5.imageMode(this.p5.CORNER);
        this.p5.background(this.bg);
        this.p5.textAlign(this.p5.CORNER);
    
        this.p5.fill(204, 97, 61);
        this.p5.textFont(this.jpFont, 64 * Math.min(scaleX, scaleY));
        this.p5.text("How to Play", width / 3 + width / 20, height / 5.5);
        this.p5.text("Controls", width / 3 + width / 13, height / 2.25);
        this.p5.text("Poker Key", width / 3 + width / 16, height / 1.35);
    
        this.p5.fill(70, 70, 70);
        this.p5.textFont(this.jpFont, 24 * Math.min(scaleX, scaleY));
        this.p5.text("Select a card from the bottom row of the 12 cards displayed at the top using the mouse. ", width / 6, height / 4.25);
        this.p5.text("Selected column will be traced in red.", width / 2.9, height / 3.65);
        this.p5.text("Once card has been selected, choose a column numbered 1-5 using the mouse.", width / 5, height / 3.15);
        this.p5.text("Get best poker hands to obtain clearpoint!", width / 3, height / 2.75);
        
        this.p5.text("Left Mouse Click -> Select", width / 2.6, height / 2);
        this.p5.text("Enter -> Button Press / Select Letter", width / 2.95, height / 1.85);
        this.p5.text("ESC -> Undo Card Select", width / 2.55, height / 1.73);
        this.p5.text("Backspace -> Undo Previous Move", width / 2.75, height / 1.63);
        this.p5.text("Spacebar -> Select Omikuji (Fortune) Box", width / 3, height / 1.53);
    
        this.p5.text("5K -> 5 of a Kind\t\tRF -> Royal Flush\t\tSF -> Straight Flush\t\t4K -> 4 of a Kind\t\tFH -> Full House", width / 12, height / 1.26);
        this.p5.text("ST -> Straight\t\tFL -> Flush\t\t3K -> 3 of a Kind\t\t2P -> 2 Pair\t\t1P -> Pair\t\tH -> Nothing", width / 8.75, height / 1.18);
    
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.buttonSelected, width / 2, height * .92, this.buttonSelected.width * scaleX, this.buttonSelected.height * scaleY);
    
        this.p5.stroke(255);
        this.p5.fill(255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.strokeWeight(1);
        this.p5.text("BEGIN GAME", width / 2.14, height * .92 + 5 * scaleY);

        return 8;
    }
    
    instructionsState(x, y, width, height, scaleX, scaleY) {
        if ((this.p5.keyIsPressed && this.p5.keyCode == 13) || ((width / 2 - 100 * scaleX) < x && x < (width / 2 + 200 * scaleX) && y > (height * .92 - 5 * scaleY) && y < (height * .92 + 50 * scaleY))) {
            // If Enter pressed, start game    
            return 1;
        }
        return 8;
    }
}