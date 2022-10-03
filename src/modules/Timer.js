import p5 from 'p5';
import {Board} from '/src/modules/Board.js';

//How will this Timer class be called?

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
let notDropped;
let x = false; //need to rename
let y = false; //need to rename
let timer = 60000; //60 seconds
let interval;

export class Timer{
  constructor(board, notDropped){
    this.board = board;
    this.notDropped = notDropped; //if card has not been dropped then timer should start???
    //there will be a "lag", player can not drop RIGHT AWAY? so notDropped will always be true?
  }

  // setInterval(() => {
  //   settimeout()
  // }, interval);
  
  /*
    Every 60 seconds, call cardDropColumn()
      -This means that a player has not yet selected + dropped a card
    How to figure out if a card has been dropped?
    Should this be an issue to fix within Timer or Game?

    TODO: How to reset timer if a card is dropped before reaching 60 seconds.
  */
  while(notDropped){
    interval = setInterval(cardDropColumn,timer);
  }
  //or
  /*
  if(notDropped){ 
    interval = setInterval(cardDropColumn, timer);
  }
  else{ //if someone drops a card before timer runs out???
    notDropped = false;
    clearInterval(interval);
  }
  */


  //have to clean up/not brute force it
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
    else if(board[1][4] == null){
      cardDropRow(1, card);
    }
    else if(board[3][4] == null){
      cardDropRow(3, card);
    }
    else if(board[0][4] == null){
      cardDropRow(0, card);
    }
    else if(board[4][4] == null){
      cardDropRow(4, card);
    }

    /*
    while(notDropped){
      i = 2;
      //have i-- or i++ if a row is full? or something
      //hop between columns instead of having so many if statements?
    }
    */
  }

  /*
    Puts a card on the board after the 60 seconds of timer has passed, but what if it has not passed yet?
  */
  cardDropRow(column, card){
    for(i = 4; i >= 0; i--){ //working from the bottom of the board up?
      if(board[column][i] == null){ //if that slot is empty put card there
        board[column][i] = card;
        notDropped = false;
        clearInterval(interval); //reset the timer?

        
      }
    }
  }

}

