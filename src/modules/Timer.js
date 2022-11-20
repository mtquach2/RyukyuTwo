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

    /**
     * Draws the timer display
     * @param w the width of the display
     * @param h the height of the display
     * @param scaleX the x value for scaling
     * @param scaleY the y value for scaling
     */
    drawTimer(w, h, scaleX, scaleY) {
        this.p5.textFont(this.jpFont);
        this.p5.image(this.paperFrameLong, w - w / 4.5, h / 5 + h / 30, w / 5, h / 15);

        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.text("TIMER", w - w / 6, h / 5 + h / 15);
    }

    /**
     * Draws a countdown timer indicating to the player how many seconds are remaining
     */
    drawSeconds(w, h, scaleX, scaleY) {
        this.p5.textFont(this.jpFont);
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(20 * Math.min(scaleX, scaleY));
        this.p5.text(this.seconds, w - w / 15, h / 5 + h / 15);
        if (this.cardPlaced == true || this.seconds == 0) {
            this.seconds = 60;
            this.cardPlaced = false;
        }
    }

    /**
     * Countdown the seconds
     */
    countDown() {
        this.seconds--;
    }

    /**
     * Resets the timer
     */
    resetTimer() {
        this.seconds = 60;
    }
}