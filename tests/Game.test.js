import p5 from 'p5'
import { Game } from '../src/modules/Game';
import { Score } from '../src/modules/Score';
import { Timer } from '../src/modules/Timer';
import { Board } from '../src/modules/Board';


const p = new p5();

let score = new Score(p);
let timer = new Timer(p);
let board = new Board(p, timer);

const game = new Game(p, board, score, timer);

// test('Check deck length', () => {
//     game.load();
//     expect(game.deck.length).toEqual(52);
// });

// test('Check deck split', () => {
//     game.splitCards();
//     expect(game.displayMap.size).toEqual(4);
// });

test.each([
    {number: 1, expected: "一"},
    {number: 10, expected: "十"},
    {number: 100, expected: "百"},
    {number: 12, expected: "十二"},
    {number: 22, expected:"二十二"}
])(".intToKanji($number)", ({number, expected}) => {
    expect(game.intToKanji(number)).toBe(expected);
});