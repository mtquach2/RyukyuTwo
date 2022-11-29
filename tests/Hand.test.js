import { Card } from "../src/modules/Card";
import { Hand } from "../src/modules/Hand";

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

const diamonds_two = new Card(null, "d", "02", null);
const diamonds_three = new Card(null, "d", "03", null);
const diamonds_four = new Card(null, "d", "04", null);
const diamonds_five = new Card(null, "d", "05", null);
const diamonds_six = new Card(null, "d", "06", null);
const diamonds_ten = new Card(null, "d", "10", null);
const diamonds_jack = new Card(null, "d", "J", null);
const diamonds_queen = new Card(null, "d", "Q", null);
const diamonds_king = new Card(null, "d", "K", null);
const diamonds_ace = new Card(null, "d", "A", null);

const spades_two = new Card(null, "s", "02", null);
const spades_three = new Card(null, "s", "03", null);
const spades_four = new Card(null, "s", "04", null);
const spades_five = new Card(null, "s", "05", null);
const spades_six = new Card(null, "s", "06", null);
const spades_ten = new Card(null, "s", "10", null);
const spades_jack = new Card(null, "s", "J", null);
const spades_queen = new Card(null, "s", "Q", null);
const spades_king = new Card(null, "s", "K", null);
const spades_ace = new Card(null, "s", "A", null);

const clubs_two = new Card(null, "c", "02", null);
const clubs_three = new Card(null, "c", "03", null);
const clubs_four = new Card(null, "c", "04", null);
const clubs_five = new Card(null, "c", "05", null);
const clubs_six = new Card(null, "c", "06", null);
const clubs_ten = new Card(null, "c", "10", null);
const clubs_jack = new Card(null, "c", "J", null);
const clubs_queen = new Card(null, "c", "Q", null);
const clubs_king = new Card(null, "c", "K", null);
const clubs_ace = new Card(null, "c", "A", null);

const hearts_two = new Card(null, "h", "02", null);
const hearts_three = new Card(null, "h", "03", null);
const hearts_four = new Card(null, "h", "04", null);
const hearts_five = new Card(null, "h", "05", null);
const hearts_six = new Card(null, "h", "06", null);
const hearts_ten = new Card(null, "h", "10", null);
const hearts_jack = new Card(null, "h", "J", null);
const hearts_queen = new Card(null, "h", "Q", null);
const hearts_king = new Card(null, "h", "K", null);
const hearts_ace = new Card(null, "h", "A", null);

const wild_one = new Card(null, "wild", "wild", null);
const wild_two = new Card(null, "wild", "wild", null);
const wild_three = new Card(null, "wild", "wild", null);
const wild_four = new Card(null, "wild", "wild", null);

const hand = new Hand();

describe("Poker Hands", () => {
        test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_five, hearts_ace] },
        { handCards: [spades_two, spades_three, spades_four, spades_five, hearts_ace] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_five, hearts_ace] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_five, spades_ace] }
    ])("Evaluate high returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(11);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_ace, spades_ace] },
        { handCards: [spades_two, spades_three, spades_four, spades_ace, hearts_ace] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_ace, spades_ace] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_ace, spades_ace] }
    ])("Evaluate one-pair returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(10);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_four, diamonds_ace, spades_four, hearts_ace] },
        { handCards: [spades_two, spades_four, spades_ace, hearts_four, hearts_ace] },
        { handCards: [clubs_two, clubs_four, clubs_ace, spades_four, spades_ace] },
        { handCards: [hearts_two, hearts_four, spades_four, hearts_ace, spades_ace] }
    ])("Evaluate two-pair returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(9);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_four, diamonds_ace, spades_ace, clubs_ace] },
        { handCards: [spades_two, spades_four, spades_ace, clubs_ace, diamonds_ace] },
        { handCards: [clubs_two, clubs_four, clubs_ace, diamonds_ace, spades_ace] },
        { handCards: [hearts_two, hearts_three, hearts_ace, diamonds_ace, spades_ace] }
    ])("Evaluate three-of-a-kind returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(8);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_five, diamonds_ace] },
        { handCards: [spades_two, spades_three, spades_four, spades_five, spades_ace] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_five, clubs_ace] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_five, hearts_ace] }
    ])("Evaluate flush returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(7);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_five, hearts_six] },
        { handCards: [spades_two, spades_three, spades_four, spades_five, hearts_six] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_five, hearts_six] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_five, spades_six] }
    ])("Evaluate straight returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(6);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_ace, spades_ace, hearts_two, hearts_ace] },
        { handCards: [spades_two, spades_ace, diamonds_ace, hearts_two, hearts_ace] },
        { handCards: [clubs_two, clubs_ace, diamonds_ace, spades_two, spades_ace] },
        { handCards: [hearts_two, hearts_ace, diamonds_ace, spades_two, spades_ace] }
    ])("Evaluate full house returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(5);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_king, spades_king, clubs_king, hearts_king] },
        { handCards: [spades_two, spades_ten, diamonds_ten, clubs_ten, hearts_ten] },
        { handCards: [clubs_two, clubs_ten, diamonds_two, spades_two, hearts_two] },
        { handCards: [hearts_two, hearts_ace, diamonds_ace, spades_ace, clubs_ace] }
    ])("Evaluate four-of-a-kind returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(4);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_five, diamonds_six] },
        { handCards: [spades_two, spades_three, spades_four, spades_five, spades_six] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_five, clubs_six] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_five, hearts_six] }
    ])("Evaluate straight flush returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_ten, diamonds_jack, diamonds_queen, diamonds_king, diamonds_ace] },
        { handCards: [spades_ten, spades_jack, spades_queen, spades_king, spades_ace] },
        { handCards: [clubs_ten, clubs_jack, clubs_queen, clubs_king, clubs_ace] },
        { handCards: [hearts_ten, hearts_jack, hearts_queen, hearts_king, hearts_ace] }
    ])("Evaluate royal straight flush returns true", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });
});

describe("Wildcard Hands", () => {
    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, hearts_ace, wild_one] },
        { handCards: [spades_two, spades_three, spades_four, hearts_ace, wild_one] },
        { handCards: [clubs_two, clubs_three, clubs_four, hearts_ace, wild_one] },
        { handCards: [hearts_two, hearts_three, hearts_four, spades_ace, wild_one] }
    ])("Evalute one-pair returns true with one wild card", ( { handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(10);
    });
    
    test.each([
        { handCards: [diamonds_two, hearts_two, spades_six, clubs_ace, wild_one] },
        { handCards: [spades_two, hearts_two, diamonds_six, clubs_ace, wild_one] },
        { handCards: [clubs_two, hearts_two, spades_six, diamonds_ace, wild_one] },
        { handCards: [diamonds_two, hearts_two, spades_six, clubs_ace, wild_one] }
    ])("Evaluate three-of-a-kind returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(8);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, hearts_ace, wild_one, wild_two] },
        { handCards: [spades_two, spades_four, hearts_ace, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_four, hearts_ace, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_three, diamonds_ace, wild_one, wild_two] }
    ])("Evaluate three-of-a-kind returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(8);
    });

    // No three-wild case because flush would promote to four-of-a-kind
    test.each([
        { handCards: [diamonds_ace, diamonds_three, diamonds_four, diamonds_five, wild_one] },
        { handCards: [spades_ace, spades_three, spades_four, spades_five, wild_one] },
        { handCards: [clubs_ace, clubs_three, clubs_four, clubs_five, wild_one] },
        { handCards: [hearts_ace, hearts_three, hearts_four, hearts_five, wild_one] }
    ])("Evaluate flush returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(7);
    });

    test.each([
        { handCards: [diamonds_ace, diamonds_three, diamonds_four, wild_one, wild_two] },
        { handCards: [spades_ace, spades_three, spades_four, wild_one, wild_two] },
        { handCards: [clubs_ace, clubs_three, clubs_four, wild_one, wild_two] },
        { handCards: [hearts_ace, hearts_three, hearts_four, wild_one, wild_two] }
    ])("Evaluate flush returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(7);
    });

    // No three-wild case because straight would promote to four-of-a-kind
    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, hearts_five, wild_one] },
        { handCards: [spades_two, spades_three, spades_four, hearts_five, wild_one] },
        { handCards: [clubs_two, clubs_three, clubs_four, hearts_five, wild_one] },
        { handCards: [hearts_two, hearts_three, hearts_four, diamonds_five, wild_one] }
    ])("Evaluate straight returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(6);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, hearts_four, wild_one, wild_two] },
        { handCards: [spades_two, spades_three, hearts_four, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_three, hearts_four, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_three, diamonds_four, wild_one, wild_two] }
    ])("Evaluate straight returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(6);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_four, hearts_six, wild_one, wild_two] },
        { handCards: [spades_two, spades_four, hearts_six, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_four, hearts_six, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_four, diamonds_six, wild_one, wild_two] }
    ])("Evaluate straight returns true with two wild cards and two one-gaps", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(6);
    });

    test.each([
        { handCards: [diamonds_two, hearts_five, hearts_six, wild_one, wild_two] },
        { handCards: [spades_two, hearts_five, hearts_six, wild_one, wild_two] },
        { handCards: [clubs_two, hearts_five, hearts_six, wild_one, wild_two] },
        { handCards: [hearts_two, diamonds_five, diamonds_six, wild_one, wild_two] }
    ])("Evaluate straight returns true with two wild cards and a two-gap", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(6);
    });

    // No two-wild or three-wild case because the conditions for that with full house imply four-of-a-kind
    test.each([
        { handCards: [diamonds_two, diamonds_ace, spades_ace, hearts_two, wild_one] },
        { handCards: [spades_two, spades_ace, diamonds_ace, hearts_two, wild_one] },
        { handCards: [clubs_two, clubs_ace, diamonds_ace, spades_two, wild_one] },
        { handCards: [hearts_two, hearts_ace, diamonds_ace, spades_two, wild_one] }
    ])("Evaluate full house returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(5);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_king, spades_king, clubs_king, hearts_king] },
        { handCards: [spades_two, spades_ten, diamonds_ten, clubs_ten, hearts_ten] },
        { handCards: [clubs_two, clubs_ten, diamonds_two, spades_two, hearts_two] },
        { handCards: [hearts_two, hearts_ace, diamonds_ace, spades_ace, clubs_ace] }
    ])("Evaluate four-of-a-kind returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(4);
    });
    
    test.each([
        { handCards: [diamonds_two, hearts_two, diamonds_three, wild_one, wild_two] },
        { handCards: [spades_two, diamonds_two, diamonds_three, wild_one, wild_two] },
        { handCards: [clubs_two, diamonds_two, diamonds_three, wild_one, wild_two] },
        { handCards: [hearts_two, diamonds_two, clubs_three, wild_one, wild_two] }
    ])("Evaluate four-of-a-kind returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(4);
    });

    test.each([
        { handCards: [diamonds_two, hearts_three, wild_one, wild_two, wild_three] },
        { handCards: [spades_two, diamonds_three, wild_one, wild_two, wild_three] },
        { handCards: [clubs_two, diamonds_three, wild_one, wild_two, wild_three] },
        { handCards: [hearts_two, diamonds_three, wild_one, wild_two, wild_three] }
    ])("Evaluate four-of-a-kind returns true with three wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(4);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, diamonds_five, wild_one] },
        { handCards: [spades_two, spades_three, spades_four, spades_five, wild_one] },
        { handCards: [clubs_two, clubs_three, clubs_four, clubs_five, wild_one] },
        { handCards: [hearts_two, hearts_three, hearts_four, hearts_five, wild_one] }
    ])("Evaluate straight flush returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, wild_one, wild_two] },
        { handCards: [spades_two, spades_three, spades_four, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_three, clubs_four, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_three, hearts_four, wild_one, wild_two] }
    ])("Evaluate straight flush returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_three, wild_one, wild_two, wild_three] },
        { handCards: [spades_two, spades_three, wild_one, wild_two, wild_three] },
        { handCards: [clubs_two, clubs_three, wild_one, wild_two, wild_three] },
        { handCards: [hearts_two, hearts_three, wild_one, wild_two, wild_three] }
    ])("Evaluate straight flush returns true with three wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_four, diamonds_six, wild_one, wild_two] },
        { handCards: [spades_two, spades_four, spades_six, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_four, clubs_six, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_four, hearts_six, wild_one, wild_two] }
    ])("Evaluate straight flush returns true with two wild cards and two one-gaps", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_six, wild_one, wild_two, wild_three] },
        { handCards: [spades_two, spades_six, wild_one, wild_two, wild_three] },
        { handCards: [clubs_two, clubs_six, wild_one, wild_two, wild_three] },
        { handCards: [hearts_two, hearts_six, wild_one, wild_two, wild_three] }
    ])("Evaluate straight flush returns true with three wild cards and a three-gap", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(3);
    });

    test.each([
        { handCards: [diamonds_ten, diamonds_jack, diamonds_queen, diamonds_king, wild_one] },
        { handCards: [spades_ten, spades_jack, spades_queen, spades_king, wild_one] },
        { handCards: [clubs_ten, clubs_jack, clubs_queen, clubs_king, wild_one] },
        { handCards: [hearts_ten, hearts_jack, hearts_queen, hearts_king, wild_one] }
    ])("Evaluate royal straight flush returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_ten, diamonds_jack, diamonds_queen, wild_one, wild_two] },
        { handCards: [spades_ten, spades_jack, spades_queen, wild_one, wild_two] },
        { handCards: [clubs_ten, clubs_jack, clubs_queen, wild_one, wild_two] },
        { handCards: [hearts_ten, hearts_jack, hearts_queen, wild_one, wild_two] }
    ])("Evaluate royal straight flush returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_ten, diamonds_jack, wild_one, wild_two, wild_three] },
        { handCards: [spades_ten, spades_jack, wild_one, wild_two, wild_three] },
        { handCards: [clubs_ten, clubs_jack, wild_one, wild_two, wild_three] },
        { handCards: [hearts_ten, hearts_jack, wild_one, wild_two, wild_three] }
    ])("Evaluate royal straight flush returns true with three wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_ten, diamonds_queen, diamonds_ace, wild_one, wild_two] },
        { handCards: [spades_ten, spades_queen, spades_ace, wild_one, wild_two] },
        { handCards: [clubs_ten, clubs_queen, clubs_ace, wild_one, wild_two] },
        { handCards: [hearts_ten, hearts_queen, hearts_ace, wild_one, wild_two] }
    ])("Evaluate royal straight flush returns true with two wild cards and two one-gaps", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_jack, diamonds_queen, wild_one, wild_two, wild_three] },
        { handCards: [spades_jack, spades_queen, wild_one, wild_two, wild_three] },
        { handCards: [clubs_jack, clubs_queen, wild_one, wild_two, wild_three] },
        { handCards: [hearts_jack, hearts_queen, wild_one, wild_two, wild_three] }
    ])("Evaluate royal straight flush returns true with three wild cards and three one-gaps", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(2);
    });
    
    test.each([
        { handCards: [diamonds_ten, spades_ten, clubs_ten, hearts_ten, wild_one] },
        { handCards: [diamonds_ace, spades_ace, clubs_ace, hearts_ace, wild_one] },
        { handCards: [diamonds_four, spades_four, clubs_four, hearts_four, wild_one] },
        { handCards: [diamonds_six, spades_six, clubs_six, hearts_six, wild_one] }
    ])("Evaluate five-of-a-kind returns true with one wild card", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(1);
    });

    test.each([
        { handCards: [diamonds_ten, spades_ten, clubs_ten, wild_one, wild_two] },
        { handCards: [diamonds_ace, spades_ace, clubs_ace, wild_one, wild_two] },
        { handCards: [diamonds_four, spades_four, clubs_four, wild_one, wild_two] },
        { handCards: [diamonds_six, spades_six, clubs_six, wild_one, wild_two] }
    ])("Evaluate five-of-a-kind returns true with two wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(1);
    });
    
    test.each([
        { handCards: [diamonds_ten, spades_ten, wild_one, wild_two, wild_three] },
        { handCards: [diamonds_ace, spades_ace, wild_one, wild_two, wild_three] },
        { handCards: [diamonds_four, spades_four, wild_one, wild_two, wild_three] },
        { handCards: [diamonds_six, spades_six, wild_one, wild_two, wild_three] }
    ])("Evaluate five-of-a-kind returns true with three wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(1);
    });

    test.each([
        { handCards: [diamonds_ten, wild_one, wild_two, wild_three, wild_four] },
        { handCards: [diamonds_ace, wild_one, wild_two, wild_three, wild_four] },
        { handCards: [diamonds_four, wild_one, wild_two, wild_three, wild_four] },
        { handCards: [diamonds_six, wild_one, wild_two, wild_three, wild_four] }
    ])("Evaluate five-of-a-kind returns true with four wild cards", ({ handCards }) => {
        hand.hand = handCards;
        hand.evaluateHand();
        expect(hand.rank).toEqual(1);
    });
});

describe("Straight Gap", () => {
    test.each([
        { handCards: [diamonds_two, diamonds_three, diamonds_four, hearts_ace, wild_one] },
        { handCards: [spades_two, spades_three, spades_four, hearts_ace, wild_one] },
        { handCards: [clubs_two, clubs_three, clubs_four, hearts_ace, wild_one] },
        { handCards: [hearts_two, hearts_three, hearts_four, spades_ace, wild_one] }
    ])("Evalute straight gap from 4 to A to be 9", ( { handCards }) => {
        const faces = handCards.filter(card => card.getSuit() != "wild").map(card => value_format[card.getValue()]).sort();
        const gap = hand.straightGap(faces);
        expect(gap).toEqual(9);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_four, diamonds_six, wild_one, wild_two] },
        { handCards: [spades_two, spades_four, spades_six, wild_one, wild_two] },
        { handCards: [clubs_two, clubs_four, clubs_six, wild_one, wild_two] },
        { handCards: [hearts_two, hearts_four, hearts_six, wild_one, wild_two] }
    ])("Evalute straight gap from 2 to 4 to 6 to be 2", ( { handCards }) => {
        const faces = handCards.filter(card => card.getSuit() != "wild").map(card => value_format[card.getValue()]).sort();
        const gap = hand.straightGap(faces);
        expect(gap).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_five, wild_one, wild_two, wild_three] },
        { handCards: [spades_two, spades_five, wild_one, wild_two, wild_three] },
        { handCards: [clubs_two, clubs_five, wild_one, wild_two, wild_three] },
        { handCards: [hearts_two, hearts_five, wild_one, wild_two, wild_three] }
    ])("Evalute straight gap from 2 to 5 to be 2", ( { handCards }) => {
        const faces = handCards.filter(card => card.getSuit() != "wild").map(card => value_format[card.getValue()]).sort();
        const gap = hand.straightGap(faces);
        expect(gap).toEqual(2);
    });

    test.each([
        { handCards: [diamonds_two, diamonds_six, wild_one, wild_two, wild_three] },
        { handCards: [spades_two, spades_six, wild_one, wild_two, wild_three] },
        { handCards: [clubs_two, clubs_six, wild_one, wild_two, wild_three] },
        { handCards: [hearts_two, hearts_six, wild_one, wild_two, wild_three] }
    ])("Evalute straight gap from 2 to 6 to be 3", ( { handCards }) => {
        const faces = handCards.filter(card => card.getSuit() != "wild").map(card => value_format[card.getValue()]).sort();
        const gap = hand.straightGap(faces);
        expect(gap).toEqual(3);
    });
});