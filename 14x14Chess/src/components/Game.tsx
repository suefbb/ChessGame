// import { useState } from "react";
// import { initialBoard } from "../core/types";
// import Board from "./Board";
// import { GameContext } from "../context/GameContext";

import { useEffect, useState } from "react";
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
  const [board, setBoard] = useState(
    localStorage.getItem("board")
      ? JSON.parse(localStorage.getItem("board")!)
      : initialBoard
  );
  const [currentTurn, setCurrentTurn] = useState<Color>(
    localStorage.getItem("currentTurn")
      ? (localStorage.getItem("currentTurn") as Color)
      : "w"
  );
  // const [selectedPiece, setSelectedPiece] = useState<ISelectedPiece | null>(
  //   localStorage.getItem("selectedPiece")
  //     ? JSON.parse(localStorage.getItem("selectedPiece")!)
  //     : null
  // );
  const [selectedPiece, setSelectedPiece] = useState<ISelectedPiece | null>(
    null
  );
  const [moveIndex, setMoveIndex] = useState(
    localStorage.getItem("moveIndex")
      ? Number(JSON.parse(localStorage.getItem("moveIndex")!))
      : -1
  );
  const [history, setHistory] = useState<Move[]>(
    localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history")!)
      : []
  );

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
      const newHistory = [
        ...history.slice(0, moveIndex + 1),
        {
          from: [selectedPiece.row, selectedPiece.col],
          to: [row, col],
          capturedPiece: board[row][col],
          piece: board[selectedPiece.row][selectedPiece.col]!,
        },
      ];
      setHistory(newHistory as Move[]);
    } else {
      const newHistory = [
        ...(history as Move[]),
        {
          from: [selectedPiece.row, selectedPiece.col],
          to: [row, col],
          capturedPiece: board[row][col],
          piece: board[selectedPiece.row][selectedPiece.col]!,
        },
      ];
      setHistory(newHistory as Move[]);
    }
    const newTurn = switchTurn(currentTurn);
    setCurrentTurn(newTurn);
    setSelectedPiece(null);
    setLegalMoves([]);
    setBoard(newBoard);
    const newMoveIndex = moveIndex + 1;
    setMoveIndex(newMoveIndex);
  };
  function handleUndo() {
    if (moveIndex < 0) return;
    const newBoard = undoMove(history[moveIndex], board).newBoard;
    setBoard(newBoard);
    const newMoveIndex = moveIndex - 1;
    const newTurn = switchTurn(currentTurn);
    setMoveIndex(newMoveIndex);
    setCurrentTurn(newTurn);
  }
  function handleRedo() {
    if (history.length == moveIndex + 1) return;
    const newBoard = applyMove(
      history[moveIndex + 1].from,
      history[moveIndex + 1].to,
      board
    );
    setBoard(newBoard);
    const newMoveIndex = moveIndex + 1;
    setMoveIndex(newMoveIndex);
    const newTurn = switchTurn(currentTurn);
    setCurrentTurn(newTurn);
  }
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("currentTurn", currentTurn);
  }, [currentTurn]);

  useEffect(() => {
    localStorage.setItem("moveIndex", JSON.stringify(moveIndex));
  }, [moveIndex]);

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
