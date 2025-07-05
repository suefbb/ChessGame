import Board from "./Board.js";
import Bishop from "./pieces/Bishop.js";
import Crocodile from "./pieces/Crocodile.js";
import Knight from "./pieces/Knight.js";
import Pawn from "./pieces/Pawn.js";
import Rook from "./pieces/Rook.js";
import Zebra from "./pieces/Zebra.js";
export const BOARD_DIM = 14;

export const COLORS = {
  WHITE: "w",
  BLACK: "b",
};

// This board state represents the entire game board.
// an empty square is 'null', and every other piece is an object.
export let boardState = [
  [
    new Rook("b"),
    null,
    new Bishop("b"),
    new Crocodile("b"),
    null,
    null,
    null,
    null,
    null,
    null,
    new Zebra("b"),
    new Bishop("b"),
    null,
    new Rook("b"),
  ],
  [
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
    new Pawn("b"),
  ],
  [
    null,
    null,
    new Knight("b"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new Knight("b"),
    null,
    null,
  ],
  [
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
    null,
    null,
    new Knight("w"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new Knight("w"),
    null,
    null,
  ],
  [
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
    new Pawn("w"),
  ],
  [
    new Rook("w"),
    null,
    new Bishop("w"),
    new Crocodile("w"),
    null,
    null,
    null,
    null,
    null,
    null,
    new Zebra("w"),
    new Bishop("w"),
    null,
    new Rook("w"),
  ],
];
// Used for assigning the correct CSS class for each piece.
export const pieceMap = {
  K: "king",
  Q: "queen",
  R: "rook",
  B: "bishop",
  N: "knight",
  P: "pawn",
  C: "crocodile",
  Z: "crocodile",
};
export default class Chess {
  constructor(uiBoard, currentTurn = "w") {
    this.uiBoard = uiBoard;
    this.currentTurn = currentTurn;
    this.board = new Board(uiBoard);
  }

  play() {
    this.uiBoard.addEventListener("click", (e) => {
      /*
  There's basically two outcomes.
  1. You already selected a piece and need to move it.
  2. You're just going to select a piece to check it's moves;
  */
      this.board.clearHighlights();
      this.board.clearArrows();
      const square = e.target.closest(".square");
      if (!square) return;
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);
      if (this.board.selectedPiece) {
        // I always forget what does the array method 'some' do so I'll explain it breifly
        // It loops through the array and once it finds an element that meets the condition and returns true.
        // In this case it sees if the selected move is a legal square to move to.
        const isLegalMove = this.board.legalMoves.some(
          (move) => move[0] == row && move[1] == col
        );

        if (isLegalMove) {
          // ANIMATION START
          let pieceToBeMoved = document.querySelector(
            `.square[data-row="${this.board.selectedPiece.row}"][data-col="${this.board.selectedPiece.col}"] .piece`
          );
          pieceToBeMoved.style.transform = `translate(calc((${this.board.selectedPiece.col} - ${col}) * 50px * -1), calc((${this.board.selectedPiece.row} - ${row}) * 50px * -1));`;
          this.board.clearHighlights();
          pieceToBeMoved.addEventListener("transitionend", (_) => {
            // We move the square by setting it's value to the destination and reseting its original square.
            boardState[row][col] =
              boardState[this.board.selectedPiece.row][
                this.board.selectedPiece.col
              ];
            boardState[this.board.selectedPiece.row][
              this.board.selectedPiece.col
            ] = null;
            // Reset everything.
            this.board.selectedPiece = null;
            this.board.legalMoves = [];
            this.board.clearHighlights();
            this.board.render();
          });
          // ANIMATION END
        } else {
          // In case the user plays an illegal move,
          // or unselects the current piece.
          this.board.selectedPiece = null;
          this.board.legalMoves = [];
          this.board.clearHighlights();
          this.board.render();
        }
      } else {
        // This means that the user is choosing a piece.
        // We'll display its moves and highlight them.
        this.board.selectedPiece = { row, col, piece: boardState[row][col] };
        this.board.legalMoves = [
          ...this.board.selectedPiece.piece.getMoves(
            this.board.selectedPiece.row,
            this.board.selectedPiece.col,
            boardState
          ),
        ];

        this.board.highlightSquares(this.board.legalMoves);
      }
    });
    this.board.render();
  }
}
