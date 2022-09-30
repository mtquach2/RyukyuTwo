const Game = require('./add')
const game = new Game()
test('Adds 1 + 2 to equal 3', () => {
    expect(game.add(1, 2)).toBe(3);
});