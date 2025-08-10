// import { useState } from "react";
// import { initialBoard } from "../core/types";
// import Board from "./Board";
// import { GameContext } from "../context/GameContext";

import { useState } from "react";
import {
  type Color,
  initialBoard,
  type Coords,
  type Move,
} from "../core/types";
import BoardWrapper from "./BoardWrapper";
import Board from "./Board";
import { getMoves } from "../core/pieces";
import { applyMove, undoMove } from "../core/chess";
import { isMoveLeavingKingInCheck } from "../core/kingUtils";
import { switchTurn } from "../core/utils";
import MovesControls from "./Controls/MovesControls";
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
  const [moveIndex, setMoveIndex] = useState(-1);
  const [history, setHistory] = useState<Move[]>([]);
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
    if (moveIndex < history.length) {
      const newHistory = history.slice(0, moveIndex + 1);
      setHistory([
        ...newHistory,
        {
          from: [selectedPiece.row, selectedPiece.col],
          to: [row, col],
          capturedPiece: board[row][col],
          piece: board[selectedPiece.row][selectedPiece.col]!,
        },
      ]);
    } else {
      setHistory([
        ...(history as Move[]),
        {
          from: [selectedPiece.row, selectedPiece.col],
          to: [row, col],
          capturedPiece: board[row][col],
          piece: board[selectedPiece.row][selectedPiece.col]!,
        },
      ]);
    }
    setCurrentTurn(switchTurn(currentTurn));
    setSelectedPiece(null);
    setLegalMoves([]);
    setBoard(newBoard);
    setMoveIndex(moveIndex + 1);
    console.log(history);
    console.log(moveIndex);
  };
  function handleUndo() {
    if (moveIndex < 0) return;
    setBoard(undoMove(history[moveIndex], board).newBoard);
    // setHistory([...history.slice(0, length - 1)]);
    const newMoveIndex = moveIndex - 1;
    setMoveIndex(newMoveIndex);
    setCurrentTurn(switchTurn(currentTurn));
    console.log(history);
    console.log(moveIndex);
  }
  function handleRedo() {
    if (history.length == moveIndex + 1) return;
    setBoard(
      applyMove(history[moveIndex + 1].from, history[moveIndex + 1].to, board)
    );
    // setHistory([...history.slice(0, length - 1)]);
    const newMoveIndex = moveIndex + 1;
    setMoveIndex(newMoveIndex);
    setCurrentTurn(switchTurn(currentTurn));
    console.log(history);
    console.log(moveIndex);
  }
  return (
    <>
      <BoardWrapper>
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          legalMoves={legalMoves}
        />
        <MovesControls
          onBackwardClick={handleUndo}
          onForwardClick={handleRedo}
        />
      </BoardWrapper>
    </>
  );
}
