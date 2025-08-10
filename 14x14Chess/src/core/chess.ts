import type { Board, Coord, Move } from "./types";
export function cloneboard(b: Board) {
  return JSON.parse(JSON.stringify(b));
}
export function applyMove(
  [fromR, fromC]: Coord,
  [toR, toC]: Coord,
  board: Board
) {
  const newboard = cloneboard(board);
  newboard[toR][toC] = newboard[fromR][fromC];
  newboard[fromR][fromC] = null;
  return newboard;
}

export function undoMove(move: Move, board: Board) {
  const { from, to, capturedPiece, piece } = move;
  const newBoard = cloneboard(board);
  newBoard[to[0]][to[1]] = capturedPiece;
  newBoard[from[0]][from[1]] = piece;
  return {
    newBoard: newBoard,
    previousBoard: board,
  };
}
