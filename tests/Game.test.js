import { game } from '../src/modules/GameManager';

test('Check deck length', () => {
    game.load();
    expect(game.deck.length).toEqual(52);
});