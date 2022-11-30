export class Timer {
    constructor(p) {
        this.p5 = p;
        this.seconds = 60;
        this.cardPlaced = false;
        this.jpFont;
        this.paperFrameLong;
    }

    load() {
        this.jpFont = this.p5.loadFont("/static/fonts/jackeyfont.ttf");
        this.paperFrameLong = this.p5.loadImage("/static/UI/paperStrip.png");
    }

    drawTimer(width, height, scaleX, scaleY) {
        // Makes timer ui
        this.p5.textFont(this.jpFont);
        this.p5.image(this.paperFrameLong, width - width / 4.5, height / 4 + height / 30, width / 5, height / 15);

        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.text("TIMER", width - width / 6, height / 4 + height / 15);
    }

    drawSeconds(width, height, scaleX, scaleY) {
        // Displays countdown timer 
        this.p5.textFont(this.jpFont);
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.text(this.seconds, width - width / 15, height / 4 + height / 15);
        if (this.cardPlaced == true || this.seconds == 0) {
            this.seconds = 60;
            this.cardPlaced = false;
        }
    }

    countDown() {
        this.seconds--;
    }

    resetTimer() {
        this.cardPlaced = true;
    }
}