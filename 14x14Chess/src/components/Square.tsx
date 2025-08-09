import type { PieceType } from "../core/types";

interface ISquareProps extends React.PropsWithChildren {
  piece?: string | null;
  row: number;
  col: number;
  color: "light" | "dark";
  onSquareClick(row: number, col: number): void;
  isLegalSquare: boolean;
}
export default function Square({
  piece,
  row,
  col,
  color,
  onSquareClick,
  isLegalSquare,
}: ISquareProps) {
  const pieceMap: Record<PieceType, string> = {
    R: "rook",
    E: "elephant",
    B: "bishop",
    Z: "zebra",
    F: "frog",
    S: "snake",
    Q: "queen",
    p: "pawn",
    N: "knight",
    K: "king",
    O: "octopus",
    W: "wall",
    C: "crocodile",
    P: "pigeon",
  };
  return (
    <div
      data-row={row}
      data-col={col}
      className={`square ${color}-square ${isLegalSquare && "move-hint"}`}
      onClick={() => onSquareClick(row, col)}
    >
      {piece && (
        <img
          className={`piece ${piece}`}
          src={`${piece[0]}-${pieceMap[piece[1] as PieceType]}.svg`}
          alt={piece}
        />
      )}
    </div>
  );
}
