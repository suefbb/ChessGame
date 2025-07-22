const BOARD_DIM = 15;
const pieceMap = {
  B: "bishop",
  C: "crocodile",
  K: "king",
  N: "knight",
  P: "pawn",
  Q: "queen",
  R: "rook",
  S: "snake",
  Z: "zebra",
};
var childclass = [
  ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
  [
    14,
    "bR",
    null,
    "bB",
    "bZ",
    null,
    "bS",
    "bQ",
    null,
    null,
    null,
    "bC",
    "bB",
    null,
    "bR",
  ],
  [
    13,
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
    12,
    null,
    null,
    "bN",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "bN",
    null,
    null,
  ],
  [
    11,
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
    "bP",
  ],
  [
    10,
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
    9,
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
    8,
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
    7,
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
    6,
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
    5,
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
    4,
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
    3,
    null,
    null,
    "wN",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "wN",
    null,
    null,
  ],
  [
    2,
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
    1,
    "wR",
    null,
    "wB",
    "wZ",
    null,
    "wS",
    "wQ",
    null,
    null,
    null,
    "wC",
    "wB",
    null,
    "wR",
  ],
];

const board = document.querySelector(".board");

function createBoard() {
  for (let i = 0; i < childclass.length; i++) {
    for (let j = 0; j < childclass.length; j++) {
      let square = document.createElement("div");
      square.dataset.row = i;
      square.dataset.col = j;
      square.classList.add("square");
      if ((i + j) % 2 == 0) {
        square.classList.add("light-square");
      } else {
        square.classList.add("dark-square");
      }
      board.appendChild(square);
    }
  }
}
function render() {
  const squares = document.querySelectorAll(".board .square");
  squares.forEach((square, index) => {
    square.innerHTML = "";
    const row = Math.floor(index / BOARD_DIM);
    const col = index % BOARD_DIM;
    if (col == 0) {
      square.textContent = childclass[row][col];
      return;
    }
    if (row == 0) {
      square.textContent = childclass[row][col];
      return;
    }
    const piece = childclass[row][col];
    if (piece != null) {
      const pieceDiv = document.createElement("div");
      pieceDiv.classList.add("piece", `${piece[0]}-${pieceMap[piece[1]]}`);
      const pieceImg = document.createElement("img");
      pieceImg.src = `${piece[0]}-${pieceMap[piece[1]]}.svg`;
      pieceDiv.appendChild(pieceImg);
      square.appendChild(pieceDiv);
    }
  });
}
function isValidSquare(row, col) {
  return row >= 1 && row < BOARD_DIM && col >= 1 && col < BOARD_DIM;
}

function getSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  // i made the z let becuase dr and dc are the fake directions
  let z = -1;
  for (const [dr, dc] of directions) {
    z++;
    for (let i = 1; ; i++) {
      //when you move a crocodile make the directions let = crocodile direction
      if (childclass[row][col][1] == "C") {
        directions = [
          [0, 1],
          [(i - 1) / i, 1 / i],
          [(i - 1) / i, -1 / i],
          [0, -1],
          [(-i + 1) / i, -1 / i],
          [(-i + 1) / i, 1 / i],
        ];
      }
      console.log(directions);
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
      console.log(newRow, newCol);

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) {
        moves.push([newRow, newCol]);
        console.log(moves);
      }
      // It it's of an other color, add it and stop looping.
      // else, it's of the same color. Don't add it and stop looping.
      else {
        if (targetPiece[0] != pieceColor) {
          moves.push([newRow, newCol]);
          break;
        }
        break;
      }
    }
  }
  return moves;
}

function getKnightMoves(row, col, board) {
  const pieceColor = board[row][col][0];
  let moves = [];
  const directions = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
  ];
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null || targetSquare[0] != pieceColor) {
        moves.push([newRow, newCol]);
      }
    }
  }
  return moves;
}

//ssss
function getSSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  let z = -1;
  for (const [dr, dc] of directions) {
    z++;
    for (let i = 1; ; i++) {
      if (i % 2 == 0) {
        directions = [
          [-2, 0],
          [-2, 0],
          [0, 2],
          [0, 2],
          [0, -2],
          [0, -2],
          [2, 0],
          [2, 0],
        ];
      } else {
        directions = [
          [-2, -1 / i],
          [-2, 1 / i],
          [-1 / i, 2],
          [1 / i, 2],
          [-1 / i, -2],
          [1 / i, -2],
          [2, -1 / i],
          [2, 1 / i],
        ];
      }
      // i represents distance from current piece.
      console.log(z);
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
      console.log(newCol, newRow);

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) moves.push([newRow, newCol]);
      // It it's of an other color, add it and stop looping.
      // else, it's of the same color. Don't add it and stop looping.
      else {
        if (targetPiece[0] != pieceColor) {
          moves.push([newRow, newCol]);
          break;
        }
        break;
      }
    }
  }
  return moves;
}
//ssss
function getPawnMoves(row, col, board) {
  let moves = [];
  const pieceColor = board[row][col][0];
  const direction = pieceColor == "w" ? -1 : 1;
  const enPassantRow = pieceColor == "w" ? 11 : 4;
  if (isValidSquare(row + direction, col) && !board[row + direction][col]) {
    moves.push([row + direction, col]);
    if (
      isValidSquare(row + 2 * direction, col) &&
      !board[row + 2 * direction][col]
    ) {
      moves.push([row + 2 * direction, col]);
    }
  }
  if (
    isValidSquare(row + direction, col - 1) &&
    board[row + direction][col - 1] &&
    board[row + direction][col - 1][0] !== pieceColor
  ) {
    moves.push([row + direction, col - 1]);
  }
  if (
    isValidSquare(row + direction, col + 1) &&
    board[row + direction][col + 1] &&
    board[row + direction][col + 1][0] !== pieceColor
  ) {
    moves.push([row + direction, col + 1]);
  }
  if (
    isValidSquare(row, col - 1) &&
    board[row][col - 1] &&
    board[row][col - 1][0] !== pieceColor &&
    row == enPassantRow
  ) {
    moves.push([row + direction, col - 1]);
  }
  if (
    isValidSquare(row, col + 1) &&
    board[row][col + 1] &&
    board[row][col + 1][0] !== pieceColor &&
    row == enPassantRow
  ) {
    moves.push([row + direction, col + 1]);
  }
  return moves;
}

function getQueenMoves(row, col, board) {
  let moves = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  moves = getSlideMoves(row, col, directions, board);
  return moves;
}
function getCrocodileMoves(row, col, board) {
  //i wrote any directions becuase i can't put the real dircetions here becuase i is not defiend
  let directions = [
    [0, 1],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 1],
  ];
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}

//ssss
function getSSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  let z = -1;
  for (const [dr, dc] of directions) {
    z++;
    for (let i = 1; ; i++) {
      if (i % 2 == 0) {
        directions = [
          [-2, 0],
          [-2, 0],
          [0, 2],
          [0, 2],
          [0, -2],
          [0, -2],
          [2, 0],
          [2, 0],
        ];
      } else {
        directions = [
          [-2, -1 / i],
          [-2, 1 / i],
          [-1 / i, 2],
          [1 / i, 2],
          [-1 / i, -2],
          [1 / i, -2],
          [2, -1 / i],
          [2, 1 / i],
        ];
      }
      // i represents distance from current piece.
      console.log(z);
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
      console.log(newCol, newRow);

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) moves.push([newRow, newCol]);
      // It it's of an other color, add it and stop looping.
      // else, it's of the same color. Don't add it and stop looping.
      else {
        if (targetPiece[0] != pieceColor) {
          moves.push([newRow, newCol]);
          break;
        }
        break;
      }
    }
  }
  return moves;
}
//ssss
function getZSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  // z is an index in directions
  let z = -1;
  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) {
      //get top left , top right , bottom left and bottom right squares by setting directions to bishop directions
      if (i == 1) {
        z++;
        directions = [
          [-1, -1],
          [-1, -1],
          [-1, 1],
          [-1, 1],
          [1, -1],
          [1, -1],
          [1, 1],
          [1, 1],
        ];
      }
      // get fan squares and diagonals by repeating 1 or -1 another time in just second diagonals
      // newRow = row -1 , row -1 , row -2 , row -3 , row -4 .....
      if (i >= 2 && childclass[row][col][1] == "Z") {
        directions = [
          [-1, -1], //main diagonal top left
          [-1, -(i - 1) / i], //second diagonal top left
          [-1, 1], //main diagonal top right
          [-(i - 1) / i, 1], //second diagonal top right
          [1, -1], //main diagonal bottom left
          [(i - 1) / i, -1], //second diagonal bottom left
          [1, 1], //main diagonal bottom right
          [1, (i - 1) / i], //second diagonal bottom right
        ];
      }
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
      console.log(directions[z][0] * i, directions[z][0], z, -(i - 1) / i, i);

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) moves.push([newRow, newCol]);
      // It it's of an other color, add it and stop looping.
      // else, it's of the same color. Don't add it and stop looping.
      else {
        if (targetPiece[0] != pieceColor) {
          moves.push([newRow, newCol]);
          break;
        }
        break;
      }
    }
  }
  return moves;
}
function getRookMoves(row, col, board) {
  let directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}
function getBishopMoves(row, col, board) {
  let directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}

function getZebraMoves(row, col, board) {
  let directions = [
    [-1, -1],
    [-1, -1],
    [-1, 1],
    [-1, 1],
    [1, -1],
    [1, -1],
    [1, 1],
    [1, 1],
  ];
  let moves = [...getZSlideMoves(row, col, directions, board)];
  return moves;
}
//ssss
function getSnakeMoves(row, col, board) {
  let directions = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
  ];
  let moves = [...getSSlideMoves(row, col, directions, board)];
  return moves;
}
//ssss

createBoard();
render();

let selectedPiece = null;
let legalMoves = [];
let currentTurn = "w";
board.addEventListener("click", (e) => {
  let square = e.target.closest(".square");
  if (!square) return;
  const row = Number(square.dataset.row);
  const col = Number(square.dataset.col);
  if (!selectedPiece) {
    if (!square.children.length > 0) return;
    if (childclass[row][col][0] != currentTurn) return;
    selectedPiece = {
      row,
      col,
      piece: childclass[row][col],
      type: childclass[row][col][1],
    };
    switch (selectedPiece.type) {
      case "R":
        legalMoves = [
          ...getRookMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "B":
        legalMoves = [
          ...getBishopMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "N":
        legalMoves = [
          ...getKnightMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "Z":
        legalMoves = [
          ...getZebraMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "P":
        legalMoves = [
          ...getPawnMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      //ssss
      case "S":
        legalMoves = [
          ...getSnakeMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "Q":
        legalMoves = [
          ...getQueenMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "C":
        legalMoves = [
          ...getCrocodileMoves(
            selectedPiece.row,
            selectedPiece.col,
            childclass
          ),
        ];
        break;
      default:
        console.log("Not programmed yet.");
        break;
    }
    showHints(legalMoves);
    return;
  }
  const isLegalMove = legalMoves.some((move) => {
    return move[0] == row && move[1] == col;
  });
  if (!isLegalMove) {
    console.log("Not a legal Move");
    console.log(legalMoves);
    clearHints(legalMoves);
    selectedPiece = null;
    legalMoves = [];
    render();
    return;
  }
  movePiece([selectedPiece.row, selectedPiece.col], [row, col], childclass);
  clearHints(legalMoves);
  currentTurn = currentTurn == "w" ? "b" : "w";
  selectedPiece = null;
  legalMoves = [];
  render();
});

function showHints(coords) {
  const squares = getSquaresByCoords(coords);
  squares.forEach((square, index) => {
    const [row, col] = coords[index];
    if (isCapture(row, col, currentTurn)) {
      square.classList.add("capture-hint");
    } else {
      square.classList.add("move-hint");
    }
    square.classList.add("hint");
  });
}

function clearHints(coords) {
  const squares = getSquaresByCoords(coords);
  squares.forEach((square) => {
    square.classList.remove("move-hint");
    square.classList.remove("capture-hint");
    square.classList.remove("hint");
  });
}

function getSquaresByCoords(coords) {
  let squares = [];
  for (i = 0; i < coords.length; i++) {
    squares.push(
      document.querySelector(
        `.square[data-row="${coords[i][0]}"][data-col="${coords[i][1]}"]`
      )
    );
  }
  return squares;
}

function isCapture(row, col, color) {
  return (
    isValidSquare(row, col) &&
    childclass[row][col] &&
    childclass[row][col][0] != color
  );
}

function switchTurn(currentTurn) {
  return currentTurn == "w" ? "b" : "w";
}

function getPieceType(r, c, board) {
  return board[r][c][1];
}

function movePiece([fromR, fromC], [toR, toC], board) {
  if (isEnPassant([fromR, fromC], [toR, toC], board)) {
    board[fromR][toC] = null;
  }
  board[toR][toC] = board[fromR][fromC];
  board[fromR][fromC] = null;
}

function isEnPassant([fromR, fromC], [toR, toC], board) {
  console.log(fromR, fromC, toR, toC);
  const piece = board[fromR][fromC];
  console.log(piece);
  const isPawn = getPieceType(fromR, fromC, board) == "P";
  const forwardDirection = piece[0] == "w" ? -1 : 1;
  if (isPawn && Math.abs(fromC - toC) == 1 && toR - fromR == forwardDirection) {
    return true;
  }
  return false;
}
