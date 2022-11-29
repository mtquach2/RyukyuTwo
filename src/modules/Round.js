import { Omikuji } from './Omikuji';

export class Round {
    constructor(p, score, game) {
        this.p5 = p;

        this.score = score;
        this.game = game;

        this.bg;
        this.jpFont;
    }

    load() {
        this.bg = this.p5.loadImage("/static/UI/screens/Sidebar/Screen Background Test.png");
        this.jpFont = this.p5.loadFont("/static/fonts/BestTen-DOT.otf");
    }

    roundScreen(width, height, scaleX, scaleY) {
        this.p5.imageMode(this.p5.CORNER);
        this.p5.background(this.bg);

        this.p5.fill(204, 97, 61);
        this.p5.textFont(this.jpFont, 48 * Math.min(scaleX, scaleY));
        this.p5.text(`  Round\t\t${this.game.getLevel() - 1}  ······  C·L·E·A·R`, width / 10, height / 5);
        this.p5.text("Extend Bonus", width / 10, height / 3 + height / 30);
        this.p5.text(this.score.getExtend(), width * .8, height / 3 + height / 30);

        this.p5.text("Cancel Bonus", width / 10, height / 2 + height / 30);
        this.p5.text(" X 800 = ", width / 3 + width / 15 + width / 6, height / 2 + height / 30);
        this.p5.text(this.game.getCancels() * 800, width * .8, height / 2 + height / 30);

        this.p5.text("Total Bonus", width / 10, height / 2 + height / 5);
        this.p5.text((Omikuji.getBonus() || 0), width * .8, height / 2 + height / 5);

        this.p5.text(`[Score]\t${this.score.getTotalScore()}····`, width / 3, height / 2 + height / 3);

        this.p5.textFont("Helvetica", 48 * Math.min(scaleX, scaleY));
        this.p5.text("🐉".repeat(this.game.getCancels()), width / 3 + width / 15, height / 2 + height / 30);

        return 5;
    }
}