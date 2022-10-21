import { s } from '../src/modules/GameManager';

beforeEach(() => {
    s.currentScore = 0;
});

test('Check updateScore for 5K', () => {
    s.updateScore('5K');
    expect(s.currentScore).toBe(3000);
    expect(s.pointsMap.has('5K')).toEqual(true);
});

test('Check for updateScore for RSF', () => {
    s.updateScore('RSF');
    expect(s.currentScore).toBe(2800);
    expect(s.pointsMap.has('RSF')).toEqual(true);
});

test('Check for updateScore for SF', () => {
    s.updateScore('SF');
    expect(s.currentScore).toBe(2400);
    expect(s.pointsMap.has('SF')).toEqual(true);
});

test('Check for updateScore for 4K', () => {
    s.updateScore('4K');
    expect(s.currentScore).toBe(2000);
    expect(s.pointsMap.has('4K')).toEqual(true);
});

test('Check for updateScore for FH', () => {
    s.updateScore('FH');
    expect(s.currentScore).toBe(1800);
    expect(s.pointsMap.has('FH')).toEqual(true);
});

test('Check for updateScore for ST', () => {
    s.updateScore('ST');
    expect(s.currentScore).toBe(1400);
    expect(s.pointsMap.has('ST')).toEqual(true);
});

test('Check for updateScore for FL', () => {
    s.updateScore('FL');
    expect(s.currentScore).toBe(1000);
    expect(s.pointsMap.has('FL')).toEqual(true);
});

test('Check for updateScore for 3K', () => {
    s.updateScore('3K');
    expect(s.currentScore).toBe(800);
    expect(s.pointsMap.has('3K')).toEqual(true);
});

test('Check for updateScore for 2P', () => {
    s.updateScore('2P');
    expect(s.currentScore).toBe(600);
    expect(s.pointsMap.has('2P')).toEqual(true);
});

test('Check for updateScore for 1P', () => {
    s.updateScore('1P');
    expect(s.currentScore).toBe(200);
    expect(s.pointsMap.has('1P')).toEqual(true);
});

test('Check for updateScore for H', () => {
    s.updateScore('H');
    expect(s.currentScore).toBe(0);
    expect(s.pointsMap.has('H')).toEqual(true);
});