import p5 from 'p5';
import {Board} from '/src/modules/Board.js';

//should the timer class take care of the card dropping to the board???

/*
If card has not been selected, it will select the card at which the cursor is pointed at and drop it in the middle column

If middle column is full it will first drop card in 2nd column and then 4th (interchange until full) and then drop card in 1st column and then 5th (interchange until full)

3rd->(2nd->4th, 4th->2nd)->(1st->5th, 5th->1st)

-have a variable to keep track of when a card is dropped
  -timer should stop when card is dropped vs in the board bc there may be delay in animation?
  -timer resets back to 60 seconds after card is on the board? or after drop?
-if card is not dropped yet & timer runs out(card can be in the row selection or has not been picked yet)
  -drop it in the row given the rules above
  -3rd->(2nd->4th, 4th->2nd)->(1st->5th, 5th->1st)

*/
let board;
let x = false; //need to rename
let y = false; //need to rename

export class Timer{
  constructor(board){
    this.board = board;
  }

  // setInterval(() => {
  //   settimeout()
  // }, interval);

  //fix
  cardDropColumn(card){
    //checking if the top row has space (if top row has space there could be space below as well)
    //if 3rd column is not completely filled; drop card in 3rd column
    if(board[2][4] == null){
      cardDropRow(2, card);
    }
    else if(board[1][4] == null && board[3][4] == null){ //if both 2nd and 4th column empty, interchange
      if(x == false){ //2nd column should go first
        cardDropRow(1, card);
        x = true;
      }
      else{ //if card was just placd in 2nd column, then go to 4th column
        cardDropRow(3, card);
        x = false;
      }
    }
    else if(board[0][4] == null && board[4][4] == null){
      if(y = false){ //1st column should go first
        cardDropRow(0, card);
        y = true;
      }
      else{ //if card was just placed in 1st column, then go to the 5th column
        cardDropRow(0, card);
        y = true;
      }
    }
    // else if(){
    //   //more cases
    // }
  }

  cardDropRow(column, card){
    for(i = 4; i >= 0; i--){ //working from the bottom of the board up?
      if(board[column][i] == null){ //if that slot is empty put card there
        board[column][i] = card;
      }
    }
  }

}

