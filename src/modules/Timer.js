export class Timer {
  constructor(p5) {
    this.p5 = p5
    this.seconds = 60;
    this.cardPlaced = false;
  }

  /**
   * Displays timer 
   */
  drawTimer(w, h, scaleX, scaleY) {
    this.p5.stroke(255, 0, 0);
    this.p5.noFill();
    this.p5.rect(w - w / 4.5, h / 5 + h / 30, w / 5, h / 15);
    this.p5.stroke(255);
    this.p5.textSize(20 * Math.min(scaleX, scaleY));
    this.p5.text("TIMER:", w - w / 6, h / 5 + h / 15);
  }

  /**
   * Draws a countdown timer indicating to the player how many seconds are remaining
   */

  drawSeconds(w, h, scaleX, scaleY) {
    this.p5.stroke(255);
    this.p5.textSize(20 * Math.min(scaleX, scaleY));
    this.p5.text(this.seconds, w - w / 15, h / 5 + h / 15);
    if (this.cardPlaced == true || this.seconds == 0) {
      if (this.cardPlaced == true) {
        console.log("Card has been placed");
      }
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