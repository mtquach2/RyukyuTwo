import {Game} from '../src/modules/Game';

let game = new Game();

test('Adds 1 + 2 to equal 3', () => {
    expect(game.add(1, 2)).toBe(3);
});