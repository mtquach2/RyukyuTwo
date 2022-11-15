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
    {number: 2, expected: "ニ"},
    {number: 3, expected: "三"},
    {number: 4, expected: "四"},
    {number: 5, expected: "五"},
    {number: 6, expected: "六"},
    {number: 7, expected: "七"},
    {number: 8, expected: "八"},
    {number: 9, expected: "九"},
    {number: 10, expected: "十"},
    {number: 12, expected: "十二"},
    {number: 22, expected:"二十二"},
    {number: 100, expected: "百"},
    {number: 111, expected: "百十一"},
    {number: 666, expected: "六百六十六"}
])(".intToKanji($number)", ({number, expected}) => {
    expect(game.intToKanji(number)).toBe(expected);
});