export class Timer {
  constructor() {
    this.seconds = 60;
    this.cardPlaced = false;
  }

  /**
   * Draws the words "timer:"
   * @param p instance of p5
   */
  drawTimer(p, w, h) {
    p.stroke(255, 0, 0);
    p.rect(w - w / 4.5, h / 5, w/5, h/10);
    p.stroke(255);
    p.textSize(20);
    p.text("timer:", w - w / 6, h / 4);
  }

  /**
   * Draws a countdown timer indicating to the player how many seconds are remaining
   * @param p instance of p5
   */
  drawSeconds(p, w, h) {
    p.stroke(255);
    p.textSize(20);
    p.text(this.seconds, w - w / 10, h / 4);
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