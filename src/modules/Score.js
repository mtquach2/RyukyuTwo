export class Score {
    constructor(p5) {
        this.p5 = p5
        this.currentScore = 0;
        this.totalScore = 0;
        this.clearPoint = 6000; //each round +1000
        this.ranks = {
            '5K': 3000,
            'RSF': 2800,
            'SF': 2400,
            '4K': 2000,
            'FH': 1800,
            'ST': 1400,
            'FL': 1000,
            '3K': 800,
            '2P': 600,
            '1P': 200,
            'H': 0,
        }

        this.scoreX = 0;
        this.scoreY = 0;

        this.scoreTableKeys = [];
        this.pointsMap = new Map();
    }
    

    fillScoreTable() {
        this.scoreTableKeys = [...Object.keys(this.ranks)];
        this.scoreTableValues = [...Object.values(this.ranks)];
    }

    render(w, h) {
        this.scoreX = w;
        this.scoreY = h;

        this.renderScore();
        this.renderScoreTable();
    }

    renderScore() {
        // Outline of Score Box
        this.p5.noFill();
        this.p5.stroke(255, 0, 0);
        this.p5.rect(this.scoreX / 40, this.scoreY / 25, this.scoreX / 5, this.scoreY / 4);

        // Line for bottom of CLEAR POINT
        this.p5.stroke(0, 0, 255);
        this.p5.line(this.scoreX / 40, this.scoreY / 10, this.scoreX / 40 + this.scoreX / 5, this.scoreY / 10);
        this.p5.stroke(255, 255, 255);
        this.p5.text("CLEAR POINT", this.scoreX / 10, this.scoreY / 15);

        this.p5.text(this.clearPoint, this.scoreX / 10, this.scoreY / 7);
        // TODO: Change clearPoint based on level

        // Line for bounds of TOTAL
        this.p5.stroke(0, 255, 0);
        this.p5.line(this.scoreX / 40, this.scoreY / 6, this.scoreX / 40 + this.scoreX / 5, this.scoreY / 6);
        this.p5.line(this.scoreX / 40, this.scoreY / 4.5, this.scoreX / 40 + this.scoreX / 5, this.scoreY / 4.5);
        this.p5.stroke(255, 255, 255);
        this.p5.text("TOTAL", this.scoreX / 10, this.scoreY / 5);
        this.p5.text(this.currentScore, this.scoreX / 10, this.scoreY / 3.75);
    }

    renderScoreTable() {
        // Outline of Score Table
        this.p5.stroke(255, 0, 0);
        this.p5.rect(this.scoreX / 40, this.scoreY / 25 + this.scoreY / 3, this.scoreX / 5, this.scoreY / 1.75);

        // Populate text of Score Table
        this.p5.stroke(255, 255, 255);
        for (let i = 0; i < this.scoreTableKeys.length; i++) {
            const rank = this.scoreTableKeys[i];
            const score = this.scoreTableValues[i];
            this.p5.text(`${rank}\t${score}\t\tx ${this.pointsMap.get(rank) || 0}`, this.scoreX / 30, this.scoreY / 25 + this.scoreY / 3 + (i + 1) * 40);
        }
    }

    /**
     * Updates the currentScore depending on what hand was played/completed
     * Also, updates the number of poker hands have been played/completed
     * @param rank rank of poker hand
     */
    updateScore(rank) {
        this.pointsMap.set(rank, (this.pointsMap.get(rank) + 1) || 1);
        this.currentScore += this.ranks[rank];
    }
}