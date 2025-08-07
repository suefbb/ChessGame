// This file is used for reading PGN and making/using them.

import { isCapture } from "./utils.js";

export function convertMoveToNotation([fromR, fromC], [toR, toC], board) {
  const pieceType = board[fromR][fromC][1];
  const files = "abcdefghijklmn";
  const wasCapture = isCapture(toR, toC, board);
  let notationString = "";
  if (pieceType == "p" && wasCapture) notationString += `${files[fromC - 1]}`;
  else notationString += pieceType != "p" ? pieceType : "";
  notationString += wasCapture ? "x" : "";
  notationString += `${files[toC - 1]}${Math.abs(toR - 15)}`;
  return {
    notationString,
    pieceType,
    startCoords: [fromR, fromC],
    endCoords: [toR, toC],
  };
}

function convertNotationToMoves({ startCoords, endCoords, pieceType }) {
  return {
    startCoords,
    endCoords,
    pieceType,
  };
}
export function checkPgnAlignment(moveIndex, pgnMoves) {
  console.log(pgnMoves);
  if (moveIndex !== pgnMoves.length - 1 && pgnMoves.length !== 0) {
    for (let RM = 0; RM < pgnMoves.length; RM++) {
      if (moveIndex !== pgnMoves.length - 1) {
        pgnMoves.splice(pgnMoves.length - 2, 1);
      } else {
        break;
      }
    }
  }
  console.log(pgnMoves);
}