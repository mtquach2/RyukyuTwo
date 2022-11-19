export class GameOver {
    constructor(p, score, music) {
        this.p5 = p;

        this.score = score;

        this.gameSound = music;
        this.gameOverSound;
        this.jpFont;
        this.mainMenuButtonSelected;
    }

    load() {
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
        this.gameOverSound = new Audio('/static/sounds/gameover.mp3');
        this.mainMenuButtonSelected = this.p5.loadImage("/static/UI/Buttons/ButtonBlankSelected.png");
    }
    
    gameOver(width, height, scaleX, scaleY) {
        this.gameSound.pause();
        this.gameSound.currentTime = 0;

        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);

        //Displays leaderboard
        this.p5.textFont(this.jpFont, 96 * Math.min(scaleX, scaleY));
        this.p5.text("LEADERBOARD", width / 2, height / 10);
        this.score.renderLeaderboard();

        // Main Menu
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.mainMenuButtonSelected, width / 2, height * .8);

        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(16);
        this.p5.strokeWeight(1);
        this.p5.textAlign(this.p5.CENTER, this.p5.BASELINE);
        this.p5.text("ENTER FOR MENU", width / 2, height * .8 + 5);

        return 7;
    }

    gameOverState(x, y, width, height, scaleX, scaleY) {
        this.gameOverSound.play();
        if ((this.p5.keyIsPressed && this.p5.keyCode == 13) || ((width / 2 - 100 * scaleX) < x && x < (width / 2 + 200 * scaleX) && y > (height * .8 - 5 * scaleY) && y < (height * .8 + 50 * scaleY))) {
            this.p5.keyCode = 0;

            // Transition from the GameOver to Menu 7 --> 0
            return -1;
        }

        // Continue with the GameOver
        return 7;
    }
}