export class Hand {
    constructor() {
        this.hand = [];
        this.rank = 0;
        this.rankTable = {
            0: "🌸",
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

    addCard(card, score) {
        this.hand.push(card);

        if (this.hand.length == 5) {
            this.evaluateHand();
            score.updateScore(this.rankTable[this.rank]); //updates score right when hand is completed
        }

        return 5 - this.hand.length;
    }

    evaluateWild(faces, suits, wilds) {
        // Flushes are 5 of the same suit, and straights are 5 sequential cards
        const royal = 'A' <= faces[4 - wilds] && faces[4 - wilds] <= 'E';
        const flush = suits[0] == suits[4 - wilds];
        const straightGap = this.straightGap(faces);
        const straight = this.isStraight(faces) || straightGap <= wilds;
        
        // Count up each of the times a value appears, creates object of {# Duplicates : Count}
        const faceCounts = faces.reduce(this.count, {});
        const faceDuplicates = Object.values(faceCounts).reduce(this.count, {});

        // Do not need to check if wilds == 1 because it is implied, wilds == 2 is automatically 3K or better, wilds == 3 is automatically 4K or better
        // High and Two-Pair are not possible (1P > H, 3K > 2P)
        this.rank = ((faceDuplicates[4] || (faceDuplicates[3] && wilds == 2) || (faceDuplicates[2] == 1 && wilds == 3) || wilds == 4) && 1) ||
            (royal && straight && flush && 2) ||
            (straight && flush && 3) ||
            ((faceDuplicates[3] || (faceDuplicates[2] && wilds == 2) || (wilds == 3)) && 4) ||
            ((faceDuplicates[2] == 2) && 5) ||
            (straight && 6) ||
            (flush && 7) ||
            (((faceDuplicates[2] == 1) || (faceDuplicates[1] == 3 && wilds == 2)) && 8) ||
            10
    }

    evaluateHand() {
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
        const faces = this.hand.filter(card => card.getSuit() != "wild").map(card => value_format[card.getValue()]).sort();
        const suits = this.hand.filter(card => card.getSuit() != "wild").map(card => card.getSuit()).sort();
        const wilds = this.hand.filter(card => card.getSuit() === "wild").length;

        if (wilds > 0) {
            this.evaluateWild(faces, suits, wilds);
        }
        else {
            // Flushes are 5 of the same suit, and straights are 5 sequential cards
            const royal = 'A' <= faces[4] && faces[4] <= 'E';
            const flush = suits[0] == suits[4];
            const straight = this.isStraight(faces);

            // Count up each of the times a value appears, creates object of {# Duplicates : Count}
            const faceCounts = faces.reduce(this.count, {});
            const faceDuplicates = Object.values(faceCounts).reduce(this.count, {});

            this.rank = (royal && straight && flush && 2) ||
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
    }

    count(count, value) {
        count[value] = (count[value] || 0) + 1;
        return count;
    }

    isStraight(faces) {
        for (let i = 0; i < faces.length - 1; i++) {
            if (String.fromCharCode((faces[i].charCodeAt(0) + 1)) != faces[i + 1]) {
                return false;
            }
        }
        return true;
    }

    straightGap(faces) {
        let gap = 0;
        for (let i = 0; i < faces.length - 1; i++) {
            // Adds to gap if faces are the same to avoid undercounting
            if (String.fromCharCode((faces[i].charCodeAt(0))) == faces[i + 1]) {
                gap += 1;
            }
            else if (String.fromCharCode((faces[i].charCodeAt(0) + 1)) != faces[i + 1]) {
                gap += faces[i + 1].charCodeAt(0) - faces[i].charCodeAt(0) - 1;
            }
        }
        return gap;
    }

    showCard(index, col, row, scaleX, scaleY) {
        if (this.hand[4 - index] != null) {
            this.hand[4 - index].showImage(col, row, scaleX, scaleY);
        }
    }

    isFull() {
        return this.hand.length == 5;
    }
}