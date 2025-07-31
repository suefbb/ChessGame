import { isKingInCheck, isMoveLeavingKingInCheck } from "./kingUtils.js";
import { getMoves } from "./pieces.js";
import { isValidSquare, switchTurn } from "./utils.js";

const BOARD_DIM = 15;
let movesPlayed = 0;
const pieceMap = {
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
let pgnMoves = [];
var childclass = [
  ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
  [
    14,
    "bR",
    "bE",
    "bB",
    "bZ",
    "bF",
    "bS",
    "bQ",
    "bK",
    "bO",
    "bW",
    "bC",
    "bB",
    "bP",
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
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
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
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
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
    "wE",
    "wB",
    "wZ",
    "wF",
    "wS",
    "wQ",
    "wK",
    "wO",
    "wW",
    "wC",
    "wB",
    "wP",
    "wR",
  ],
];
let board = document.querySelector(".board");
let nextMove = document.querySelector("#nextMove");
let lastMove = document.querySelector("#lastMove");
let moveIndex = -1;
let pgnArr = [];
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
      pieceImg.style.height = "100%";
      pieceImg.style.width = "100%";
      pieceDiv.appendChild(pieceImg);
      square.appendChild(pieceDiv);
    }
  });
}

createBoard();
render();

let selectedPiece = null;
let legalMoves = [];
let currentTurn = "w";
let promotedPiece = document.querySelector(".choosePromotedPiece");
let pgn = document.querySelector(".PGN");
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
    legalMoves = getMoves(selectedPiece.row, selectedPiece.col, childclass);
    legalMoves = legalMoves.filter(
      (move) =>
        !isMoveLeavingKingInCheck(
          [selectedPiece.row, selectedPiece.col],
          move,
          childclass,
          currentTurn,
        ),
    );
    showHints(legalMoves);
    return;
  }
  const isLegalMove = legalMoves.some((move) => {
    return move[0] == row && move[1] == col;
  });
  isLegalMove;
  if (isLegalMove) {
    moveIndex++;
    pgnMoves.push([
      childclass[selectedPiece.row][selectedPiece.col],
      [row, col],
      [selectedPiece.row, selectedPiece.col],
      childclass[row][col],
    ]);
    console.log(pgnMoves[moveIndex]);
    pgnMoves[moveIndex].push(WtimeNumbers, BtimeNumbers);
    if (moveIndex !== pgnMoves.length - 1) {
      if (pgnMoves.length !== 0) {
        console.log("the loop started");
        for (let RM = 0; RM < pgnMoves.length; RM++) {
          if (moveIndex !== pgnMoves.length - 1) {
            pgnMoves.splice(pgnMoves.length - 2, 1);
            console.log(pgnMoves);
          } else {
            break;
          }
        }
      }
    }

    //the pgn that shown in the pgn square
    if (childclass[selectedPiece.row][selectedPiece.col][1] !== "p") {
      pgnArr.push([
        childclass[selectedPiece.row][selectedPiece.col][1],
        childclass[0][col],
        childclass[row][0],
      ]);
    } else {
      pgnArr.push([childclass[0][col], childclass[row][0]]);
    }
    if (
      isCapture(
        row,
        col,
        childclass[selectedPiece.row][selectedPiece.col][0],
      ) &&
      childclass[selectedPiece.row][selectedPiece.col][1] !== "p"
    ) {
      pgnArr[movesPlayed].splice(1, 0, "x");
    } else if (
      isCapture(
        row,
        col,
        childclass[selectedPiece.row][selectedPiece.col][0],
      ) &&
      childclass[selectedPiece.row][selectedPiece.col][1] == "p"
    ) {
      pgnArr[movesPlayed].splice(0, 0, childclass[0][selectedPiece.col]);
      pgnArr[movesPlayed].splice(1, 0, "x");
    }
    pgn.innerHTML = String(pgnArr);
    movesPlayed++;
  }
  if (!isLegalMove) {
    console.log("Not a legal Move");
    console.log(legalMoves);
    clearHints(legalMoves);
    selectedPiece = null;
    legalMoves = [];
    render();
    return;
  }
  console.log(selectedPiece);
  movePiece([selectedPiece.row, selectedPiece.col], [row, col], childclass);
  if (currentTurn == "w") {
    //promotion
    for (let pawnRow = 0; pawnRow < childclass[1].length; pawnRow++) {
      if (childclass[1][pawnRow] == "wp") {
        promotedPiece.style.opacity = 1;
      }
    }
    Btimer();
    clearInterval(Wtime);
  } else {
    //promotion
    for (let pawnRow = 0; pawnRow < childclass[14].length; pawnRow++) {
      if (childclass[14][pawnRow] == "bp") {
        promotedPiece.style.opacity = 1;
      }
    }
    Wtimer();
    clearInterval(Btime);
  }
  clearHints(legalMoves);
  currentTurn = switchTurn(currentTurn);
  selectedPiece = null;
  legalMoves = [];
  render();
});
function showHints(coords) {
  const squares = getSquaresByCoords(legalMoves);
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
  for (let i = 0; i < coords.length; i++) {
    squares.push(
      document.querySelector(
        `.square[data-row="${coords[i][0]}"][data-col="${coords[i][1]}"]`,
      ),
    );
  }
  return squares;
}
getSquaresByCoords(legalMoves);
function isCapture(row, col, color) {
  return (
    isValidSquare(row, col) &&
    childclass[row][col] &&
    childclass[row][col][0] != color
  );
}
function getPieceType(r, c, board) {
  return board[r][c][1];
}

export function movePiece([fromR, fromC], [toR, toC], board) {
  if (isEnPassant([fromR, fromC], [toR, toC], board)) {
    board[fromR][toC] = null;
  }
  board[toR][toC] = board[fromR][fromC];
  board[fromR][fromC] = null;
  console.log(
    `Is ${currentTurn} King In Check? ${isKingInCheck(currentTurn, childclass)}`,
  );
}
function isEnPassant([fromR, fromC], [toR, toC], board) {
  const piece = board[fromR][fromC];
  const isPawn = getPieceType(fromR, fromC, board) == "P";
  const forwardDirection = piece[0] == "w" ? -1 : 1;
  if (isPawn && Math.abs(fromC - toC) == 1 && toR - fromR == forwardDirection) {
    return true;
  }
  return false;
}

let Btime = "";
let BtimeNumbers = [10, 0, 0, 0];
let Bmin = document.getElementById("Bmin");
let Btensec = document.getElementById("Btensec");
let Bsec = document.getElementById("Bsec");
let Bmlsec = document.getElementById("Bmlsec");
function Btimer() {
  Btime = setInterval(() => {
    Bmin.innerHTML = BtimeNumbers[0];
    Btensec.innerHTML = BtimeNumbers[1];
    Bsec.innerHTML = BtimeNumbers[2];
    if (BtimeNumbers[0] == 0 && BtimeNumbers[1] < 4) {
      Bmlsec.innerHTML = "." + BtimeNumbers[3];
    }
    if (BtimeNumbers[3] !== 0) {
      BtimeNumbers[3]--;
    } else if (BtimeNumbers[3] == 0 && BtimeNumbers[2] !== 0) {
      clearInterval(Btime);
      BtimeNumbers[3] = 9;
      BtimeNumbers[2]--;
      Btimer();
    } else if (
      BtimeNumbers[3] == 0 &&
      BtimeNumbers[2] == 0 &&
      BtimeNumbers[1] !== 0
    ) {
      clearInterval(Btime);
      BtimeNumbers[3] = 9;
      BtimeNumbers[2] = 9;
      BtimeNumbers[1]--;
      Btimer();
    } else if (
      BtimeNumbers[3] == 0 &&
      BtimeNumbers[2] == 0 &&
      BtimeNumbers[1] == 0 &&
      BtimeNumbers[0] !== 0
    ) {
      clearInterval(Btime);
      BtimeNumbers[3] = 9;
      BtimeNumbers[2] = 9;
      BtimeNumbers[1] = 5;
      BtimeNumbers[0]--;
      Btimer();
    } else if (
      BtimeNumbers[3] == 0 &&
      BtimeNumbers[2] == 0 &&
      BtimeNumbers[1] == 0 &&
      BtimeNumbers[0] == 0
    ) {
      clearInterval(Btime);
    }
  }, 100);
}
let Wtime = "";
let WtimeNumbers = [10, 0, 0, 0];
let Wmin = document.getElementsByClassName("Wmin");
let Wtensec = document.getElementsByClassName("Wtensec");
let Wsec = document.getElementsByClassName("Wsec");
let Wmlsec = document.getElementsByClassName("Wmlsec");
function Wtimer() {
  Wtime = setInterval(() => {
    Wmin[0].innerHTML = WtimeNumbers[0];
    Wtensec[0].innerHTML = WtimeNumbers[1];
    Wsec[0].innerHTML = WtimeNumbers[2];
    if (WtimeNumbers[0] == 0 && WtimeNumbers[1] < 4) {
      Wmlsec[0].innerHTML = "." + WtimeNumbers[3];
    }
    if (WtimeNumbers[3] !== 0) {
      WtimeNumbers[3]--;
    } else if (WtimeNumbers[3] == 0 && WtimeNumbers[2] !== 0) {
      clearInterval(Wtime);
      WtimeNumbers[3] = 9;
      WtimeNumbers[2]--;
      Wtimer();
    } else if (
      WtimeNumbers[3] == 0 &&
      WtimeNumbers[2] == 0 &&
      WtimeNumbers[1] !== 0
    ) {
      clearInterval(Wtime);
      WtimeNumbers[3] = 9;
      WtimeNumbers[2] = 9;
      WtimeNumbers[1]--;
      Wtimer();
    } else if (
      WtimeNumbers[3] == 0 &&
      WtimeNumbers[2] == 0 &&
      WtimeNumbers[1] == 0 &&
      WtimeNumbers[0] !== 0
    ) {
      clearInterval(Wtime);
      WtimeNumbers[3] = 9;
      WtimeNumbers[2] = 9;
      WtimeNumbers[1] = 5;
      WtimeNumbers[0]--;
      Wtimer();
    } else if (
      WtimeNumbers[3] == 0 &&
      WtimeNumbers[2] == 0 &&
      WtimeNumbers[1] == 0 &&
      WtimeNumbers[0] == 0
    ) {
      clearInterval(Wtime);
    }
  }, 100);
}
lastMove.addEventListener("click", () => {
  childclass[pgnMoves[moveIndex][2][0]][pgnMoves[moveIndex][2][1]] =
    pgnMoves[moveIndex][0];
  childclass[pgnMoves[moveIndex][1][0]][pgnMoves[moveIndex][1][1]] =
    pgnMoves[moveIndex][3];
  console.log(pgnMoves);
  render();
  console.log(currentTurn == "w");
  if (currentTurn == "w") {
    currentTurn = "b";
    BtimeNumbers = pgnMoves[moveIndex][5];
    console.log(BtimeNumbers);
    Btimer();
    clearInterval(Wtime);
  } else {
    currentTurn = "w";
    WtimeNumbers = pgnMoves[moveIndex][4];
    console.log(WtimeNumbers);
    Wtimer();
    clearInterval(Btime);
  }
  moveIndex--;
  console.log(moveIndex);
  console.log(pgnMoves);
});
nextMove.addEventListener("click", () => {
  if (moveIndex < pgnMoves.length - 1) {
    moveIndex++;
    childclass[pgnMoves[moveIndex][2][0]][pgnMoves[moveIndex][2][1]] = null;
    childclass[pgnMoves[moveIndex][1][0]][pgnMoves[moveIndex][1][1]] =
      pgnMoves[moveIndex][0];
    console.log(pgnMoves);
    render();
    console.log(currentTurn == "w");
    if (currentTurn == "w") {
      currentTurn = "b";
      BtimeNumbers = pgnMoves[moveIndex][5];
      Btimer();
      clearInterval(Wtime);
    } else {
      currentTurn = "w";
      WtimeNumbers = pgnMoves[moveIndex][4];
      Wtimer();
      clearInterval(Btime);
    }
    console.log(moveIndex);
    console.log(pgnMoves);
  }
});
function promotePiece(Prow, pieceKey) {
  console.log(Prow, pieceKey);
  for (let Pcol = 0; Pcol < childclass[Prow].length; Pcol++) {
    console.log(childclass[Prow][Pcol]);
    if (childclass[Prow][Pcol] == "wp") {
      childclass[Prow][Pcol] = "w" + pieceKey;
      pgnArr[movesPlayed - 1].push("=", pieceKey);
      pgn.innerHTML = String(pgnArr);
    }
    if (childclass[Prow][Pcol] == "bp") {
      childclass[Prow][Pcol] = "b" + pieceKey;
      pgnArr[movesPlayed - 1].push("=", pieceKey);
      pgn.innerHTML = String(pgnArr);
    }
  }
  render();
}
