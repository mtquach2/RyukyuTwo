import p5 from 'p5';
import { Board } from './Board';
import { Timer } from './Timer';
import { Score } from './Score';
import { Game } from './Game';


export function getWindow() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { w: x, h: y };
}

const GM = {
    setup: () => { },
    draw: () => { },
    mouseClicked: (x, y) => { },
    keyPressed: (keyCode, BACKSPACE, ESCAPE) => { }
}

const p = new p5(p => {
    p.setup = function setup() {
        const windowSize = getWindow();
        p.createCanvas(windowSize.w, windowSize.h);
        GM.setup();
    };

    p.draw = function () {
        const windowSize = getWindow();
        p.background(0);
        GM.draw(windowSize.w, windowSize.h);
    };

    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY);
    };

    p.keyPressed = function keyPressed(){
        GM.keyPressed(p.keyCode, p.BACKSPACE, p.ESCAPE);
    }
});

let score = new Score(p);
let timer = new Timer(p);
let board = new Board(p, timer);

const game = new Game(p, board, score, timer);

function resetGame(state) {
    board = new Board(p, timer);
    let bonus = 0;

    if (state == 2) {
        game.level++;
        score.updateTotalScore();
        bonus = 1500;
    }
    else {
        game.level = 1;
    }

    score.resetScore();

    console.log("NEW GAME");
    console.log("Level to " + game.level + " with bonus " + bonus);
    score.setClearPoint(game.level, bonus);
    board.loadCardsLeft();
    board.loadJPFont();
    game.board = board;
    game.setState(1);
}

function menu(width, height) {
    // TODO: Implement main menu but better
    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.rect(width/3, height/3, 400, 150);

    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.textSize(64);
    p.text("CLICK TO PLAY GAME", width/3, height/3, 400, 150);

    if (p.mouseIsPressed) {
        if (width/3 < p.mouseX && p.mouseX < width/3 + 400 && height/3 < p.mouseY && p.mouseY < height/3 + 150) {
            p.textSize(20);
            game.setState(1);
        }
    }
}

function omikuji(width, height) {
    // TODO: Implement omikuji selection an score update
    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.rect(width/3, height/3, 400, 400);

    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.textSize(64);
    p.text("OMIKUJI, CLICK FOR 1500 BONUS", width/3, height/3, 400, 400);

    if (p.mouseIsPressed) {
        if (width/3 < p.mouseX && p.mouseX < width/3 + 400 && height/3 < p.mouseY && p.mouseY < height/3 + 400) {
            p.textSize(20);
            resetGame(2);
        }
    }
}

function gameOver(width, height) {
    // TODO: Implement a game over screen
    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.rect(width/3, height/3, 400, 400);

    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.textSize(64);
    p.text("GAME OVER, CLICK TO RESET", width/3, height/3, 400, 400);

    if (p.mouseIsPressed) {
        if (width/3 < p.mouseX && p.mouseX < width/3 + 400 && height/3 < p.mouseY && p.mouseY < height/3 + 400) {
            p.textSize(20);
            resetGame(3);
        }
    }
}


GM.setup = function () {
    game.splitCards();
    game.assignColumn();
}

GM.draw = function (width, height) {
    const state = game.getState();

    // State is 0, main menu
    if (state == 0) {
        menu(width, height);
    }
    
    // State is 1, play game
    if (state == 1) {
        game.play(width, height);
    }

    // State is 2, omikuji
    if (state == 2) {
        omikuji(width, height);
    }

    // State is 3, game over
    if (state == 3) {
        gameOver(width, height);
    }
}

GM.mouseClicked = function (x, y) {
    game.updateTopDisplay(x, y);
    board.chooseCol(y, score);
}

GM.keyPressed = function(keyCode, BACKSPACE, ESCAPE){
    //console.log("keyCode:", keyCode);
    // maybe this should be ESCAPE?
    if(keyCode === ESCAPE){ 
        console.log("ESCAPE PRESSED");
        // if we are dragging a card
        if(board.currentCard !== null){
            // change the visibility flag for the card
            // and set the board.currentCard = null
            board.unChooseCard()

            // let lastMove = game.recentMoves.slice(-1); 
            // console.log("LAST MOVE:", lastMove);
            // //game.displayMap[lastMove.col] = lastMove;
            // board.counts[lastMove.col]++;
            // console.log(game.displayMap);
        }
        timer.resetTimer();

    }

    if(keyCode === BACKSPACE){ //keyCode for BACKSPACE is 8
        console.log("BACKSPACE PRESSED");

        //if not clicking any card go back two "states", going back 1 will just return to latest card drop
        //doesn't work on consecuetive cancels
        let temp = game.gameStateSaver.slice(-2)[0];
        board.updateHands(temp, game.deck);
        score.currentScore = temp.score;

        console.log("ARRAY:", temp.board);
    }
}

export { game, score, timer, board, GM }; //exporting for tests and one instance throughout code
