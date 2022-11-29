export class Omikuji {
    constructor(p, score, soundManager) {
        this.p5 = p;
        this.score = score;
        this.soundManager = soundManager;
        
        this.selectedOmikuji = 0;
        this.selected = false;
        this.frameDelay = 300;
        this.blessingScore;

        this.omikujiValues = Array.from({ length: 16 }, () => Math.round((Math.random() * 2000) / 500) * 500);
        this.omikujiTable = {
            0: "凶",
            500: "半吉",
            1000: "小吉",
            1500: "吉",
            2000: "大吉",
        };
        this.omikujiTranslation = {
            "凶": "Misfortune,\n+0 bonus points",
            "半吉": "Half Blessing,\n+500 bonus points",
            "小吉": "Small Blessing,\n+1000 bonus points",
            "吉": "Blessing,\n+1500 bonus points",
            "大吉": "Great Blessing,\n+2000 bonus points",
        };
    
        this.jpFont;
        this.stopButton;
    }

    load() {
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
        this.stopButton = this.p5.loadImage("/static/UI/Buttons/Icon_SquareStraight.png");
    }

    renderTitle(width, height, scaleX, scaleY) {
        // Render the 琉球おみくじ in red at the top
        this.p5.strokeWeight(1);
        this.p5.stroke(201, 32, 10);
        this.p5.fill(245, 67, 44);
        this.p5.rect(width / 3, 40 * scaleY, width / 3, height / 8);
        this.p5.stroke(246, 198, 4);
        this.p5.fill(246, 198, 4);
        this.p5.textSize(58 * Math.min(scaleX, scaleY));
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.text("琉球おみくじ", width / 3, 40 * scaleY, width / 3, height / 8);
    }

    renderBoxes(width, height, scaleX, scaleY) {
        this.p5.stroke(246, 198, 4);
        this.p5.fill(255, 255, 255);
        this.p5.strokeWeight(4);

        for (let i = 0; i < 16; i++) {
            if (this.selectedOmikuji == i) {
                this.p5.stroke(255, 0, 0);
            }

            if (i < 8) {
                this.p5.rect(width / 4 + i * 91 * scaleX, height / 3, 80 * scaleX, 80 * scaleY);
            }
            else {
                this.p5.rect(width / 4 + (15 - i) * 91 * scaleX, height / 3 + 90 * scaleY, 80 * scaleX, 80 * scaleY);
            }

            this.p5.stroke(246, 198, 4);
        }
    }

    renderInstructions(width, height, scaleX, scaleY) {
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 153, 255);
        this.p5.fill(0, 51, 153);
        this.p5.textSize(58 * Math.min(scaleX, scaleY));
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
        this.p5.text("おみくじを引いてください。", width / 4, height / 3 + 90 * scaleY + 200 * scaleY);
        this.p5.text("(Press Spacebar or Stop Button to Select)", width / 7.5, height / 3 + 90 * scaleY + 300 * scaleY);
    }

    omikuji(level, width, height, scaleX, scaleY) {
        this.soundManager.playOmikujiTheme();
        this.soundManager.playOmikujiSpinner(this.selected);

        this.p5.textFont(this.jpFont);
        this.renderTitle(width, height, scaleX, scaleY);
        this.renderBoxes(width, height, scaleX, scaleY);

        this.p5.image(this.stopButton, width * 0.8, height * 0.6, 80 * scaleX, 80 * scaleY);
        this.p5.stroke(255, 0, 0);
        this.p5.textSize(24 * Math.min(scaleX, scaleY));
        this.p5.text("STOP", width * 0.83, height * 0.65);

        // Spacebar pressed, box was selected
        if (this.p5.keyIsPressed && this.p5.keyCode == 32 && this.selectedOmikuji < 16) {
            this.selected = true;
            this.soundManager.pauseOmikujiSpinner();
        }

        // Spacebar pressed, start a 5 second timer so player can see blessing, change state by returning the new state;
        if (this.selected) {
            this.frameDelay--;
            const blessingScore = this.omikujiValues[this.selectedOmikuji];
            const blessingText = this.omikujiTable[blessingScore];
            this.blessingScore = blessingScore;

            this.p5.strokeWeight(8);
            this.p5.stroke(0, 0, 0);
            this.p5.textSize(36 * Math.min(scaleX, scaleY));
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
            if (this.selectedOmikuji < 8) {
                this.p5.text(blessingText, width / 4 + this.selectedOmikuji * 91 * scaleX, height / 3, 80 * scaleX, 80 * scaleY);
            }
            else {
                this.p5.text(blessingText, width / 4 + (15 - this.selectedOmikuji) * 91 * scaleX, height / 3 + 90 * scaleY, 80 * scaleX, 80 * scaleY);
            }

            this.p5.strokeWeight(3);
            this.p5.stroke(0, 153, 255);
            this.p5.fill(0, 51, 153);
            this.p5.textSize(58 * Math.min(scaleX, scaleY));
            this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
            this.p5.text(`${blessingText} - ${this.omikujiTranslation[blessingText]}`, width / 4, height / 3 + 90 * scaleY + 200 * scaleY);

            if (this.frameDelay <= 0) {
                this.soundManager.pauseOmikujiTheme();
                this.score.setClearPoint(level, blessingScore);
                this.selectedOmikuji = 0;
                this.selected = false;
                this.frameDelay = 300;

                // Transition state
                return 6;
            }
        }
        else {
            this.renderInstructions(width, height, scaleX, scaleY);
        }

        if (!this.selected && this.p5.frameCount % 5 == 0) {
            this.selectedOmikuji = this.selectedOmikuji < 16 ? ++this.selectedOmikuji : 0;
        }

        // Continue Omikuji
        return 3;
    }

    static getBonus() {
        return this.blessingScore;
    }

    omikujiState(x, y, width, height, scaleX, scaleY) {
        if (((width * 0.8) < x && x < (width * 0.8 + 80 * scaleX) && y > (height * 0.6) && y < (height * 0.6 + 80 * scaleY))) {
            this.selected = true;
            this.soundManager.pauseOmikujiSpinner();
        } 
    }
}