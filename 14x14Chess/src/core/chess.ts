import type { Board, Coord } from "./types";
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
