import { Card } from "../src/modules/Card";
import { Hand } from "../src/modules/Hand";

const diamonds_ace = new Card(null, "d", "A", null);

const hearts_two = new Card(null, "h", "2", null);
const hearts_three = new Card(null, "h", "3", null);
const hearts_four = new Card(null, "h", "4", null);
const hearts_five = new Card(null, "h", "5", null);
const heart_ace = new Card(null, "h", "A", null);

const spades_ace = new Card(null, "s", "A", null);

const clubs_ace = new Card(null, "c", "A", null);

test('Evaluate high returns true', () => {
    const hand = new Hand();
    hand.hand = [hearts_two, hearts_three, hearts_four, hearts_five, spades_ace];
    expect(hand.evaluateHand(hand)).toEqual(11);
});
