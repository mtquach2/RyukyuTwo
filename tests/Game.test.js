import {Game} from '../src/modules/Game';
const game = new Game()
test('Check deck length', () => {
    expect(game.deck.length).toEqual(4);
});