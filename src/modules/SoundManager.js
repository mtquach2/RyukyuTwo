export class SoundManager {
    constructor() {
        this.menuTheme;
        this.gongSound;
        this.cardSounds = [];
        this.gameTheme;
        this.winSound;
        this.continueSound;
        this.gameOverSound;
        this.omikujiTheme;
        this.omikujiSpinner;
    }

    load() {
        this.menuTheme = new Audio('/static/sounds/music/menuTheme.mp3');
        this.gongSound = new Audio('/static/sounds/gong.mp3');
        this.gameTheme = new Audio('/static/sounds/music/gameTheme.mp3')
        this.winSound = new Audio('/static/sounds/win.mp3');
        this.continueSound = new Audio('/static/sounds/continue.mp3');
        this.gameOverSound = new Audio('/static/sounds/gameover.mp3');
        this.omikujiTheme = new Audio('/static/sounds/music/omikujiTheme.mp3');
        this.omikujiSpinner = new Audio('/static/sounds/spinner.mp3');

        for (let i = 0; i < 4; i++) {
            this.cardSounds[i] = new Audio(`/static/sounds/cardSounds/cardSound${i}.mp3`);
        }
    }

    playMenuTheme() {
        this.menuTheme.volume = 0.2;
        this.menuTheme.play();
    }

    pauseMenuTheme() {
        this.menuTheme.pause();
        this.menuTheme.currentTime = 0;
    }

    playGong() {
        this.gongSound.volume = 0.3;
        this.gongSound.play();
    }

    playCardNoise(state) {
        // Randomly chooses a card sound to play when mouse/card is selected
        if (state == 1) {
            const cardSoundIndex =  Math.floor(Math.random() * 4) // random int between 0 and 4 (exclusive)
            const cardSound = this.cardSounds[cardSoundIndex];
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

    playGameTheme() {
        this.gameTheme.volume = 0.1;
        this.gameTheme.loop = true;
        this.gameTheme.play();
    }

    resetGameTheme() {
        this.gameTheme.pause();
        this.gameTheme.currentTime = 0;
    }

    playWin() {
        this.winSound.play();
    }

    playContinue() {
        this.continueSound.volume = 0.5;
        this.continueSound.play();
    }

    playGameOver() {
        this.gameOverSound.play();
    }

    playOmikujiTheme() {
        this.omikujiTheme.volume = 0.2;
        this.omikujiTheme.play();
    }

    pauseOmikujiTheme() {
        this.omikujiTheme.pause();
    }

    playOmikujiSpinner(omikujiIsSelected) {
        if (this.omikujiSpinner.paused && !omikujiIsSelected) {
            this.omikujiSpinner.volume = 0.05;
            this.omikujiSpinner.loop = true;
            this.omikujiSpinner.play();
        }
    }

    pauseOmikujiSpinner() {
        this.omikujiSpinner.pause();
    }
}