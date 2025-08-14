import { initialBoard, type Board, type Coord, type Move } from "./types";
import { BOARD_DIM } from "./utils";
export function cloneBoard(b: Board): Board {
  return JSON.parse(JSON.stringify(b));
}
/**
 * This function applies moves to a given chess board by returning a new board variable.
 * This funcion handles normal moves, but also handles castling.
 * @param param0 Starting coordinates of the piece to be moved.
 * @param param1 The final destination for the piece to be moved.
 * @param board The board which will be copied.
 * @returns The new board that has the move applied to it.
 */
export function applyMove(
  [fromR, fromC]: Coord,
  [toR, toC]: Coord,
  board: Board
) {
  const newBoard = cloneBoard(board);
  //                                                          7       10    -3
  const isShortCastle =
    newBoard[fromR][fromC]?.type == "K" && fromC - toC == -3;
  //                                                          7       3     4
  const isLongCastle = newBoard[fromR][fromC]?.type == "K" && fromC - toC == 4;

  // Execute move
  newBoard[toR][toC] = newBoard[fromR][fromC];
  newBoard[fromR][fromC] = null;
  if (newBoard[toR][toC]) newBoard[toR][toC].hasMoved = true;
  if (isShortCastle) {
    const rookCol = BOARD_DIM - 1;
    newBoard[fromR][rookCol - 4] = newBoard[fromR][rookCol];
    newBoard[fromR][rookCol] = null;
    newBoard[fromR][rookCol - 4]!.hasMoved = true;
  }
  if (isLongCastle) {
    const rookCol = 0;
    newBoard[fromR][rookCol + 4] = newBoard[fromR][rookCol];
    newBoard[fromR][rookCol] = null;
    newBoard[fromR][rookCol + 4]!.hasMoved = true;
  }
  return newBoard;
}

/**
 * This function takes the history of the game and plays every move out.
 * This approach is used to automatically take care of things like undoing
 * promotions or castling.
 * @param history
 * @param upto The upper limits for going up the history, non-inclusive.
 * @returns A new board that's built from the grounds up, move by move.
 */
export function buildBoardFromHistory(history: Move[], upto: number): Board {
  let board = cloneBoard(initialBoard);
  for (let i = 0; i < upto; i++) {
    board = applyMove(history[i].from, history[i].to, board);
  }
  return board;
}
