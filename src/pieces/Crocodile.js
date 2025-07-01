import Piece from "../Piece.js";

export default class Crocodile extends Piece {
  constructor(color) {
    super(color, "C");
    this.directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
  }
  getMoves(row, col, board) {
    let moves = [];
    // It's basically a rook but I need it to be placed on it's side.
    if (this.isValidSquare(row, col + 1)) {
      moves.push(...this.getRayMoves(row, col + 1, this.directions, board));
    }
    if (this.isValidSquare(row, col - 1)) {
      moves.push(...this.getRayMoves(row, col - 1, this.directions, board));
    }
    return moves;
  }

  // Because I wanna include the square that the imaginary rook is standing on I need to override the function.
  getRayMoves(row, col, directions, board) {
    const moves = [];

    for (const [dr, dc] of directions) {
      // Starting from 0 instead of 1 to include the square the imaginary piece is standing on.
      for (let i = 0; ; i++) {
        // i represents distance from current piece.
        const newRow = row + dr * i;
        const newCol = col + dc * i;

        if (!this.isValidSquare(newRow, newCol)) break;

        const targetPiece = board[newRow][newCol];
        if (targetPiece == null) moves.push([newRow, newCol]);
        else {
          if (targetPiece.color != this.color) {
            moves.push([newRow, newCol]);
            break;
          }
          break;
        }
      }
    }
    return moves;
  }
}
