import { s } from './GameManager';

export class Player {
    constructor(p5) {
        this.p5 = p5;
        this.totalScore = 0;
        this.level = 1;
    }

    updateTotalScore() {
        this.totalScore += s.currentScore;
        console.log("TOTAL SCORE: " + this.totalScore);
    }

    updateLevel() {
        this.level += 1;
        console.log("LEVEL: " + this.level);
    }
}