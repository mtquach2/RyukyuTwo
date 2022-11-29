export class SoundManager {
    constructor(p) {
        this.p5 = p;

        this.menuTheme;
        this.gongSound;
        this.cardSounds = [];
        this.gameTheme;
        this.winSound;
        this.continueSound;
        this.gameOverSound;
        this.omikujiTheme;
        this.omikujiSpinner;
        this.musicButton;
        this.noMusicButton;
        this.soundButton;
        this.noSoundButton;

        this.isSoundMuted = true;
        this.isMusicMuted = true;
    }

    render(width, height) {
        // Placeholder text emojis for reference to use an image
        this.p5.imageMode(this.p5.CENTER);
        this.isSoundMuted ? this.p5.image(this.noSoundButton, width * .95, height / 30, width / 35, height / 20) : this.p5.image(this.soundButton, width * .95, height / 30, width / 35, height / 20);
        this.isMusicMuted ? this.p5.image(this.noMusicButton, width * .92, height / 30, width / 35, height / 20) : this.p5.image(this.musicButton, width * .92, height / 30, width / 35, height / 20);
        this.p5.imageMode(this.p5.CORNER);
    }

    load() {
        this.musicButton = this.p5.loadImage("/static/UI/Buttons/MusicButton.png");
        this.noMusicButton = this.p5.loadImage("/static/UI/Buttons/NoMusicButton.png");
        this.soundButton = this.p5.loadImage("/static/UI/Buttons/SoundButton.png");
        this.noSoundButton = this.p5.loadImage("/static/UI/Buttons/MuteButton.png");

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

    muteSound() {
        this.gongSound.pause();
        this.winSound.pause();
        this.continueSound.pause();
        this.gameOverSound.pause();
        this.omikujiSpinner.pause();
    }

    muteMusic() {
        this.menuTheme.pause();
        this.gameTheme.pause();
        this.omikujiTheme.pause();
    }

    selectMute(x, y, width, height, scaleX, scaleY) {
        if (width * .95 - 16 * scaleX < x && x < width * .95 + 16 * scaleX && height / 30 - 18 * scaleY < y && y < height / 30 + 20 * scaleY) {
            this.isSoundMuted = !this.isSoundMuted;
            this.muteSound();
        }
        if (width * .92 - 16 * scaleX < x && x < width * .92 + 16 * scaleX && height / 30 - 18 * scaleY < y && y < height / 30 + 20 * scaleY) {
            this.isMusicMuted = !this.isMusicMuted;
            this.muteMusic();
        }
    }

    playMenuTheme() {
        if (!this.isMusicMuted) {
            this.menuTheme.volume = 0.2;
            this.menuTheme.play();
        }
    }

    pauseMenuTheme() {
        this.menuTheme.pause();
        this.menuTheme.currentTime = 0;
    }

    playGong() {
        if (!this.isSoundMuted) {
            this.gongSound.volume = 0.10;
            this.gongSound.play();
        }
    }

    playCardNoise(state) {
        if (!this.isSoundMuted) {
            // Randomly chooses a card sound to play when mouse/card is selected
            if (state == 1) {
                const cardSoundIndex = Math.floor(Math.random() * 4) // random int between 0 and 4 (exclusive)
                const cardSound = this.cardSounds[cardSoundIndex];
                cardSound.play();
                cardSound.volume = 0.10;
            }
            else if (state != 4) {
                // Plays pop sound when not in play screen
                const popSound = new Audio('/static/sounds/pop.wav');
                popSound.play();
                popSound.volume = 0.10;
            }
        }
    }

    playGameTheme() {
        if (!this.isMusicMuted) {
            this.gameTheme.volume = 0.2;
            this.gameTheme.loop = true;
            this.gameTheme.play();
        }
    }

    resetGameTheme() {
        this.gameTheme.pause();
        this.gameTheme.currentTime = 0;
    }

    playWin() {
        if (!this.isSoundMuted) {
            this.winSound.play();
        }
    }

    playContinue() {
        if (!this.isSoundMuted) {
            this.continueSound.volume = 0.3;
            this.continueSound.play();
        }
    }

    playGameOver() {
        if (!this.isSoundMuted) {
            this.gameOverSound.volume = 0.5;
            this.gameOverSound.play();
        }
    }

    playOmikujiTheme() {
        if (!this.isMusicMuted) {
            this.omikujiTheme.volume = 0.1;
            this.omikujiTheme.play();
        }
    }

    pauseOmikujiTheme() {
        this.omikujiTheme.pause();
    }

    playOmikujiSpinner(omikujiIsSelected) {
        if (!this.isSoundMuted && this.omikujiSpinner.paused && !omikujiIsSelected) {
            this.omikujiSpinner.volume = 0.05;
            this.omikujiSpinner.loop = true;
            this.omikujiSpinner.play();
        }
    }

    pauseOmikujiSpinner() {
        this.omikujiSpinner.pause();
    }

    playLeaderboardClick() {
        if (!this.isSoundMuted) {
            const sound = new Audio('/static/sounds/Click.wav');
            sound.volume = 0.3;
            sound.play();
        }
    }

    playLeaderboardEnter() {
        if (!this.isSoundMuted) {
            const sound = new Audio('/static/sounds/Enter.wav');
            sound.volume = 0.3;
            sound.play();
        }
    }

    playLeaderboardConfirm() {
        if (!this.isSoundMuted) {
            const sound = new Audio('/static/sounds/Confirm.wav');
            sound.volume = 0.5;
            sound.play();
        }
    }

    playLeaderboardCancel() {
        if (!this.isSoundMuted) {
            const sound = new Audio('/static/sounds/Cancel.wav');
            sound.volume = 0.5;
            sound.play();
        }
    }
}