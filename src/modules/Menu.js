export class Menu {
    constructor(p, music) {
        this.p5 = p;

        this.mainMenuBackground;
        this.mainMenuButtonSelected;
        this.okinawaWindow;

        this.okinawaAmbient;
        this.menuSound;
        this.gameSound = music;

        this.jpFont;
    }

    load() {
        this.mainMenuBackground = this.p5.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        this.mainMenuButtonSelected = this.p5.loadImage("/static/UI/Buttons/ButtonBlankSelected.png");
        this.okinawaWindow = this.p5.loadImage("/static/UI/okinawaWindowAnimation.gif");

        this.okinawaAmbient = new Audio('/static/sounds/Ocean Waves Beach(Sound Effects)- SFX Producer (Vlog No Copyright Music).mp3');
        this.menuSound = new Audio('/static/sounds/gong.mp3');
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
    }

    menu(width, height, scaleX, scaleY) {
        this.okinawaAmbient.volume = .1;
        this.okinawaAmbient.play();

        // Background Image
        this.p5.imageMode(this.p5.CORNER);
        this.p5.background(this.mainMenuBackground);
    
        // Ryukyu text
        this.p5.textFont(this.jpFont, 256 * Math.min(scaleX, scaleY));
        this.p5.textAlign(this.p5.CENTER);
        this.p5.strokeWeight(8);
        this.p5.stroke(246, 198, 4);
        this.p5.fill(245, 67, 44);
        this.p5.text("琉", width / 4, height / 2);
        this.p5.text("球", width * .75, height / 2);
    
        // Gif of Okinawa through window
        // Image Source https://www.tsunagujapan.com/50-things-to-do-in-okinawa/
        this.p5.stroke(150, 75, 0);
        this.p5.noFill();
        this.p5.image(this.okinawaWindow, width / 3 - 5 * scaleX, height / 4, width / 3, height / 2);
        this.p5.rect(width / 3 - 5 * scaleX, height / 4, width / 3, height / 2);
    
        this.p5.strokeWeight(3);
        this.p5.stroke(87, 50, 14);
        this.p5.rect(width / 3 - 5 * scaleX, height / 4, width / 3, height / 2);
    
        // Start Button Image
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.mainMenuButtonSelected, width / 2, height * .8, this.mainMenuButtonSelected.width * scaleX, this.mainMenuButtonSelected.height * scaleY);
    
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(24 * Math.min(scaleX, scaleY));
        this.p5.strokeWeight(1);
        this.p5.textAlign(this.p5.CENTER, this.p5.BASELINE);
        this.p5.text("PRESS ENTER", width / 2, height * .8 + 5 * scaleY);

        return 0;
    }
    
    menuState(x, y, width, height, scaleX, scaleY) {
        if ((this.p5.keyIsPressed && this.p5.keyCode == 13) || ((width / 2 - 100 * scaleX) < x && x < (width / 2 + 200 * scaleX) && y > (height * .8 - 5 * scaleY) && y < (height * .8 + 50 * scaleY))) {
            // If Enter pressed, start game
            this.okinawaAmbient.pause();
    
            this.menuSound.volume = 0.3;
            this.menuSound.play();
    
            this.gameSound.volume = 0.1;
            this.gameSound.loop = true;
            this.gameSound.play();
            this.p5.textSize(20);
            
            console.log("Menu Click Transition");
            // Transition from menu to game 0 --> 1
            return 8;
        }
        
        return 0;
    }
}