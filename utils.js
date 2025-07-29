export const BOARD_DIM = 15;

export function isCapture(row, col, board) {
  const wasSquareOccupied = board[row][col] == null ? false : true;
  return isValidSquare(row, col) && wasSquareOccupied;
}
export function isValidSquare(row, col) {
  return row >= 1 && row < BOARD_DIM && col >= 1 && col < BOARD_DIM;
}
