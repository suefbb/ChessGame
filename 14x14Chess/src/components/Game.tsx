import BoardWrapper from "./BoardWrapper";
import Board from "./Board";
import MovesControls from "./Controls/MovesControls";
import { useGameState } from "../hooks/useGameState";
import { Timer } from "./Timer";

export default function Game() {
  const {
    board,
    handleSquareClick,
    legalMoves,
    handleUndo,
    handleRedo,
    handleReset,
    currentTurn,
  } = useGameState();

  return (
    <>
      <BoardWrapper>
        <Timer
          currentTurn={currentTurn}
          mins={10}
          turn="b"
          onTimeEnd={() => console.log("Time ended")}
        />
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          legalMoves={legalMoves}
        />
        <Timer
          currentTurn={currentTurn}
          mins={1}
          turn="w"
          onTimeEnd={() => console.log("Time ended")}
        />
        <MovesControls
          onBackwardClick={handleUndo}
          onForwardClick={handleRedo}
          onResetClick={handleReset}
        />
      </BoardWrapper>
    </>
  );
}
