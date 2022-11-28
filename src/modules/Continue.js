export class Continue {
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
        this.jpFont = this.p5.loadFont("/static/fonts/jackeyfont.ttf");
    }

    continueScreen(width, height, scaleX, scaleY) {
        this.p5.imageMode(this.p5.CORNER);
        this.p5.background(this.bg);
    
        // Render Continue? screen after lost game 
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.textFont(this.jpFont, 64 * Math.min(scaleX, scaleY));
        this.p5.text("CONTINUE?", width / 2, height / 3);
    
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    
        // NO button
        this.p5.image(this.buttonSelected, width / 2 + width / 10, height / 2, 200 * scaleX, 100 * scaleY);
    
        // YES button
        this.p5.image(this.buttonSelected, width / 3 - width / 25, height / 2, 200 * scaleX, 100 * scaleY);
    
        this.p5.stroke(0, 0, 0)
        this.p5.fill(255, 255, 255);
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
        this.p5.text("YES", width / 3 - width / 25 + 40 * scaleX, height / 2 + 50 * scaleY);
        this.p5.text("NO", width / 2 + width / 10 + 55 * scaleX, height / 2 + 50 * scaleY);

        return 2;
    }
    
    continueScreenStates(width, height, x, y, scaleX, scaleY) {
        // Function for P5 mouseClicked and cont()
        if ((width / 3 - width / 25 + 2 * scaleX) < x && x < (width / 3 - width / 25 + 200 * scaleX) && height / 2 < y && y < height / 2 + 100 * scaleY) {
            // If YES button is clicked, omikuji
            this.soundManager.resetGameTheme();
            return 3;
        }
        if ((width / 2 + width / 10 + 5 * scaleX) < x && x < (width / 2 + width / 10 + 200 * scaleX) && height / 2 < y && y < height / 2 + 100 * scaleY) {
            // If NO button is clicked, prompt to get name for leaderboard
            this.soundManager.resetGameTheme();
            return 4;
        }

        return 2;
    }
}