export const BOARD_DIM = 15;

export function isCapture(row, col, board) {
  const wasSquareOccupied = board[row][col] == null ? false : true;
  return isValidSquare(row, col) && wasSquareOccupied;
}
export function isValidSquare(row, col) {
  return row >= 1 && row < BOARD_DIM && col >= 1 && col < BOARD_DIM;
}

export function findPiece(pieceType, pieceColor, board) {
  for (let i = 1; i < BOARD_DIM; i++) {
    for (let j = 1; j < BOARD_DIM; j++) {
      let targetPiece = board[i][j];
      if (!targetPiece) continue;
      if (targetPiece[1] == pieceType && targetPiece[0] == pieceColor)
        return [i, j];
    }
  }
}
export function switchTurn(currentTurn) {
  localStorage.setItem('currentTurn' , currentTurn)
  return currentTurn == "w" ? "b" : "w";
}