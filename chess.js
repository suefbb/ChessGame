import Bishop from "./src/pieces/Bishop.js";
import Crocodile from "./src/pieces/Crocodile.js";
import Knight from "./src/pieces/Knight.js";
import Pawn from "./src/pieces/Pawn.js";
import Rook from "./src/pieces/Rook.js";
import Zebra from "./src/pieces/Zebra.js";

const BOARD_DIM = 14;

// This board state represents the entire game board.
// an empty square is 'null', and every other piece is an object.
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

// Used for assigning the correct CSS class for each piece.
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

/*
 This is a very important function for this game.
 This function first removes any piece inside any square,
 then checks the board state and assigns every square it's correct piece and class.
*/
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
    // I always forget what does the array method 'some' do so I'll explain it breifly
    // It loops through the array and once it finds an element that meets the condition and returns true.
    // In this case it sees if the selected move is a legal square to move to.
    const isLegalMove = legalMoves.some(
      (move) => move[0] == row && move[1] == col
    );

    if (isLegalMove) {
      // ANIMATION START
      let pieceToBeMoved = document.querySelector(
        `.square[data-row="${selectedPiece.row}"][data-col="${selectedPiece.col}"]`
      ).children[0];
      pieceToBeMoved.style = `transform: translate(calc((${selectedPiece.col} - ${col}) * 50px * -1), calc((${selectedPiece.row} - ${row}) * 50px * -1));`;
      clearHighlights();
      pieceToBeMoved.addEventListener("transitionend", (_) => {
        // We move the square by setting it's value to the destination and reseting its original square.
        boardState[row][col] = boardState[selectedPiece.row][selectedPiece.col];
        boardState[selectedPiece.row][selectedPiece.col] = null;
        // Reset everything.
        selectedPiece = null;
        legalMoves = [];
        clearHighlights();
        render();
      });
      // ANIMATION END
    } else {
      // In case the user plays an illegal move,
      // or unselects the current piece.
      selectedPiece = null;
      legalMoves = [];
      clearHighlights();
      render();
    }
  } else {
    // This means that the user is choosing a piece.
    // We'll display its moves and highlight them.
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
