import p5 from 'p5';
//import {Board} from '/src/modules/Board.js';

export class Timer{
  constructor() {
    this.seconds = 5;
    this.cardPlaced = false;
  
	}

  /**
   * Draws the words "timer:"
   * @param p instance of p5
   */
  drawTimer(p){
    p.stroke(255);
    p.textSize(20);
    p.text("timer:", 900, 200);
  }

  /**
   * Draws a countdown timer indicating to the player how many seconds are remaining
   * @param p instance of p5
   */
  drawSeconds(p){ 
    p.stroke(255);
    p.textSize(20);
    p.text(this.seconds, 960, 200);
    console.log("Seconds left:", this.seconds);
    if(this.cardPlaced == true || this.seconds == 0){
      if(this.cardPlaced == true){
        console.log("Card has been placed");
      }
      this.seconds = 5;
      this.cardPlaced = false;
    }
    this.seconds--;

  }

  resetTimer(){
    this.cardPlaced = true;
  }
}