import { Card } from "../src/modules/Card";
import { Hand } from "../src/modules/Hand";

const diamonds_ace = new Card(null, "d", "A", null);

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

const spades_two = new Card(null, "s", "02", null);
const spades_four = new Card(null, "s", "04", null);
const spades_six = new Card(null, "s", "06", null);
const spades_ace = new Card(null, "s", "A", null);

const clubs_ace = new Card(null, "c", "A", null);

test('Evaluate high returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_five, spades_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(11);
});

test('Evaluate one-pair returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_ace, spades_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(10);
});

test('Evaluate two-pair returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_four, spades_four, hearts_ace, spades_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(9);
});

test('Evaluate three-of-a-kind returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_ace, diamonds_ace, spades_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(8);
});

test('Evaluate flush (hearts) returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_five, hearts_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(7);
});

test('Evaluate straight (hearts) returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_five, spades_six];
    hand.evaluateHand()
    expect(hand.rank).toEqual(6);
});

test('Evaluate full house returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_ace, diamonds_ace, spades_two, spades_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(5);
});

test('Evaluate three-of-a-kind returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_ace, diamonds_ace, spades_ace, clubs_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(4);
});

test('Evaluate straight flush (hearts) returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_five, hearts_six];
    hand.evaluateHand()
    expect(hand.rank).toEqual(3);
});

test('Evaluate royal straight flush (hearts) returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_ten, hearts_jack, hearts_queen, hearts_king, hearts_ace];
    hand.evaluateHand()
    expect(hand.rank).toEqual(2);
});