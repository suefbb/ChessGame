import Piece from "../Piece.js";

export default class Knight extends Piece {
  constructor(color) {
    super(color, "N");
    this.directions = [
      { r: -2, c: -1 },
      { r: -2, c: 1 },
      { r: -1, c: -2 },
      { r: -1, c: 2 },
      { r: 1, c: -2 },
      { r: 1, c: 2 },
      { r: 2, c: -1 },
      { r: 2, c: 1 },
    ];
  }
  getMoves(row, col, board) {
    let moves = [];
    for (const direction of this.directions) {
      const newRow = row + direction.r;
      const newCol = col + direction.c;

      if (this.isValidSquare(newRow, newCol)) {
        const targetSquare = board[newRow][newCol];
        if (targetSquare == null || targetSquare.color != this.color) {
          moves.push([newRow, newCol]);
        }
      }
    }
    return moves;
  }
}
