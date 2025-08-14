import { useEffect, useState } from "react";
import {
  initialBoard,
  type Board,
  type Color,
  type Coords,
  type SelectedPiece,
  type Move,
} from "../core/types";
import { getCastleMoves, getMoves } from "../core/pieces";
import { isMoveLeavingKingInCheck } from "../core/kingUtils";
import { applyMove, buildBoardFromHistory } from "../core/chess";
import { switchTurn } from "../core/utils";

/**
 * An easy to use hook that handles multiple things like making moves, undo and redo.
 * @returns A bunch on useful game state you might want or need
 */
export function useGameState() {
  const [board, setBoard] = useState<Board>(
    localStorage.getItem("board")
      ? JSON.parse(localStorage.getItem("board")!)
      : initialBoard
  );
  const [currentTurn, setCurrentTurn] = useState<Color>(
    localStorage.getItem("currentTurn")
      ? (localStorage.getItem("currentTurn") as Color)
      : "w"
  );
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
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
  /**
   * This function handles selecting pieces, highlighting legal moves, and performing the selected move.
   * @param row
   * @param col
   * @returns
   */
  // TODO: Reduce this function's responsibilities or at least break down into smaller modules.
  const handleSquareClick = (row: number, col: number) => {
    const clickedPiece = board[row][col];
    if (!selectedPiece) {
      if (!clickedPiece || clickedPiece.color != currentTurn) return;
      setSelectedPiece({ row: row, col: col, piece: clickedPiece });
      const moves: Coords = getMoves(row, col, board).filter(
        (move) =>
          !isMoveLeavingKingInCheck([row, col], move, board, currentTurn)
      ) as Coords;
      if (clickedPiece.type == "K")
        moves.push(...getCastleMoves(currentTurn, board));
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
    const newMoveIndex = moveIndex - 1;
    const newBoard = buildBoardFromHistory(history, newMoveIndex);
    // const newTurn = history[newMoveIndex].piece.color;
    const newTurn = switchTurn(currentTurn);
    setBoard(newBoard);
    setMoveIndex(newMoveIndex);
    setCurrentTurn(newTurn);
    setSelectedPiece(null);
    setLegalMoves([]);
    console.log("Went back one move");
  }
  function handleRedo() {
    if (moveIndex >= history.length - 1) return;
    const newMoveIndex = moveIndex + 1;
    const newBoard = buildBoardFromHistory(history, newMoveIndex);
    const newTurn = history[newMoveIndex].piece.color;
    setBoard(newBoard);
    setMoveIndex(newMoveIndex);
    setCurrentTurn(newTurn);
    setSelectedPiece(null);
    setLegalMoves([]);
    console.log("Went forward one move");
  }
  function handleReset() {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setLegalMoves([]);
    setHistory([]);
    setMoveIndex(-1);
    setCurrentTurn("w");
    localStorage.clear();
  }
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("currentTurn", currentTurn);
    localStorage.setItem("moveIndex", JSON.stringify(moveIndex));
  }, [board, history, currentTurn, moveIndex]);
  return {
    board,
    currentTurn,
    legalMoves,
    moveIndex,
    handleRedo,
    handleUndo,
    handleReset,
    handleSquareClick,
  };
}
