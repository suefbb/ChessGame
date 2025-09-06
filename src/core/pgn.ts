import { isCastlingMove } from "./chess";
import type { Coord, Move } from "./types";

function convertCoordToSan(coord: Coord) {
  console.log(coord);

  const cols = "abcdefghijklmn";
  return `${cols[coord[1]]}${14 - coord[0]}`;
}

/**
 * An extremely primitive function to convert moves to a SAN string.
 * It doesn't handle edge cases well.
 * @param move
 */
export function convertMoveToSan(move: Move): string {
  let san = "";
  const startCoord = convertCoordToSan(move.from);
  const endCoord = convertCoordToSan(move.to);

  if (move.piece.type == "p") {
    if (move.capturedPiece) {
      san = `${startCoord[0]}x${endCoord}`;
    } else {
      san = endCoord;
    }
    return san;
  }
  if (move.piece.type == "K") {
    const isCastling = isCastlingMove(move.from, move.to);
    if (isCastling.isLongCastle || isCastling.isShortCastle) {
      if (isCastling.isLongCastle) san = "O-O-O";
      else if (isCastling.isShortCastle) san = "O-O";
      return san;
    }
  }
  // Handling the rest of the pieces.
  san += `${move.piece.type}`;
  if (move.capturedPiece) san += "x";
  san += `${convertCoordToSan(move.to)}`;

  return san;
}

export function convertHistoryToPgn(history: Move[]) {
  const pgn = new Array<string>();
  for (const move of history) {
    pgn.push(convertMoveToSan(move));
  }
  return pgn;
}
