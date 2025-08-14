import type { Board, Coords } from "../core/types";
import Square from "./Square";

interface BoardProps extends React.PropsWithChildren {
  board: Board;
  onSquareClick(row: number, col: number): void;
  legalMoves: Coords;
}

export default function Board({
  board,
  onSquareClick,
  legalMoves,
}: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          const isLegalMove = legalMoves.some(
            (move) => move[0] == rowIndex && move[1] == colIndex
          );
          return (
            <Square
              row={rowIndex}
              col={colIndex}
              color={(rowIndex + colIndex) % 2 == 0 ? "light" : "dark"}
              piece={col}
              onSquareClick={onSquareClick}
              isLegalSquare={isLegalMove}
            />
          );
        });
      })}
    </div>
  );
}
