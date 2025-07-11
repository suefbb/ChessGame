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

  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) {
      // i represents distance from current piece.
      const newRow = row + dr * i;
      const newCol = col + dc * i;

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
function getZSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  let z = -1
  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) {
      if(i==1){z++;
        directions = [
          [-1, -1],
          [-1, -1],
          [-1, 1],
          [-1, 1],
          [1, -1],
          [1, -1],
          [1, 1],
          [1, 1],
        ];}
      console.log(i>=2 && childclass[row][col][1]=='Z');
      if(i>=2 && childclass[row][col][1]=='Z'){
        directions=[
          [-1,-1],//main diagonal top left
          [-1,-(i-1)/i],//second diagonal top left
          [-1,1],//main diagonal top right
          [-(i-1)/i,1],//second diagonal top right
          [1,-1],//main diagonal bottom left
          [(i-1)/i,-1],//second diagonal bottom left
          [1,1],//main diagonal bottom right
          [1,(i-1)/i]//second diagonal bottom right
        ]
      }
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
      console.log(directions[z][0] * i , directions[z][0] , z , -(i-1)/i , i );
      

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol))break;

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
    board[row + direction][col - 1] &&
    board[row + direction][col - 1][0] !== pieceColor
  ) {
    moves.push([row + direction, col - 1]);
  }
  if (
    board[row + direction][col + 1] &&
    board[row + direction][col + 1][0] !== pieceColor
  ) {
    moves.push([row + direction, col + 1]);
  }
  if (
    board[row][col - 1] &&
    board[row][col - 1][0] !== pieceColor &&
    row == enPassantRow
  ) {
    moves.push([row + direction, col - 1]);
  }
  if (
    board[row][col + 1] &&
    board[row][col + 1][0] !== pieceColor &&
    row == enPassantRow
  ) {
    moves.push([row + direction, col + 1]);
  }
  return moves;
}
createBoard();
render();

let selectedPiece = null;
let legalMoves = [];
let currentTurn = "w";
board.addEventListener("click", (e) => {
  let square = e.target.closest(".square");
  if (!square) return;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
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
      default:
        console.log("Not programmed yet.");
    }
  } else {
    const isLegalMove = legalMoves.some((move) => {
      return move[0] == row && move[1] == col;
    });
    if (isLegalMove) {
      childclass[row][col] = selectedPiece.piece;
      childclass[selectedPiece.row][selectedPiece.col] = null;
      currentTurn = currentTurn == "w" ? "b" : "w";
      selectedPiece = null;
      legalMoves = [];
      render();
    } else {
      console.log("Not a legal Move");
      console.log(legalMoves);
      selectedPiece = null;
      legalMoves = [];
      render();
    }
  }
});
//بداية كود الدوائر
let back_color = document.getElementById("back_color");
let is_active = document.getElementById("is_active");
let button = document.getElementById("button1");
function show_imgnsqr(i) {
  if (is_active.value == "T") {
    p.style.setProperty("z-index", "1000");
    imgn_sqr.style.setProperty("display", "none");
    imgn_sqr.style.setProperty("z-index", "800");
    console.log(p.style.zIndex);
    console.log(imgn_sqr.style.zIndex);
  }
  imgn_sqr.children[i].children[0].style.display = "block";
  imgn_sqr.children[i].children[0].style.borderColor = back_color.value;
}
function rmv() {
  for (let e = 0; e < imgn_sqr.children.length - 2; e++) {
    imgn_sqr.children[e + 2].children[0].style.display = "none";
  }
}
function hello() {
  console.log(is_active.value == "F");
  if (is_active.value == "F") {
    p.style.setProperty("z-index", "0.5");
    imgn_sqr.style.setProperty("display", "grid");
    imgn_sqr.style.setProperty("z-index", "800");
    console.log(p.style.zIndex);
    console.log(imgn_sqr.style.zIndex);
    console.log(imgn_sqr.style.display);
  }
}
//نهايته
let min = document.getElementById("min");
let tensec = document.getElementById("tensec");
let sec = document.getElementById("sec");
//for (let tm = 0; tm < 1; tm++) {
//    if(sec.innerHTML=='0' && tensec.innerHTML=='0'){
//    setInterval(function setmin() {
//      min.innerHTML=String(Number(min.innerHTML)-1)
//      tensec.innerHTML='5'
//    },1000)}
//    for (let tts = 0; tts < 1; tts++) {
//        if(sec.innerHTML=='0'){
//        setInterval(function settensec() {
//          tensec.innerHTML=String(Number(tensec.innerHTML)-1)
//          sec.innerHTML='9'
//        },1000)}
//        for (let ti = 0; ti < 1; ti++) {
//        setInterval(function setsec() {
//          sec.innerHTML=String(Number(sec.innerHTML)-1)
//          console.log(min.innerHTML,':',tensec.innerHTML,sec.innerHTML)
//        },1000)}}
//}
