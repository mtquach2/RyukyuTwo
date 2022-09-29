/*
If card has not been selected, it will select the card at which the cursor is pointed at and drop it in the middle column

If middle column is full it will first drop card in 2nd column and then 4th (interchange until full) and then drop card in 1st column and then 5th (interchange until full)

3rd->(2nd->4th, 4th->2nd)->(1st->5th, 5th->1st)
*/

import {Board} from '/src/modules/Board.js';

//should the timer class take care of the card dropping to the board???

class Timer{
  constructor(board){
    this.board = board
  }
}

export default Timer