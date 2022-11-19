import p5 from 'p5';
import { Board } from '../src/modules/Board';
import { Timer } from '../src/modules/Timer';
import { Score } from '../src/modules/Score';
import { Game } from '../src/modules/Game';
import { Omikuji } from '../src/modules/Omikuji';
import { LeaderboardInput } from './modules/LeaderboardInput';
import { Menu } from './modules/Menu';
import { GameOver } from './modules/GameOver';
import { Continue } from './modules/Continue';
import { Round } from './modules/Round';

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
    keyPressed: (keyCode) => { }
}

const p = new p5(p => {
    const windowSize = getWindow();

    p.preload = function preload() {
        score.load();
        timer.load();
        menu.load();
        game.load();
        round.load();
        continueScreen.load();
        omikuji.load();
        leaderboardInput.load();
        gameOver.load();
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
        GM.keyPressed(p.keyCode);
    }
});

const gameSound = new Audio('/static/sounds/japanese_music.mp3');

const score = new Score(p);
const timer = new Timer(p);
const board = new Board(p, timer);

const menu = new Menu(p, gameSound);
const game = new Game(p, board, score, timer);
const round = new Round(p, score, game);
const continueScreen = new Continue(p);
const omikuji = new Omikuji(p, score);
const leaderboardInput = new LeaderboardInput(p, score);
const gameOver = new GameOver(p, score, gameSound);

let state = 0;
let scaleX;
let scaleY;

let frameDelay = 500; 

function resetGame(currentState) {
    score.resetScore();
    game.cancelsLeft = 3;
    game.gameStateSaver = [];
    score.resetData();
    board.resetBoard();

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

function cardNoise() {
    // Randomly chooses a card sound to play when mouse/card is selected
    if (state == 1) {
        let i =  Math.floor(Math.random() * 5) // random int between 1 and 5 (exclusive)
        let cardSound = new Audio(`/static/sounds/cardSounds/cardSound${i}.mp3`);
        cardSound.play();
        cardSound.volume = 0.2;
    }
    else {
        // Plays pop sound when not in play screen
        const popSound = new Audio('/static/sounds/pop.wav');
        popSound.play();
        popSound.volume = 0.15;
    }
}

GM.setup = function () {
    game.splitCards();
}

GM.draw = function (width, height) {
    scaleX = width / 1440;
    scaleY = height / 790;

    // State is 0, main menu
    if (state == 0) {
        state = menu.menu(width, height, scaleX, scaleY);
    }

    // State is 1, play game
    if (state == 1) {
        state = game.play(width, height, scaleX, scaleY);
    }

    // State is 2, continue screen
    if (state == 2) {
        state = continueScreen.continueScreen(width, height, scaleX, scaleY);
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
        state = round.roundScreen(width, height, scaleX, scaleY);
        if (frameDelay-- <= 0) {
            frameDelay = 500;
            resetGame(5);
        }
    }

    // State is 6, omikuji bonus is added and the game should reset
    if (state == 6) {
        resetGame(6);
    }

    // State is 7, game over and leaderboarrd
    if (state == 7) {
        state = gameOver.gameOver(width, height, scaleX, scaleY);
    }
}

GM.mouseClicked = function (x, y) {
    cardNoise();
    game.updateTopDisplay(x, y);
    board.chooseCol(y, score);

    switch (state) {
        case 0:
            state = menu.menuState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 2:
            state = continueScreen.continueScreenStates(p.windowWidth, p.windowHeight, x, y, scaleX, scaleY);
            break;
        case 7:
            state = gameOver.gameOverState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            if (state == -1 ) {
                resetGame(7);
            }
            break;
    }
}

GM.keyPressed = function (keyCode) {
    if (p.keyCode == 32) {
        stop.currentTime = 0;
    }

    if(keyCode === 27){ 
        if(game.cancelsLeft > 0 && board.currentCard !== null){
            board.unChooseCard();
            timer.resetTimer();
            game.cancelsLeft--;
        }
    }

    if(keyCode === 8){ 
        if(game.cancelsLeft > 0 && board.currentCard === null){
            let temp = game.gameStateSaver.splice(-2)[0];
            board.updateHands(temp, game.deck);
            board.updateTopDisplay(temp, game.displayMap);
            score.currentScore = temp.score;
            game.stateSaver();
            timer.resetTimer();
            game.cancelsLeft--;
        }
    }
}