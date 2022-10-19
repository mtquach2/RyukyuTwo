export class Timer {
  constructor() {
    this.seconds = 60;
    this.cardPlaced = false;
  }

  /**
   * Draws the words "timer:"
   * @param p instance of p5
   */
  drawTimer(p) {
    p.stroke(255);
    p.textSize(20);
    p.text("timer:", 900, 200);
  }

  /**
   * Draws a countdown timer indicating to the player how many seconds are remaining
   * @param p instance of p5
   */
  drawSeconds(p) {
    p.stroke(255);
    p.textSize(20);
    p.text(this.seconds, 960, 200);
    if (this.cardPlaced == true || this.seconds == 0) {
      this.seconds = 60;
      this.cardPlaced = false;
    }
    this.seconds--;
  }

  resetTimer() {
    this.cardPlaced = true;
  }
}