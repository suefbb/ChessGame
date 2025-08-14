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
    "bC",
    null,
    "bS",
    null,
    null,
    null,
    null,
    "bZ",
    "bB",
    null,
    "bR",
  ],
  [
    13,
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
    null,
    null,
    null,
    null,
    null,
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
    null,
    null,
    null,
    null,
    null,
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
    1,
    "wR",
    null,
    "wB",
    "wC",
    null,
    "wS",
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
      pieceDiv.appendChild(pieceImg);
      square.appendChild(pieceDiv);
    }
  });
}
function getSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];

  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) {
      // i represents distance from current piece.
      const newRow = row + dr * i;
      const newCol = col + dc * i;

      if (i == 2 && childclass[row][col][1] == "Z") {
        let directions = [
          [-1, -1], //main diagonal top left
          [-1, 0], //second diagonal top left
          [-1, 1], //main diagonal top right
          [0, 1], //second diagonal top right
          [1, -1], //main diagonal bottom left
          [0, -1], //second diagonal bottom left
          [1, 1], //main diagonal bottom right
          [1, 0], //second diagonal bottom right
        ];
      } else if (i !== 2 && childclass[row][col][1] == "Z") {
        let directions = [
          [-1, -1], //main diagonal top left
          [-1, 0], //second diagonal top left
          [-1, 1], //main diagonal top right
          [0, 1], //second diagonal top right
          [1, -1], //main diagonal bottom left
          [0, -1], //second diagonal bottom left
          [1, 1], //main diagonal bottom right
          [1, 0], //second diagonal bottom right
        ];
      }

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
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}
function getKnightMoves(row, col, board) {
  let moves = [];
  const directions = [
    { r: -2, c: -1 },
    { r: -2, c: 1 },
    { r: 2, c: -1 },
    { r: 2, c: 1 },
    { r: -1, c: -2 },
    { r: 1, c: -2 },
    { r: -1, c: 2 },
    { r: 1, c: 2 },
  ];
  for (const direction of directions) {
    const newRow = row + direction.r;
    const newCol = col + direction.c;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null || targetSquare.color != this.color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  return moves;
}
createBoard();
render();

board.addEventListener("click", (e) => {
  let square = e.target.closest(".square");
  if (!square) return;
  if (square.children.length > 0) {
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    console.log(row);
    console.log(col);
    console.log(childclass[row][col]);
    switch (childclass[row][col][1]) {
      case "R":
        console.log(getRookMoves(row, col, childclass));
        break;
      case "B":
        console.log(getBishopMoves(row, col, childclass));
        break;
      case "N":
        console.log(getKnightMoves(row, col, childclass));
      default:
        console.log("Not programmed yet.");
    }
  }
});
