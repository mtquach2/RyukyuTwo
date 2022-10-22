import { game } from './GameManager';

export class Hand {
    constructor() {
        this.hand = [];
        this.rank = -1;
        this.rankTable = {
            1: '5K',
            2: 'RSF',
            3: 'SF',
            4: '4K',
            5: 'FH',
            6: 'ST',
            7: 'FL',
            8: '3K',
            9: '2P',
            10: '1P',
            11: 'H',
        };
    }

    addCard(card) {
        this.hand.push(card);

        if (this.hand.length == 5) {
            console.log("Evaluating: ", this.hand);
            this.evaluateHand(this.hand);
            game.getRank(this.rankTable[this.rank]); //updates score right when hand is completed
        }

        return 5 - this.hand.length;
    }

    evaluateHand(hand) {
        // Modified version of https://dev.to/miketalbot/real-world-javascript-map-reduce-solving-the-poker-hand-problem-3eie
        const value_format = {
            '02': 'M',
            '03': 'L',
            '04': 'K',
            '05': 'J',
            '06': 'I',
            '07': 'H',
            '08': 'G',
            '09': 'F',
            '10': 'E',
            'J': 'D',
            'Q': 'C',
            'K': 'B',
            'A': 'A'
        }

        // Take the values of each card as a letter and sort them alphabetically (Highest values first) and sort the suits alphabetically
        const faces = hand.map(card => value_format[card.getValue()]).sort();
        const suits = hand.map(card => card.getSuit()).sort();

        // Flushes are 5 of the same suit, and straights are 5 sequential cards
        const royal = 'A' <= faces[0] && faces[0] <= 'D';
        const flush = suits[0] == suits[4];
        const straight = faces[4] == String.fromCharCode((faces[0].charCodeAt(0) + 4));
        
        // TODO: Straight has an edge case where there's a 3K and possibly 2 2K between the first and last value https://i.imgur.com/pV8a4Rp.png

        // Count up each of the times a value appears, creates object of {# Duplicates : Count}
        const suitCounts = suits.reduce(this.count, {});
        const suitDuplicates = Object.values(suitCounts).reduce(this.count, {});

        const faceCounts = faces.reduce(this.count, {});
        const faceDuplicates = Object.values(faceCounts).reduce(this.count, {});

        this.rank = (faceDuplicates[5] && 1) ||
            (royal && straight && flush && 2) ||
            (straight && flush && 3) ||
            (faceDuplicates[4] && 4) ||
            (faceDuplicates[3] && faceDuplicates[2] && 5) ||
            (straight && 6) ||
            (flush && 7) ||
            (faceDuplicates[3] && 8) ||
            (faceDuplicates[2] > 1 && 9) ||
            (faceDuplicates[2] && 10) ||
            11;
    }

    count(count, value) {
        count[value] = (count[value] || 0) + 1;
        return count;
    }

    showCard(index, col, row) {
        if (this.hand[4 - index] != null) {
            this.hand[4 - index].showImage(col, row)
        }
    }

    isFull() {
        return this.hand.length == 5;
    }
}