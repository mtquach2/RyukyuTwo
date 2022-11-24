export class LeaderboardInput {
    constructor(p, score) {
        this.p5 = p;
        this.score = score;
        
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.name = "";
        this.letterSelector = 0;

        this.mainMenuBackground;
        this.animatedSelector;
        this.jpFont;

        this.lettersAccepted = 11;
    }

    load() {
        this.mainMenuBackground = this.p5.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        this.animatedSelector = this.p5.loadImage("/static/UI/selection2.gif");
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
    }

    selectorKeypress() {
        if (this.p5.keyIsPressed && this.p5.frameCount % 3 == 0) {
            if (this.p5.keyCode == this.p5.LEFT_ARROW) {
                if (this.letterSelector == 0 || this.letterSelector == 13) {
                    // Loops the row at the start
                    this.letterSelector += 12;
                }
                else {
                    // Back one character
                    this.letterSelector -= 1;
                }
            }
            else if (this.p5.keyCode == this.p5.UP_ARROW) {
                if (this.letterSelector < 13) {
                    // Goes down one row to the next character
                    this.letterSelector += 13;
                }
                else if (this.letterSelector == 26) {
                    // ENTER goes to the key above (R)
                    this.letterSelector = 17;
                }
                else if (this.letterSelector == 27) {
                    // DELETE goes to the key above (V)
                    this.letterSelector = 21;
                }
                else {
                    // Goes up 1 row
                    this.letterSelector -= 13;
                }
            }
            else if (this.p5.keyCode == this.p5.RIGHT_ARROW) {
                if (this.letterSelector == 12 || this.letterSelector == 25) {
                    // Loops the row at the end
                    this.letterSelector -= 12;
                }
                else if (this.letterSelector == 27) {
                    // DELETE goes to ENTER
                    this.letterSelector -= 1;
                }
                else {
                    this.letterSelector += 1;
                }
            }
            else if (this.p5.keyCode == this.p5.DOWN_ARROW) {
                if (this.letterSelector < 13) {
                    // Goes down one row to the next character
                    this.letterSelector += 13;
                }
                else if (this.letterSelector < 26) {
                    // Bottom row of letters set to ENTER
                    this.letterSelector = 26;
                }
            }
    
            if (this.p5.keyCode == this.p5.ENTER) {
                // Add Letter 
                if (this.letterSelector < 26 && this.name.length < this.lettersAccepted) {
                    this.name += this.letters[this.letterSelector];
                }
                // Enter Name
                else if (this.letterSelector == 26) {
                    if (this.name != "") {
                        this.score.addLeaderboard(this.name);
                        this.score.getDataframe();
                        this.name = "";
                    }

                    // Prevents keycode skipping the leaderboard view on next screen
                    this.p5.keyCode = 0;

                    // Progress to leaderboard/game over screen
                    return 7;
                }
                // Delete Letter
                else if (this.letterSelector == 27) {
                    this.name = this.name.slice(0, -1);
                }
            }
        }

        // Continue with the leaderboard text entry state
        return 4;
    }
    
    leaderboardEntry(width, height, scaleX, scaleY) {
        this.p5.background(this.mainMenuBackground);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.textFont(this.jpFont, 32 * Math.min(scaleX, scaleY));
    
        this.p5.strokeWeight(3);
        this.p5.stroke(204, 97, 61);
    
        // Character Display
        for (let i = 0; i < this.lettersAccepted; i++) {
            this.p5.rect(width / 2 - 240 * scaleX + i * 45 * scaleX, height / 4, 40 * scaleX, 1);
            this.p5.text(this.name[i], width / 2 - 240 * scaleX + i * 45 * scaleX, height / 4 - 45 * scaleY, 40 * scaleX, 40 * scaleY);
        }
    
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
    
        // First half of alphabet
        for (let i = 0; i < this.letters.length / 2; i++) {
            this.p5.text(this.letters[i], width / 3 + i * 40 * scaleX + 3, height / 2, 40 * scaleX, 40 * scaleY);
            if (i == this.letterSelector) {
                this.p5.image(this.animatedSelector, width / 3 + i * 40 * scaleX, height / 2, 40 * scaleX, 40 * scaleY);
            }
        }
    
        // Second half of alphabet
        for (let i = this.letters.length / 2; i < this.letters.length; i++) {
            this.p5.text(this.letters[i], width / 3 + (i - this.letters.length / 2) * 40 * scaleX + 3, height / 2 + 60 * scaleY, 40 * scaleX, 40 * scaleY);
            if (i == this.letterSelector) {
                this.p5.image(this.animatedSelector, width / 3 + (i - this.letters.length / 2) * 40 * scaleX, height / 2 + 60 * scaleY, 40 * scaleX, 40 * scaleY);
            }
        }
    
        this.p5.textFont("Helvetica");
    
        // Enter Button
        this.p5.text("↩️", width / 3 + 4 * 40 * scaleX, height / 2 + 120 * scaleY, 40 * scaleX, 40 * scaleY);
        if (this.letterSelector == 26) {
            this.p5.image(this.animatedSelector, width / 3 + 4 * 40 * scaleX, height / 2 + 120 * scaleY, 40 * scaleX, 40 * scaleY);
        }
    
        // Delete Button
        this.p5.text("❌", width / 3 + 8 * 40 * scaleX, height / 2 + 120 * scaleY, 40 * scaleX, 40 * scaleY);
        if (this.letterSelector == 27) {
            this.p5.image(this.animatedSelector, width / 3 + 8 * 40 * scaleX, height / 2 + 120 * scaleY, 40 * scaleX, 40 * scaleY);
        }
    
        return this.selectorKeypress();
    }
    
}