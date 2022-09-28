import { Cards } from './Cards';

export class Board {
    board: Cards[][]
    constructor() {
        this.board = [[], [], [], [], []];
    }
}