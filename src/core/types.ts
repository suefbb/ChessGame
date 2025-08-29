export type Color = "w" | "b";
export type PieceType =
  | "P"
  | "K"
  | "B"
  | "R"
  | "N"
  | "Q"
  | "C"
  | "E"
  | "F"
  | "W"
  | "S"
  | "O"
  | "Z"
  | "p";
// export type Piece = Color & PieceType;
export type Piece = {
  type: PieceType;
  color: Color;
  hasMoved: boolean;
};

export type SelectedPiece = {
  row: number;
  col: number;
  piece: Piece;
};
export type Move = {
  from: Coord;
  to: Coord;
  capturedPiece: null | string;
  piece: Piece;
};
export type Board = (Piece | null)[][];
export type Coords = Coord[];
export type Coord = [number, number];

export type Time = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  tenthS: number;
};

export const initialBoard: Board = [
  //   ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
  [
    // 14,
    {
      color: "b",
      type: "R",
      hasMoved: false,
    },
    {
      color: "b",
      type: "E",
      hasMoved: false,
    },
    {
      color: "b",
      type: "B",
      hasMoved: false,
    },
    {
      color: "b",
      type: "Z",
      hasMoved: false,
    },
    {
      color: "b",
      type: "F",
      hasMoved: false,
    },
    {
      color: "b",
      type: "S",
      hasMoved: false,
    },
    {
      color: "b",
      type: "Q",
      hasMoved: false,
    },
    {
      color: "b",
      type: "K",
      hasMoved: false,
    },
    {
      color: "b",
      type: "O",
      hasMoved: false,
    },
    {
      color: "b",
      type: "W",
      hasMoved: false,
    },
    {
      color: "b",
      type: "C",
      hasMoved: false,
    },
    {
      color: "b",
      type: "B",
      hasMoved: false,
    },
    {
      color: "b",
      type: "P",
      hasMoved: false,
    },
    {
      color: "b",
      type: "R",
      hasMoved: false,
    },
  ],
  [
    // 13,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 12,
    null,
    null,
    {
      color: "b",
      type: "N",
      hasMoved: false,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      color: "b",
      type: "N",
      hasMoved: false,
    },
    null,
    null,
  ],
  [
    // 11,
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
    {
      color: "b",
      type: "p",
      hasMoved: false,
    },
  ],
  [
    // 10,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 9,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 8,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 7,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 6,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 5,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 4,
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
    {
      color: "w",
      type: "p",
      hasMoved: false,
    },
  ],
  [
    // 3,
    null,
    null,
    {
      color: "w",
      type: "N",
      hasMoved: false,
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
      color: "w",
      type: "N",
      hasMoved: false,
    },
    null,
    null,
  ],
  [
    // 2,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    // 1,
    {
      color: "w",
      type: "R",
      hasMoved: false,
    },
    {
      color: "w",
      type: "E",
      hasMoved: false,
    },
    {
      color: "w",
      type: "B",
      hasMoved: false,
    },
    {
      color: "w",
      type: "Z",
      hasMoved: false,
    },
    {
      color: "w",
      type: "F",
      hasMoved: false,
    },
    {
      color: "w",
      type: "S",
      hasMoved: false,
    },
    {
      color: "w",
      type: "Q",
      hasMoved: false,
    },
    {
      color: "w",
      type: "K",
      hasMoved: false,
    },
    {
      color: "w",
      type: "O",
      hasMoved: false,
    },
    {
      color: "w",
      type: "W",
      hasMoved: false,
    },
    {
      color: "w",
      type: "C",
      hasMoved: false,
    },
    {
      color: "w",
      type: "B",
      hasMoved: false,
    },
    {
      color: "w",
      type: "P",
      hasMoved: false,
    },
    {
      color: "w",
      type: "R",
      hasMoved: false,
    },
  ],
];
