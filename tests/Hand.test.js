import { Card } from "../src/modules/Card";
import { Hand } from "../src/modules/Hand";

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

const hand = new Hand();

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