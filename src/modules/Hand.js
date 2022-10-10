import { Card } from './Card';
import { score } from '../script';
export class Hand {
    constructor() {
        this.hand = [];
        this.rank = -1;
    }

    addCard(card, index) {
        if (index < 5) {
            console.log("Trying to add card above limit");
            return;
        }
    
        this.hand.push(card);

        if (this.hand.length == 5) {
            console.log("Evaluating: ", this.hand);
            this.evaluateHand(this.hand);
            score.updateScore(this.rankTable[this.rank]);
        }

        return 5 - this.hand.length;
    }

    evaluateHand(hand) {
        // Modified version of https://dev.to/miketalbot/real-world-javascript-map-reduce-solving-the-poker-hand-problem-3eie
        const cardValues = "234567890JQKA";
		const value_format = {
			'02':'M',
			'03':'L',
			'04':'K',
			'05':'J',
			'06':'I',
			'07':'H',
			'08':'G',
			'09':'F',
			'10':'E',
			'J':'D',
			'Q':'C',
			'K':'B',
			'A':'A'
		}

        // Take the values of each card as a letter and sort them alphabetically (Highest values first) and sort the suits alphabetically
        const faces = hand.map(card => value_format[card.getValue()]).sort();
        const suits = hand.map(card => card.getSuit()).sort();

        // Flushes are 5 of the same suit, and straights are 5 sequential cards
        const royal = 'A' <= faces[0] && faces[0] <= 'D';
        const flush = suits[0] == suits[4];
        const straight = faces[4] == String.fromCharCode((faces[0].charCodeAt(0) + 4));

        // Count up each of the times a value appears, creates object of {# Duplicates : Count}
        const counts = faces.reduce(this.count, {});
        const duplicates = Object.values(counts).reduce(this.count, {});

        this.rank = (duplicates[5] && 1) ||
                    (royal && straight && flush && 2) ||
                    (straight && flush && 3) ||
                    (duplicates[4] && 4) ||
                    (duplicates[3] && duplicates[2] && 5) ||
                    (flush && 6) ||
                    (straight && 7) ||
                    (duplicates[3] && 8) ||
                    (duplicates[2] > 1 && 9) ||
                    (duplicates[2] && 10) ||
                    11;
        this.rankTable = {
            1:'5K',
            2:'RSF',
            3:'SF',
            4:'4K',
            5:'FH',
            6:'ST',
            7:'FL',
            8:'3K',
            9:'2P',
            10:'1P',
            11:'H',
        }
    }
    
    count(count, value) {
        count[value] = (count[value] || 0) + 1;
        return count;
    }

    showCard(index, col, row, p) {
        if (this.hand[4 - index] != null) {
            this.hand[4 - index].showImage(col, row, p)
        }
    }

    isFull() {
        return this.hand.length == 5;
    }
}