// import { useState } from "react";
// import { initialBoard } from "../core/types";
// import Board from "./Board";
// import { GameContext } from "../context/GameContext";

import { useState } from "react";
import {
  type Color,
  initialBoard,
  type Coords,
  type Board as BoardT,
} from "../core/types";
import BoardWrapper from "./BoardWrapper";
import Board from "./Board";
import { getMoves } from "../core/pieces";
import { applyMove } from "../core/chess";
import { isMoveLeavingKingInCheck } from "../core/kingUtils";
import { switchTurn } from "../core/utils";
interface ISelectedPiece {
  row: number;
  col: number;
  piece: string;
}

export default function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState<Color>("w");
  const [selectedPiece, setSelectedPiece] = useState<ISelectedPiece | null>(
    null
  );

  const [history, setHistory] = useState<BoardT[]>([]);
  const [legalMoves, setLegalMoves] = useState<Coords>([]);
  const handleSquareClick = (row: number, col: number) => {
    const clickedPiece = board[row][col];
    if (!selectedPiece) {
      if (!clickedPiece || clickedPiece[0] != currentTurn) return;
      setSelectedPiece({ row: row, col: col, piece: clickedPiece });
      const moves = getMoves(row, col, board).filter(
        (move) =>
          !isMoveLeavingKingInCheck([row, col], move, board, currentTurn)
      );

      setLegalMoves(moves);
      return;
    }
    const isLegalMove = legalMoves?.some(
      (move) => move[0] == row && move[1] == col
    );
    // console.log(legalMoves);
    if (!isLegalMove) {
      setSelectedPiece(null);
      setLegalMoves([]);
      return;
    }
    const newBoard = applyMove(
      [selectedPiece.row, selectedPiece.col],
      [row, col],
      board
    );
    setHistory([...(history as BoardT[]), board]);
    setBoard(newBoard);
    setCurrentTurn(switchTurn(currentTurn));
    setSelectedPiece(null);
    setLegalMoves([]);
    console.log(history);
  };
  return (
    <>
      <BoardWrapper>
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          legalMoves={legalMoves}
        />
      </BoardWrapper>
    </>
  );
}
