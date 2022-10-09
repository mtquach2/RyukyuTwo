export class Score {
    constructor() {
        this.currentScore = 0;
        this.totalScore = 0;
    }
    scoreX = 0;
    scoreY = 0;

    scoreTableKeys = [];

    fillScoreTable() {
        const ranks = {
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
        this.scoreTableKeys = [...Object.keys(ranks)];
        this.scoreTableValues = [...Object.values(ranks)];
    }

    render(p, w, h) {
        this.scoreX = w;
        this.scoreY = h;

        this.renderScore(p);
        this.renderScoreTable(p);
    }

    renderScore(p) {
        // Outline of Score Box
        p.noFill();
        p.stroke(255, 0, 0);
        p.rect(this.scoreX/40, this.scoreY/25, this.scoreX/5, this.scoreY/4);

        // Line for bottom of CLEAR POINT
        p.stroke(0, 0, 255);
        p.line(this.scoreX/40, this.scoreY/10, this.scoreX/40 + this.scoreX/5, this.scoreY/10);
        p.stroke(255, 255, 255);
        p.text("CLEAR POINT", this.scoreX/10, this.scoreY/15);

        // TODO: Add the required CLEAR POINT based on level

        // Line for bounds of TOTAL
        p.stroke(0, 255, 0);
        p.line(this.scoreX/40, this.scoreY/6, this.scoreX/40 + this.scoreX/5, this.scoreY/6);
        p.line(this.scoreX/40, this.scoreY/4.5, this.scoreX/40 + this.scoreX/5, this.scoreY/4.5);
        p.stroke(255, 255, 255);
        p.text("TOTAL", this.scoreX/10, this.scoreY/5);

        // TODO: Add the current score
    }

    renderScoreTable(p) {
        // Outline of Score Table
        p.stroke(255, 0, 0);
        p.rect(this.scoreX/40, this.scoreY/25 + this.scoreY/3, this.scoreX/5, this.scoreY/1.75);

        // Populate text of Score Table
        p.stroke(255, 255, 255);
        for (let i = 0; i < this.scoreTableKeys.length; i++) {
            const rank = this.scoreTableKeys[i];
            const score = this.scoreTableValues[i];

            p.text(`${rank}\t${score}`, this.scoreX/30, this.scoreY/25 + this.scoreY/3 + (i + 1) * 40);
        }

        // TODO: Display how many times they made that poker hand on the table
    }
}