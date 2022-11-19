import p5 from 'p5';
import { Board } from '../src/modules/Board';
import { Timer } from '../src/modules/Timer';
import { Score } from '../src/modules/Score';
import { Game } from '../src/modules/Game';
import { Omikuji } from '../src/modules/Omikuji';
import { LeaderboardInput } from './modules/LeaderboardInput';

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
    preload: () => { },
    setup: () => { },
    draw: () => { },
    mouseClicked: (x, y) => { },
    keyPressed: (keyCode, BACKSPACE, ESCAPE) => { }
}

const p = new p5(p => {
    const windowSize = getWindow();
    p.preload = function preload() {
        mainMenuBackground = p.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        mainMenuButtonSelected = p.loadImage("/static/UI/Buttons/ButtonBlankSelected.png");
        mainMenuButtonUnselected = p.loadImage("/static/UI/Buttons/ButtonBlankUnselected.png");
        okinawaWindow = p.loadImage("/static/UI/okinawaWindowAnimation.gif");
        jpFont = p.loadFont("/static/BestTen-DOT.otf");
        game.load();
        score.load();
        timer.load();
        leaderboardInput.load();
    };

    p.setup = function setup() {
        p.createCanvas(windowSize.w, windowSize.h);
        GM.setup();
    };

    p.draw = function draw() {
        p.background(238, 230, 205);
        GM.draw(p.windowWidth, p.windowHeight);
    };

    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY);
    };

    p.windowResized = function windowResized() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.keyPressed = function keyPressed() {
        GM.keyPressed(p.keyCode, p.BACKSPACE, p.ESCAPE);
    }
});

let mainMenuBackground;
let mainMenuButtonSelected;
let mainMenuButtonUnselected;
let okinawaWindow;

let score = new Score(p);
let timer = new Timer(p);
let board = new Board(p, timer);
let leaderboardInput = new LeaderboardInput(p, score);
let state = 0;

const game = new Game(p, board, score, timer);
const omikuji = new Omikuji(p, score);

const omikujiSound = new Audio('/static/sounds/spinner.mp3');
const gameSound = new Audio('/static/sounds/japanese_music.mp3');
const menuSound = new Audio('/static/sounds/gong.mp3');
const winSound = new Audio('/static/sounds/win.mp3');
const gameOverSound = new Audio('/static/sounds/gameover.mp3');
const okinawaAmbient = new Audio('/static/sounds/Ocean Waves Beach(Sound Effects)- SFX Producer (Vlog No Copyright Music).mp3');

let jpFont;

function resetGame(currentState) {
    score.resetScore();
    game.cancelsLeft = 3;

    board = new Board(p, timer);
    board.load();
    game.board = board;

    if (currentState == 7) {
        score.setClearPoint(1, 0);
        score.resetTotalScore();
        game.resetLevel();
        state = 0;
    }
    else {
        state = 1;
    }

    game.reShuffle();
}

function menu(width, height, scaleX, scaleY) {
    okinawaAmbient.volume = .1;
    okinawaAmbient.play();
    // Background Image
    p.imageMode(p.CORNER);
    p.background(mainMenuBackground);

    // Ryukyu text
    p.textFont(jpFont, 256 * Math.min(scaleX, scaleY));
    p.textAlign(p.CENTER);
    p.strokeWeight(8);
    p.stroke(246, 198, 4);
    p.fill(245, 67, 44);
    p.text("琉", width / 4, height / 2);
    p.text("球", width * .75, height / 2);

    // Gif of Okinawa through window
    // Image Source https://www.tsunagujapan.com/50-things-to-do-in-okinawa/
    p.stroke(150, 75, 0);
    p.noFill();
    p.image(okinawaWindow, width / 3, height / 4, width / 3, height / 2);
    p.rect(width / 3, height / 4, width / 3, height / 2);

    p.strokeWeight(3);
    p.stroke(87, 50, 14);
    p.rect(width / 3, height / 4, width / 3, height / 2);

    // Start Button Image
    p.imageMode(p.CENTER);
    p.image(mainMenuButtonSelected, width / 2, height * .8);

    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.textSize(32);
    p.strokeWeight(2);
    p.textAlign(p.CENTER, p.BASELINE);
    p.text("START", width / 2, height * .8 + 5);
}

function menuState() {
    if (p.keyIsPressed && p.keyCode == 13) {
        // If Enter pressed, start game
        okinawaAmbient.pause();

        menuSound.volume = 0.3;
        menuSound.play();

        gameSound.volume = 0.1;
        gameSound.loop = true;
        gameSound.play();
        p.textSize(20);
        state = 1;
    }
}

function gameOver(width, height, scaleX, scaleY) {
    gameSound.pause();
    gameSound.currentTime = 0;

    p.stroke(0, 0, 0);
    p.fill(255, 255, 255);

    //Displays leaderboard
    p.textFont(jpFont, 96 * Math.min(scaleX, scaleY));
    p.text("LEADERBOARD", width / 2, height / 10);
    score.renderLeaderboard();

    // Main Menu
    p.imageMode(p.CENTER);
    p.image(mainMenuButtonSelected, width / 2, height * .8);

    p.stroke(255, 255, 255);
    p.fill(255, 255, 255);
    p.textSize(32);
    p.strokeWeight(2);
    p.textAlign(p.CENTER, p.BASELINE);
    p.text("MENU", width / 2, height * .8 + 5);

    if (p.keyIsPressed && p.keyCode == 13) {
        // If Enter pressed, return to menu
        p.keyCode = 0;
        resetGame(7);
    }
}

function continueScreen(width, height, scaleX, scaleY) {
    p.imageMode(p.CORNER);
    p.background(mainMenuBackground);

    // Render Continue? screen after lost game 
    p.strokeWeight(3);
    p.stroke(0, 0, 0);
    p.fill(255, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(64 * Math.min(scaleX, scaleY));
    p.text("CONTINUE?", width / 2, height / 3);

    p.textAlign(p.CENTER, p.CENTER);

    // NO button
    p.image(mainMenuButtonSelected, width / 2 + width / 10, height / 2, 200 * scaleX, 100 * scaleY);

    // YES button
    p.image(mainMenuButtonSelected, width / 3 - width / 25, height / 2, 200 * scaleX, 100 * scaleY);

    p.stroke(0, 0, 0)
    p.fill(255, 255, 255);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("YES", width / 3 - width / 25 + 40 * scaleX, height / 2 + 50 * scaleY);
    p.text("NO", width / 2 + width / 10 + 55 * scaleX, height / 2 + 50 * scaleY);
}

function continueScreenStates(width, height, x, y) {
    // Function for P5 mouseClicked and cont() 
    if (state == 2) {
        if ((width / 2 + width / 10 + 40) < x && x < (width / 2 + width / 10) + 200 && height / 2 < y && y < height / 2 + 100) {
            // If NO button is clicked, prompt to get name for leaderboard
            state = 4;
        }
        if ((width / 3 - width / 25 + 55) < x && x < (width / 3 - width / 25) + 200 && height / 2 < y && y < height / 2 + 100) {
            // If YES button is clicked, omikuji
            omikujiSound.volume = 0.2;
            omikujiSound.loop = true;
            omikujiSound.play();

            state = 3;
        }
    }
}

function win() {
    // Function for winning game 
    winSound.play();
    game.level++;
    score.updateTotalScore();
    score.setClearPoint(game.level, 0);
    resetGame(5);
}

GM.setup = function () {
    game.splitCards();
    game.assignColumn();
    omikuji.loadJPFont();
}

GM.draw = function (width, height) {
    let scaleX = width / 1440;
    let scaleY = height / 790;

    // State is 0, main menu
    if (state == 0) {
        menu(width, height, scaleX, scaleY);
        menuState();
    }

    // State is 1, play game
    if (state == 1) {
        state = game.play(width, height, scaleX, scaleY);
    }

    // State is 2, continue screen
    if (state == 2) {
        continueScreen(width, height, scaleX, scaleY);
    }

    // State is 3, omikuji
    if (state == 3) {
        state = omikuji.omikuji(game.level, width, height, scaleX, scaleY);
    }

    // State is 4, game over
    if (state == 4) {
        state = leaderboardInput.leaderboardEntry(width, height, scaleX, scaleY);
    }

    // State is 5, won
    if (state == 5) {
        win();
    }

    // State is 6, omikuji bonus is added and the game should reset
    if (state == 6) {
        resetGame(6);
    }

    // State is 7, game over and leaderboarrd
    if (state == 7) {
        gameOver(width, height, scaleX, scaleY);
    }
}

GM.mouseClicked = function (x, y) {
    const popSound = new Audio('/static/sounds/pop.wav');
    popSound.play();
    popSound.volume = 0.15;
    game.updateTopDisplay(x, y);
    board.chooseCol(y, game.recentMoves, score);
    continueScreenStates(p.windowWidth, p.windowHeight, x, y);
}

GM.keyPressed = function (keyCode, BACKSPACE, ESCAPE) {
    if (p.keyCode == 32) {
        console.log("Space bar was pressed");
        omikujiSound.pause();
        stop.currentTime = 0;
    }

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
        if(game.cancelsLeft > 0){
            //console.log("BOARD:", game.gameStateSaver);
            let temp = game.gameStateSaver.splice(-2)[0];
            //let temp = game.gameStateSaver[game.gameStateSaver.length - 2];
            board.updateHands(temp, game.deck);
            board.updateTopDisplay(temp, game.displayMap);
            score.currentScore = temp.score;
            game.stateSaver();
            console.log("STATE SAVER AFTER CANCEL", game.gameStateSaver);
            timer.resetTimer();
            game.cancelsLeft--;
        }


    }
}