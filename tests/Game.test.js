import p5 from 'p5';
import { Game } from '../src/modules/Game';

const game = new Game();
const p = new p5();

test('Check deck length', () => {
    expect(game.deck.length).toEqual(4);
});