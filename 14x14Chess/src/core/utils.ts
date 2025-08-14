import type { Board, Color, PieceType } from "./types";

export const BOARD_DIM = 14;

export function isCapture(row: number, col: number, board: Board) {
  const wasSquareOccupied = board[row][col] == null ? false : true;
  return isValidSquare(row, col) && wasSquareOccupied;
}
export function isValidSquare(row: number, col: number) {
  return row >= 0 && row < BOARD_DIM && col >= 0 && col < BOARD_DIM;
}

export function findPiece(
  pieceType: PieceType,
  pieceColor: Color,
  board: Board
) {
  for (let i = 0; i < BOARD_DIM; i++) {
    for (let j = 0; j < BOARD_DIM; j++) {
      const targetPiece = board[i][j];
      if (!targetPiece) continue;
      if (targetPiece.type == pieceType && targetPiece.color == pieceColor)
        return [i, j];
    }
  }
}
export function switchTurn(currentTurn: Color) {
  return currentTurn == "w" ? "b" : "w";
}
