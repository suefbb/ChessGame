import { useEffect, useState } from "react";
import {
  initialBoard,
  type Board,
  type results,
  type Color,
  type Coords,
  type SelectedPiece,
  type Move,
} from "../core/types";
import { isKingInCheck } from "../core/kingUtils";
import { cloneboard } from "../core/chess";
import { getCastleMoves, getMoves } from "../core/pieces";
import { isMoveLeavingKingInCheck } from "../core/kingUtils";
import { applyMove, buildBoardFromHistory } from "../core/chess";
import { switchTurn } from "../core/utils";

/**
 * An easy to use hook that handles multiple things like making moves, undo and redo.
 * @returns A bunch of useful game state you might want or need
 */
let pgn2 = []; let casltingMove = false
let m = 0;
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
  const [result, setresult] = useState<results>(
    localStorage.getItem("result")
      ? (localStorage.getItem("result") as results)
      : "*"
  );
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
    null
  );
  const [pgnArr, setpgnArr] = useState<Move[]>(
    localStorage.getItem("pgnArr")
      ? JSON.parse(localStorage.getItem("pgnArr")!)
      : []
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
  const [isBPromotion , setisBPromotion] = useState<boolean>(false)
  const [isWPromotion , setisWPromotion] = useState<boolean>(false)
  useEffect(()=>{
    for (let Pcol = 0; Pcol < board[0].length; Pcol++) {
      if(board[0][Pcol]?.color == 'w' && board[0][Pcol]?.type == 'p'){
        setisWPromotion(true)
      }
    }
    for (let Pcol = 0; Pcol < board[13].length; Pcol++) {
      if(board[13][Pcol]?.color == 'b' && board[13][Pcol]?.type == 'p'){
        setisBPromotion(true)
      }
    }
  },[board])
  const promotePawn = (Prow:number , pieceKey:string , board:Board)=>{
    console.log(Prow , pieceKey , board);
  }
  useEffect(()=>{
    const colmns = ['a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' , 'k' , 'l' , 'm' , 'n']
    if(moveIndex !== -1){
      pgn2.push([])
      if (m % 2 == 0){
        pgn2[m].push(((m/2)+1) + '.')
        console.log(pgn2);
      }
      if (history[m].piece.type == 'K' && history[m].from[1] - history[m].to[1] == 4) {
        pgn2[m].push('O-O-O-O')
        casltingMove = true
      }
      if (history[m].piece.type !== 'p' && !casltingMove){
        pgn2[m].push(history[m].piece.type)
        console.log(pgn2);
      }
      if (history[m].piece.type == 'p' && history[m].capturedPiece !== null && !casltingMove){
        pgn2[m].push(colmns[history[m].from[1]])
        console.log(pgn2);  
      }
      if (history[m].capturedPiece !== null && !casltingMove){
        pgn2[m].push('x')
        console.log(pgn2);  
      }
      if (!casltingMove){pgn2[m].push(colmns[history[m].to[1]] + String(14 - history[m].to[0]))}
      if (isKingInCheck(currentTurn , board)){pgn2[m].push('+')}
      pgn2[m].push(' ')
      casltingMove = false
      setpgnArr(pgn2)
      localStorage.setItem('pgnArr' , JSON.stringify(pgnArr))
      console.log(pgnArr);
      m++
    }
  } , [board])
  const resignClick = (turn: string)=>{
    if (turn == 'w') {
      setresult('Black won')
      localStorage.setItem('result' , 'Black won')
    }
    if (turn == 'b') {
      setresult('White won')
      localStorage.setItem('result' , 'White won')
    }
  }
  return {
    board,
    currentTurn,
    result,
    legalMoves,
    moveIndex,
    history,
    promotePawn,
    isBPromotion,
    isWPromotion,
    handleRedo,
    handleUndo,
    resignClick,
    handleReset,
    handleSquareClick,
  };
}
