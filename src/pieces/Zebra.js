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
    // Getting the normal bishop moves.
    moves.push(...this.getRayMoves(row, col, this.NORMAL_DIR, board));

    // this is just moving up one square and putting a bishop that can only look for UP LEFT and UP RIGHT.
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
    // The same as the above but looking only for DOWN LEFT and DOWN RIGHT.
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
