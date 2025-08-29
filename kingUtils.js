import { BOARD_DIM, findPiece, switchTurn } from "./utils.js";
import { getCaptures } from "./pieces.js";
import { movePiece } from "./chess.js";

function calcDangerSquares(attackerColor, board) {
  let squares = [];
  for (let i = 1; i < BOARD_DIM; i++) {
    for (let j = 1; j < BOARD_DIM; j++) {
      let targetPiece = board[i][j];
      if (!targetPiece) continue;
      if (targetPiece[0] !== attackerColor) continue;
      squares.push(...getCaptures(i, j, board));
    }
  }
  return squares;
}
export function isKingInCheck(kingColor, board) {
  const kingCoords = findPiece("K", kingColor, board);
  if (!kingCoords) {
    console.error("No King available on board.");
    return false;
  }
  const [row, col] = kingCoords;
  const opponentColor = switchTurn(kingColor);
  const dangerSquares = calcDangerSquares(opponentColor, board);
  return dangerSquares.some(([r, c]) => r == row && c == col);
}

export function isMoveLeavingKingInCheck(
  [fromR, fromC],
  [toR, toC],
  board,
  kingColor
) {
  let tempBoard = board;
  // Perform the hypothetical move on the temporary board.
  movePiece([fromR, fromC], [toR, toC], tempBoard);
  // Check if the king of the 'kingColor' (current player's color) is in check on the tempBoard.
  return isKingInCheck(kingColor, tempBoard);
}
