import { BOARD_DIM } from "./Chess.js";

export default class Piece {
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }

  isValidSquare(row, col) {
    return row >= 0 && row < BOARD_DIM && col >= 0 && col < BOARD_DIM;
  }

  getMoves(row, col, board) {
    // This should be overridden by the specific piece type.
    throw new Error(
      "This should never be called without being overridden by another subclass."
    );
  }
  getRayMoves(row, col, directions, board) {
    const moves = [];

    for (const [dr, dc] of directions) {
      for (let i = 1; ; i++) {
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
