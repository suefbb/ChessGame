import type { Piece, PieceType } from "../core/types";

interface SquareProps extends React.PropsWithChildren {
  piece?: Piece | null;
  row: number;
  col: number;
  color: "light" | "dark";
  onSquareClick(row: number, col: number): void;
  isLegalSquare?: boolean;
}
export default function Square({
  piece,
  row,
  col,
  color,
  onSquareClick,
  isLegalSquare,
}: SquareProps) {
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
          src={`${piece.color}-${pieceMap[piece.type]}.svg`}
          alt={`${piece.color} ${pieceMap[piece.type]}`}
        />
      )}
    </div>
  );
}
