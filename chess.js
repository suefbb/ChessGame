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
    null,
    // "wN",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    // "wN",
    null,
    null,
    null,
  ],
  [
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
    "wP",
  ],
  [
    "wR",
    null,
    "wB",
    "wC",
    null,
    null,
    null,
    null,
    null,
    null,
    "wZ",
    "wB",
    null,
    "wR",
  ],
];

const pieceMap = {
  wK: "w-king",
  wQ: "w-queen",
  wR: "w-rook",
  wB: "w-bishop",
  wN: "w-knight",
  wP: "w-pawn",
  bK: "b-king",
  bQ: "b-queen",
  bR: "b-rook",
  bB: "b-bishop",
  bN: "b-knight",
  bP: "b-pawn",
  wC: "w-crocodile",
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
    const pieceCode = boardState[row][col];
    if (pieceCode) {
      const pieceDiv = document.createElement("div");
      pieceDiv.classList.add("piece", pieceMap[pieceCode]);
      square.appendChild(pieceDiv);
    }
  });
}

function getPieceType(row, col, board) {
  if (board[row][col] == null) return null;
  return board[row][col][1];
}

function isValidSquare(row, col) {
  return row >= 0 && row < BOARD_DIM && col >= 0 && col < BOARD_DIM;
}

function highlightSquares(squares) {
  const squaresToBeHighlighted = new Array(squares.length);
  for (let i = 0; i < squaresToBeHighlighted.length; i++) {
    squaresToBeHighlighted[i] = document.querySelector(
      `.square[data-row="${squares[i][0]}"][data-col="${squares[i][1]}"]`
    );
    squaresToBeHighlighted[i].classList.add("legal-move");
    console.log(squaresToBeHighlighted[i]);
  }
}

function clearHighlights() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("legal-move");
  });
}

function getPawnMoves(row, col, board, typeOfMove = "all") {
  let moves = [];
  const pieceColor = board[row][col][0];
  let direction = pieceColor == "w" ? -1 : 1;

  // UP
  if (
    board[row + direction][col] == null &&
    isValidSquare(row + direction, col)
  ) {
    moves.push([row + direction, col]);
  }
  // UP LEFT
  if (
    board[row + direction][col - 1] == null ||
    (board[row + direction][col - 1][0] != pieceColor &&
      isValidSquare(row + direction, col - 1))
  ) {
    moves.push([row + direction, col - 1]);
  } // UP RIGHT
  if (
    board[row + direction][col + 1] == null ||
    (board[row + direction][col + 1][0] != pieceColor &&
      isValidSquare(row + direction, col + 1))
  ) {
    moves.push([row + direction, col + 1]);
  }
  // TWO UP
  if (
    isValidSquare(row + direction * 2, col) &&
    board[row + direction * 2][col] == null
  )
    moves.push([row + direction * 2, col]);
  return moves;
}

function getRookMoves(row, col, board) {
  const moves = [];
  const pieceColor = board[row][col][0];
  // UP
  for (let i = row - 1; i >= 0; i--) {
    const targetSquare = board[i][col];
    if (targetSquare == null) {
      moves.push([i, col]);
    } else {
      if (targetSquare[0] != pieceColor) {
        moves.push([i, col]);
        break;
      } else break;
    }
  }
  // DOWN
  for (let i = row + 1; i < BOARD_DIM; i++) {
    const targetSquare = board[i][col];
    if (targetSquare == null) {
      moves.push([i, col]);
    } else {
      if (targetSquare[0] != pieceColor) {
        moves.push([i, col]);
        break;
      } else break;
    }
  }
  // LEFT
  for (let i = col - 1; i >= 0; i--) {
    const targetSquare = board[row][i];
    if (targetSquare == null) {
      moves.push([row, i]);
    } else {
      if (targetSquare[0] != pieceColor) {
        moves.push([row, i]);
        break;
      } else break;
    }
  }
  // RIGHT
  for (let i = col + 1; i < BOARD_DIM; i++) {
    const targetSquare = board[row][i];
    if (targetSquare == null) {
      moves.push([row, i]);
    } else {
      if (targetSquare[0] != pieceColor) {
        moves.push([row, i]);
        break;
      } else break;
    }
  }
  return moves;
}

function getBishopMoves(row, col, board) {
  let moves = [];
  const pieceColor = board[row][col][0];
  const directions = [
    [-1, -1], // UP LEFT
    [-1, 1], // UP RIGHT
    [1, -1], // DOWN LEFT
    [1, 1], // DOWN RIGHT
  ];
  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) /* i represents distance from current piece.*/ {
      const newRow = row + dr * i;
      const newCol = col + dc * i;
      if (!isValidSquare(newRow, newCol)) {
        break;
      }
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null) {
        moves.push([newRow, newCol]);
      } else {
        if (targetSquare[0] != pieceColor) {
          moves.push([newRow, newCol]);
          break;
        } else {
          break;
        }
      }
    }
  }
  return moves;
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

    switch (getPieceType(selectedPiece.row, selectedPiece.col, boardState)) {
      case "P":
        legalMoves = getPawnMoves(
          selectedPiece.row,
          selectedPiece.col,
          boardState
        );
        break;
      case "R":
        legalMoves = getRookMoves(
          selectedPiece.row,
          selectedPiece.col,
          boardState
        );
        break;
      case "B":
        legalMoves = getBishopMoves(
          selectedPiece.row,
          selectedPiece.col,
          boardState
        );
        break;
      default:
        legalMoves = [];
        break;
    }
    highlightSquares(legalMoves);
  }
});
createBoard();
render();
