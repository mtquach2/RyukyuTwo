export class Menu {
    constructor(p, soundManager) {
        this.p5 = p;
        this.soundManager = soundManager;

        this.mainMenuBackground;
        this.mainMenuButtonSelected;
        this.okinawaWindow;

        this.jpFont;
    }

    load() {
        this.mainMenuBackground = this.p5.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        this.mainMenuButtonSelected = this.p5.loadImage("/static/UI/Buttons/ButtonBlankSelected.png");
        this.okinawaWindow = this.p5.loadImage("/static/UI/okinawa_ishigaki_island.gif");
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
    }

    menu(width, height, scaleX, scaleY) {
        this.soundManager.playMenuTheme();

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
        this.p5.text("球", width * .75 + 16 * scaleX, height / 2);
    
        // Gif of Okinawa's Ishigaki Island through window
        // Image Source https://www.flickr.com/photos/125983633@N03/28510273280/in/album-72157671855774675/
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
        
        if ((this.p5.keyIsPressed && this.p5.keyCode == 13)) {
            this.p5.keyCode = 0;
            this.soundManager.playGong();
            
            this.p5.textSize(20);
            // Transition from menu to game 0 --> 1
            return 8;
        }

        return 0;
    }
    
    menuState(x, y, width, height, scaleX, scaleY) {
        if ((width / 2 - 95 * scaleX) < x && x < (width / 2 + 90 * scaleX) && y > (height * .8 - 30 * scaleY) && y < (height * .8 + 30 * scaleY)) {
            this.soundManager.playGong();
            
            this.p5.textSize(20);
            // Transition from menu to game 0 --> 1
            return 8; 
        }
        
        return 0;
    }
}