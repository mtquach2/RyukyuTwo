import { db } from '/src/FB';
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

export class Score {
    constructor(p5) {
        this.p5 = p5
        this.currentScore = 0;
        this.totalScore = 0;
        this.clearPoint = 5000;
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

        this.scaleX = 1;
        this.scaleY = 1;
        this.scoreX = 0;
        this.scoreY = 0;

        this.scoreTableKeys = [];
        this.pointsMap = new Map();
        this.data = new Set();
    }


    fillScoreTable() {
        this.scoreTableKeys = [...Object.keys(this.ranks)];
        this.scoreTableValues = [...Object.values(this.ranks)];
    }

    setClearPoint(level, bonus) {
        this.clearPoint = 5000 + (1000 * (level - 1)) - bonus;
    }

    render(w, h, scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.scoreX = w;
        this.scoreY = h;

        this.renderScore();
        this.renderScoreTable();
        this.renderTotalScore();
    }

    renderScore() {
        // Box for Clear Point
        this.p5.strokeWeight(3);
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
        this.p5.noFill();
        this.p5.stroke(0, 255, 0);
        this.p5.rect(this.scoreX / 40, this.scoreY / 25, this.scoreX / 5, this.scoreY / 10);

        this.p5.strokeWeight(1);
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));
        this.p5.text("CLEAR POINT: ", this.scoreX / 15, this.scoreY / 15);
        this.p5.text(this.clearPoint, this.scoreX / 10, this.scoreY / 15 + this.scoreY / 20);

        // Box for Total
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(0, 255, 0);
        this.p5.rect(this.scoreX / 40, this.scoreY / 10 + this.scoreY / 18, this.scoreX / 5, this.scoreY / 10);

        this.p5.strokeWeight(1);
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));
        this.p5.text("TOTAL:", this.scoreX / 11, this.scoreY / 10 + this.scoreY / 12);
        this.p5.text(this.currentScore, this.scoreX / 10, this.scoreY / 4.25);
    }

    renderScoreTable() {
        this.p5.textAlign(this.p5.LEFT, this.p5.BASELINE);

        // Outline of Score Table
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(255, 0, 0);
        this.p5.rect(this.scoreX / 40, this.scoreY / 25 + this.scoreY / 3, this.scoreX / 5, this.scoreY / 1.75);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));

        // Populate text of Score Table
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        for (let i = 0; i < this.scoreTableKeys.length; i++) {
            const rank = this.scoreTableKeys[i];
            const score = this.scoreTableValues[i];
            this.p5.text(`${rank}`, this.scoreX / 30, this.scoreY / 25 + this.scoreY / 3 + (i + 1) * 40 * this.scaleY);
            this.p5.text(`\t${score}`, this.scoreX / 30 + 50 * this.scaleX, this.scoreY / 25 + this.scoreY / 3 + (i + 1) * 40 * this.scaleY);
            this.p5.text(`\t\tx ${this.pointsMap.get(rank) || 0}`, this.scoreX / 30 + 150 * this.scaleX, this.scoreY / 25 + this.scoreY / 3 + (i + 1) * 40 * this.scaleY);
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

    updateTotalScore() {
        this.totalScore += this.currentScore;
    }

    getScore() {
        return this.currentScore;
    }

    isWin() {
        return this.currentScore >= this.clearPoint;
    }

    renderTotalScore() {
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.stroke(0, 255, 0);
        this.p5.rect(this.scoreX - this.scoreX / 4.5, this.scoreY / 25, this.scoreX / 5, this.scoreY / 10);

        this.p5.strokeWeight(1);
        this.p5.stroke(255, 255, 255);
        this.p5.fill(255, 255, 255);
        this.p5.text("TOTAL SCORE:", this.scoreX - this.scoreX / 5.5, this.scoreY / 15)
        this.p5.text(this.totalScore, this.scoreX - this.scoreX / 10, this.scoreY / 9);
    }

    resetScore() {
        this.currentScore = 0;
        this.totalScore = 0;
        this.pointsMap = new Map();
        this.fillScoreTable();
    }

    async addLeaderboad(name) {
        // Adds the username and their final score to the database
        try {
            const docRef = await addDoc(collection(db, "Leaderboard"), {
                name: name,
                score: this.totalScore
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    async getDataframe() {
        // Retrieves all of the leaderboard data and adds it to an array
        const df = collection(db, "Leaderboard");
        const sortedQueries = query(df, orderBy("score", "desc")); //sorts the data in descending order by score
        const querySnapshot = await getDocs(sortedQueries);
        querySnapshot.forEach((doc) => {
            this.data.add(doc.data());
        });
    } 

    renderLeaderboard() {
        // Renders all of the names and scores for the leaderboard on gameOver screen
        for (let i = 0; i < this.data.length; i++) { 
            if (i == 10) {
                break;
            }
            this.p5.text(this.data[i].name + "\t\t\t" + this.data[i].score, this.scoreX / 3 + this.scoreX / 20, this.scoreY / 7 + (i + 1) * 50);
        }
    } // TODO: Check for duplicates in dataframe
}