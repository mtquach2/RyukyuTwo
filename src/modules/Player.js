import { score } from './GameManager';

export class Player {
    constructor(p5) {
        this.p5 = p5;
        this.totalScore = 0;
        this.level = 1;
    }

    renderTotalScore(w, h) {
        this.p5.stroke(0, 255, 0);
        this.p5.rect(w - w / 4.5, h / 25, w / 5, h / 10);
        this.p5.stroke(255);
        this.p5.text("TOTAL SCORE:", w - w / 5.5, h / 15)
        this.p5.text(this.totalScore, w - w / 10, h / 9);
    }

    updateTotalScore() {
        this.totalScore += score.currentScore;
        console.log("TOTAL SCORE: " + this.totalScore);
    }

    updateLevel() {
        this.level += 1;
        console.log("LEVEL: " + this.level);
        score.clearPoint += 1000;
        console.log("CLEARPOINT: " + score.clearPoint);
    }
}