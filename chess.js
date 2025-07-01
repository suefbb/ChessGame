import Bishop from "./src/pieces/Bishop.js";
import Crocodile from "./src/pieces/Crocodile.js";
import Knight from "./src/pieces/Knight.js";
import Pawn from "./src/pieces/Pawn.js";
import Rook from "./src/pieces/Rook.js";
import Zebra from "./src/pieces/Zebra.js";

const BOARD_DIM = 14;
let boardState = [
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
    new Knight("w"),
    null,
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

const pieceMap = {
  K: "king",
  Q: "queen",
  R: "rook",
  B: "bishop",
  N: "knight",
  P: "pawn",
  C: "crocodile",
  Z: "crocodile",
};
let uiBoard = document.querySelector(".chess-board");
function createBoard() {
  for (let i = 0; i < BOARD_DIM; i++) {
    for (let j = 0; j < BOARD_DIM; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = i;
      square.dataset.col = j;
      if ((i + j) % 2 == 0) {
        square.classList.add("light-square");
      } else {
        square.classList.add("dark-square");
      }
      uiBoard.appendChild(square);
    }
  }
}

function render() {
  const squares = document.querySelectorAll(".chess-board .square");
  squares.forEach((square, index) => {
    // Clear any exisiting piece.
    square.innerHTML = "";
    const row = Math.floor(index / BOARD_DIM);
    const col = index % BOARD_DIM;
    const piece = boardState[row][col];
    if (piece) {
      const pieceDiv = document.createElement("div");
      // pieceDiv.classList.add("piece", pieceMap[pieceCode]);
      pieceDiv.classList.add("piece", `${piece.color}-${pieceMap[piece.type]}`);
      square.appendChild(pieceDiv);
    }
  });
}

function highlightSquares(squares) {
  const squaresToBeHighlighted = new Array(squares.length);
  for (let i = 0; i < squaresToBeHighlighted.length; i++) {
    squaresToBeHighlighted[i] = document.querySelector(
      `.square[data-row="${squares[i][0]}"][data-col="${squares[i][1]}"]`
    );
    squaresToBeHighlighted[i].classList.add("legal-move");
  }
}

function clearHighlights() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("legal-move");
  });
}

// function getCrocodileMoves(row, col, board) {
//   let moves = [];
//   let pieceColor = board[row][col][0];
//   if (isValidSquare(row, col + 1))
//     moves.push(...getRookMoves(row, col + 1, board, pieceColor, true));
//   if (isValidSquare(row, col - 1))
//     moves.push(...getRookMoves(row, col - 1, board, pieceColor, true));
//   return moves;
// }

let selectedPiece = null;
let legalMoves = [];
let currentTurn = "w";

uiBoard.addEventListener("click", (e) => {
  /*
  There's basically two outcomes.
  1. You already selected a piece and need to move it.
  2. You're just going to select a piece to check it's moves;
  */
  const square = e.target.closest(".square");
  if (!square) return;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  if (selectedPiece) {
    const isLegalMove = legalMoves.some(
      (move) => move[0] == row && move[1] == col
    );
    if (isLegalMove) {
      boardState[row][col] = boardState[selectedPiece.row][selectedPiece.col];
      boardState[selectedPiece.row][selectedPiece.col] = null;
      // Reset everything.
      selectedPiece = null;
      legalMoves = [];
      clearHighlights();
      render();
    } else {
      // In case the user plays an illegal move.
      selectedPiece = null;
      legalMoves = [];
      clearHighlights();
      render();
    }
  } else {
    selectedPiece = { row, col, piece: boardState[row][col] };
    legalMoves = [
      ...selectedPiece.piece.getMoves(
        selectedPiece.row,
        selectedPiece.col,
        boardState
      ),
    ];

    highlightSquares(legalMoves);
  }
});
createBoard();
render();
