import { db } from '../FB';
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { Omikuji } from './Omikuji';

export class Score {
    constructor(p) {
        this.p5 = p;
        this.currentScore = 0;
        this.totalScore = 0;
        this.clearPoint = 5000;
        this.extendScore = 0;
        this.ranks = {
            '5K': 3000, // five of a kind
            'RSF': 2800, // royal straight flush
            'SF': 2400, // straight flush
            '4K': 2000, // four of a kind
            'FH': 1800, // full house
            'ST': 1400, // straight
            'FL': 1000, // flush
            '3K': 800, // three of a kind
            '2P': 600, // two pair
            '1P': 200, // pair
            'H': 0, // nothing
        }

        this.scaleX = 1;
        this.scaleY = 1;
        this.scoreX = 0;
        this.scoreY = 0;

        this.scoreTableKeys = [];
        this.pointsMap = new Map(); // map for displaying what hand has been played
        this.data = [];

        this.jpFont;

        this.paperFrameLight;
        this.paperFrameDark;
        this.paperFrameLong;
    }

    load() {
        // loads UI needed
        this.jpFont = this.p5.loadFont("/static/fonts/jackeyfont.ttf");
        this.paperFrameLight = this.p5.loadImage("/static/UI/paperFrame1.png");
        this.paperFrameDark = this.p5.loadImage("/static/UI/paperFrame2.png");
        this.paperFrameLong = this.p5.loadImage("/static/UI/paperStrip.png");
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

        this.p5.textFont(this.jpFont);
        this.renderScore();
        this.renderScoreTable();
        this.renderTotalScore();
    }

    renderScore() {
        // Box for Clear Point
        this.p5.strokeWeight(5);
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);

        this.p5.noFill();
        this.p5.image(this.paperFrameLight, this.scoreX / 80, this.scoreY / 50, this.scoreX / 4.5, this.scoreY / 4);
        this.p5.stroke(204, 97, 61);
        this.p5.rect(this.scoreX / 40, this.scoreY / 25, this.scoreX / 5, this.scoreY / 4.75);
        this.p5.line(this.scoreX / 40, this.scoreY / 6.5, this.scoreX / 40 + this.scoreX / 5, this.scoreY / 6.5);

        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));
        this.p5.text("CLEAR POINT", this.scoreX / 15, this.scoreY / 15);
        this.p5.text(this.clearPoint, this.scoreX / 10, this.scoreY / 15 + this.scoreY / 20);

        // Box for Total
        this.p5.fill(0, 0, 0);
        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));
        this.p5.text("TOTAL", this.scoreX / 11, this.scoreY / 11 + this.scoreY / 12);
        this.p5.text(this.currentScore, this.scoreX / 10, this.scoreY / 11 + this.scoreY / 12 + this.scoreY / 20);
    }

    renderScoreTable() {
        this.p5.textAlign(this.p5.LEFT, this.p5.BASELINE);

        // Outline of Score Table
        this.p5.noFill();
        this.p5.image(this.paperFrameDark, this.scoreX / 80, this.scoreY / 25 + this.scoreY / 4, this.scoreX / 4.5, this.scoreY * .7);
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));

        // Populate text of Score Table
        this.p5.strokeWeight(4);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        for (let i = 0; i < this.scoreTableKeys.length; i++) {
            const rank = this.scoreTableKeys[i];
            const score = this.scoreTableValues[i];
            this.p5.text(`${rank}`, this.scoreX / 30, this.scoreY / 25 + this.scoreY / 3 + i * 40 * this.scaleY);
            this.p5.text(`\t${score}`, this.scoreX / 30 + 50 * this.scaleX, this.scoreY / 25 + this.scoreY / 3 + i * 40 * this.scaleY);
            this.p5.text(`\t\tx ${this.pointsMap.get(rank) || 0}`, this.scoreX / 30 + 150 * this.scaleX, this.scoreY / 25 + this.scoreY / 3 + i * 40 * this.scaleY);
        }
    }

    updateScore(rank) {
        // Updates current score and number of poker hands played
        this.pointsMap.set(rank, (this.pointsMap.get(rank) + 1) || 1);
        this.currentScore += this.ranks[rank];
    }

    updateTotalScore(cancelBonus) {
        // Calculates the totalScore if round has been won
        this.totalScore = this.totalScore + this.currentScore + (cancelBonus * 800 || 0) + (Omikuji.getBonus() || 0);
    }

    getScore() {
        return this.currentScore;
    }

    isWin() {
        return this.currentScore >= this.clearPoint;
    }

    renderTotalScore() {
        this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
        this.p5.noFill();
        this.p5.noStroke();
        this.p5.image(this.paperFrameLong, this.scoreX - this.scoreX / 4.5, this.scoreY / 12, this.scoreX / 5, this.scoreY / 10);

        this.p5.strokeWeight(3);
        this.p5.stroke(0, 0, 0);
        this.p5.fill(255, 255, 255);
        this.p5.text("TOTAL SCORE", this.scoreX - this.scoreX / 5.5, this.scoreY / 9)
        this.p5.text(this.totalScore, this.scoreX - this.scoreX / 7.5, this.scoreY / 6.5);
    }

    resetScore() {
        this.currentScore = 0;
        this.pointsMap = new Map();
        this.fillScoreTable();
    }

    async addLeaderboard(name) {
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
            this.data.push(doc.data());
        });
    }

    renderLeaderboard() {
        // Renders all of the names and scores for the leaderboard on gameOver screen
        this.p5.textSize(32 * Math.min(this.scaleX, this.scaleY));
        for (let i = 0; i < this.data.length; i++) {
            if (i == 10) {
                break;
            }
            this.p5.text((i + 1) + "\t" + this.data[i].name + "\t\t\t" + this.data[i].score, this.scoreX / 2, this.scoreY / 6 + (i + 1) * 50 * this.scaleY);
        }
    }

    resetTotalScore() {
        this.totalScore = 0;
    }

    setExtend() {
        this.extendScore = this.currentScore - this.clearPoint;
    }

    getTotalScore() {
        return this.totalScore;
    }

    getExtend() {
        return this.extendScore;
    }

    resetData() {
        this.data = [];
    }
}