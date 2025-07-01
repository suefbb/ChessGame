import Piece from "../Piece.js";

export default class Zebra extends Piece {
  constructor(color) {
    super(color, "Z");
    this.NORMAL_DIR = [
      [-1, -1], // UP LEFT
      [-1, 1], // UP RIGHT
      [1, -1], // DOWN LEFT
      [1, 1], // DOWN RIGHT
    ];
  }

  getMoves(row, col, board) {
    let moves = [];
    moves.push(...this.getRayMoves(row, col, this.NORMAL_DIR, board));

    if (this.isValidSquare(row - 1, col))
      moves.push(
        ...this.getRayMoves(
          row - 1,
          col,
          [
            [-1, -1],
            [-1, 1],
          ],
          board
        )
      );
    if (this.isValidSquare(row + 1, col))
      moves.push(
        ...this.getRayMoves(
          row + 1,
          col,
          [
            [1, -1],
            [1, 1],
          ],
          board
        )
      );
    return moves;
  }
}
