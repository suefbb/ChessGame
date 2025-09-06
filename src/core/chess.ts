import { initialBoard, type Board, type Coord, type Move } from "./types";
import { BOARD_DIM } from "./utils";
export function cloneBoard(b: Board): Board {
  return JSON.parse(JSON.stringify(b));
}
const SHORT_CASTLE = -3;
const LONG_CASTLE = 4;
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
  let isShortCastle: boolean = false;
  let isLongCastle: boolean = false;
  if (newBoard[fromR][fromC]?.type == "K") {
    const result = isCastlingMove([fromR, fromC], [toR, toC]);
    isLongCastle = result.isLongCastle;
    isShortCastle = result.isShortCastle;
  }
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

/**
 * THIS FUNCTION DOESN'T CHECK IF IT'S A KING OR NOT IT'S THE RESPONSIBILITY OF THE CALLER.
 * @param param0
 * @param param1
 * @returns
 */
export function isCastlingMove([, fromC]: Coord, [, toC]: Coord) {
  return {
    isShortCastle: fromC - toC == SHORT_CASTLE,
    isLongCastle: fromC - toC == LONG_CASTLE,
  };
}
