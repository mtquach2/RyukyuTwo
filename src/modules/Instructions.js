export class Instructions {
    constructor(p, soundManager) {
        this.p5 = p;
        this.soundManager = soundManager;

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
        this.p5.text("Controls", width / 3 + width / 13, height / 2.15);
        this.p5.text("Poker Key", width / 3 + width / 16, height / 1.36);
    
        this.p5.fill(70, 70, 70);
        this.p5.textFont(this.jpFont, 22 * Math.min(scaleX, scaleY));
        this.p5.text("Select a card from the bottom row of the 12 cards displayed at the top using the mouse. ", width / 6, height / 4.25);
        this.p5.text("Selected column will be traced in red.", width / 2.9, height / 3.65);
        this.p5.text("Once card has been selected, choose a column numbered 1-5 using the mouse.", width / 5, height / 3.15);
        this.p5.text("Get best poker hands to obtain clearpoint!", width / 3, height / 2.75);
        
        this.p5.text("Left Mouse Click -> Select", width / 2.5, height / 1.95);
        this.p5.text("Enter -> Button Press / Select Letter", width / 2.75, height / 1.8);
        this.p5.text("Backspace -> Undo Previous Move / Undo Card Select", width / 3.25, height / 1.68);
        this.p5.text("Spacebar -> Select Omikuji (Fortune) Box", width / 2.8, height / 1.56);
    
        this.p5.text("5K -> 5 of a Kind\t\tRF -> Royal Flush\t\tSF -> Straight Flush\t\t4K -> 4 of a Kind\t\tFH -> Full House", width / 9, height / 1.25);
        this.p5.text("ST -> Straight\t\tFL -> Flush\t\t3K -> 3 of a Kind\t\t2P -> 2 Pair\t\t1P -> Pair\t\tH -> Nothing", width / 8, height / 1.18);
    
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.buttonSelected, width / 2, height * .92, this.buttonSelected.width * scaleX, this.buttonSelected.height * scaleY);
    
        this.p5.stroke(255);
        this.p5.fill(255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.strokeWeight(1);
        this.p5.text("BEGIN GAME", width / 2.16, height * .92 + 5 * scaleY);

        if ((this.p5.keyIsPressed && this.p5.keyCode == 13)) {
            this.p5.keyCode = 0;
            this.soundManager.pauseMenuTheme();
            // If Enter pressed, start game    
            return 1;
        }

        return 8;
    }
    
    instructionsState(x, y, width, height, scaleX, scaleY) {
        if ((width / 2 - 95 * scaleX) < x && x < (width / 2 + 90 * scaleX) && y > (height * .92 - 25 * scaleY) && y < (height * .92 + 30 * scaleY)) {
            this.soundManager.pauseMenuTheme();
            // If Enter pressed, start game    
            return 1;
        }

        return 8;
    }
}