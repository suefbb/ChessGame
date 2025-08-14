import BoardWrapper from "./BoardWrapper";
import Board from "./Board";
import MovesControls from "./Controls/MovesControls";
import { useGameState } from "../hooks/useGameState";

export default function Game() {
  const {
    board,
    handleSquareClick,
    legalMoves,
    handleUndo,
    handleRedo,
    handleReset,
  } = useGameState();

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
          onResetClick={handleReset}
        />
      </BoardWrapper>
    </>
  );
}
