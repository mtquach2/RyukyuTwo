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
import { Instructions } from './modules/Instructions';
import { SoundManager } from './modules/SoundManager';

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
        soundManager.load();
        score.load();
        timer.load();
        menu.load();
        game.load();
        round.load();
        continueScreen.load();
        omikuji.load();
        leaderboardInput.load();
        gameOver.load();
        instructions.load();
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

    p.touchStarted = function touchStarted() {
        GM.touchStarted(p.touches[0].x, p.touches[0].y);
    }
});

const soundManager = new SoundManager(p);
const score = new Score(p);
const timer = new Timer(p);
const board = new Board(p, timer);

const menu = new Menu(p, soundManager);
const game = new Game(p, board, score, timer, soundManager);
const round = new Round(p, score, game);
const continueScreen = new Continue(p, soundManager);
const omikuji = new Omikuji(p, score, soundManager);
const leaderboardInput = new LeaderboardInput(p, score, soundManager);
const gameOver = new GameOver(p, score, soundManager, soundManager);
const instructions = new Instructions(p, soundManager);

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

    // State is 4, leaderboard entry
    if (state == 4) {
        state = leaderboardInput.leaderboardEntry(width, height, scaleX, scaleY, game.getLevel());
    }

    // State is 5, won
    if (state == 5) {
        let num = Math.floor(Math.random() * 2); // Random number 0-1
        if (num == 0) {
            state = omikuji.omikuji(game.level, width, height, scaleX, scaleY);
            resetGame(5);        
        }
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

        if (state == -1) {
            resetGame(7);
        }
    }

    // State is 8, display instructions and controls
    if (state == 8) {
        state = instructions.instructionsScreen(width, height, scaleX, scaleY);
    }

    soundManager.render(width, height);
}

GM.mouseClicked = function (x, y) {
    soundManager.playCardNoise(state);
    game.updateTopDisplay(x, y);
    board.chooseCol(y, score);

    switch (state) {
        case 0:
            state = menu.menuState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 1:
            game.cancelState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 2:
            state = continueScreen.continueScreenStates(p.windowWidth, p.windowHeight, p.mouseX, p.mouseY, scaleX, scaleY);
            break;
        case 3: 
            omikuji.omikujiState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 4: 
            state = leaderboardInput.leaderboardState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 7:
            state = gameOver.gameOverState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            if (state == -1 ) {
                resetGame(7);
            }
            break;
        case 8:
            state = instructions.instructionsState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
    }

    soundManager.selectMute(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
}

GM.touchStarted = function (x, y) {
    soundManager.playCardNoise(state);
    game.updateTopDisplay(x, y);
    board.chooseCol(y, score);

    switch (state) {
        case 0:
            state = menu.menuState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 1:
            game.cancelState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 2:
            state = continueScreen.continueScreenStates(p.windowWidth, p.windowHeight, p.mouseX, p.mouseY, scaleX, scaleY);
            break;
        case 3: 
            omikuji.omikujiState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 4: 
            state = leaderboardInput.leaderboardState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
        case 7:
            state = gameOver.gameOverState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            if (state == -1 ) {
                resetGame(7);
            }
            break;
        case 8:
            state = instructions.instructionsState(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
            break;
    }

    soundManager.selectMute(x, y, p.windowWidth, p.windowHeight, scaleX, scaleY);
}

GM.keyPressed = function (keyCode) {
    if (keyCode == 32) {
        stop.currentTime = 0;
    }

    if(keyCode === 8){ 
        if(game.cancelsLeft > 0 && board.currentCard !== null){
            board.unChooseCard();
            timer.resetTimer();
            game.cancelsLeft--;
        }
        else if(game.cancelsLeft > 0 && board.currentCard === null){
            if(board.boardIsEmpty() === false){
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
}