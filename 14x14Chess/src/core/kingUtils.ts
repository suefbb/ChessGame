import { BOARD_DIM, findPiece, switchTurn } from "./utils.js";
import { getCaptures } from "./pieces";
import { applyMove } from "./chess";
import type { Board, Color, Coord, Coords } from "./types.js";

function calcDangerSquares(attackerColor: Color, board: Board) {
  const squares: Coords = [];
  for (let i = 0; i < BOARD_DIM; i++) {
    for (let j = 0; j < BOARD_DIM; j++) {
      const targetPiece = board[i][j];
      if (!targetPiece) continue;
      if (targetPiece.color !== attackerColor) continue;
      squares.push(...getCaptures(i, j, board));
    }
  }
  return squares;
}
export function isKingInCheck(kingColor: Color, board: Board) {
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
  [fromR, fromC]: Coord,
  [toR, toC]: Coord,
  board: Board,
  kingColor: Color
) {
  // Perform the hypothetical move on the temporary board.
  const newBoard = applyMove([fromR, fromC], [toR, toC], board);
  // Check if the king of the 'kingColor' (current player's color) is in check on the tempBoard.
  return isKingInCheck(kingColor, newBoard);
}
