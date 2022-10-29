import { Score } from '../src/modules/Score';

const score = new Score(null);

beforeEach(() => {
    score.currentScore = 0;
});

test('Check updateScore for 5K', () => {
    score.updateScore('5K');
    expect(score.currentScore).toBe(3000);
    expect(score.pointsMap.has('5K')).toEqual(true);
});

test('Check updateScore for RSF', () => {
    score.updateScore('RSF');
    expect(score.currentScore).toBe(2800);
    expect(score.pointsMap.has('RSF')).toEqual(true);
});

test('Check updateScore for SF', () => {
    score.updateScore('SF');
    expect(score.currentScore).toBe(2400);
    expect(score.pointsMap.has('SF')).toEqual(true);
});

test('Check updateScore for 4K', () => {
    score.updateScore('4K');
    expect(score.currentScore).toBe(2000);
    expect(score.pointsMap.has('4K')).toEqual(true);
});

test('Check updateScore for FH', () => {
    score.updateScore('FH');
    expect(score.currentScore).toBe(1800);
    expect(score.pointsMap.has('FH')).toEqual(true);
});

test('Check updateScore for ST', () => {
    score.updateScore('ST');
    expect(score.currentScore).toBe(1400);
    expect(score.pointsMap.has('ST')).toEqual(true);
});

test('Check updateScore for FL', () => {
    score.updateScore('FL');
    expect(score.currentScore).toBe(1000);
    expect(score.pointsMap.has('FL')).toEqual(true);
});

test('Check updateScore for 3K', () => {
    score.updateScore('3K');
    expect(score.currentScore).toBe(800);
    expect(score.pointsMap.has('3K')).toEqual(true);
});

test('Check updateScore for 2P', () => {
    score.updateScore('2P');
    expect(score.currentScore).toBe(600);
    expect(score.pointsMap.has('2P')).toEqual(true);
});

test('Check updateScore for 1P', () => {
    score.updateScore('1P');
    expect(score.currentScore).toBe(200);
    expect(score.pointsMap.has('1P')).toEqual(true);
});

test('Check updateScore for H', () => {
    score.updateScore('H');
    expect(score.currentScore).toBe(0);
    expect(score.pointsMap.has('H')).toEqual(true);
});