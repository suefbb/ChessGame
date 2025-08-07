import { isKingInCheck, isMoveLeavingKingInCheck } from "./kingUtils.js";
import { getMoves } from "./pieces.js";
import { isValidSquare, switchTurn } from "./utils.js";
import { changepgnmovestoPGN } from "./extensions.js";
let result = '*'
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
const promotionRows = {
  b: 14,
  w: 1,
};
let acceptDraw = [false , false]
let board = document.querySelector(".board");
let nextMove = document.querySelector("#nextMove");
let lastMove = document.querySelector("#lastMove");
let moveIndex = -1;
let rightthings = document.querySelector(".rightthings");
const resultDiv = document.querySelector(".resultDiv")
rightthings.children[3].children[2].children[3].addEventListener('click' , ()=>{resign(localStorage.currentTurn)})
rightthings.children[3].children[2].children[2].addEventListener('click' , ()=>{drawOffer(JSON.parse(localStorage.acceptDraw) , localStorage.currentTurn)})
for (let child = 0; child < rightthings.children[2].children.length; child++) {
  if (child % 12 == 11) {
    rightthings.children[2].children[child].addEventListener('click',()=>{promotePawn(promotionRows[rightthings.children[2].children[child].src[22]],rightthings.children[2].children[child].src[25].toUpperCase())})
  }else{rightthings.children[2].children[child].addEventListener('click',()=>{promotePawn(promotionRows[rightthings.children[2].children[child].src[22]],rightthings.children[2].children[child].src[24].toUpperCase())})}
}
let rotation = document.querySelector("#rotation");
function createBoard(position) {
  for (let i = 0; i < position.length; i++) {//position
    for (let j = 0; j < position.length; j++) {//position
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
function render(position) {//childclass
  const squares = document.querySelectorAll(".board .square");
  squares.forEach((square, index) => {
    square.innerHTML = "";
    const row = Math.floor(index / BOARD_DIM);
    const col = index % BOARD_DIM;
    if (col == 0) {
      square.textContent = position[row][col];
      return;
    }
    if (row == 0) {
      square.textContent = position[row][col];
      return;
    }
    const piece = position[row][col];
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
createBoard(JSON.parse(localStorage.childclass));
render(JSON.parse(localStorage.childclass));
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
    if (JSON.parse(localStorage.childclass)[row][col][0] != localStorage.currentTurn) return;
    selectedPiece = {
      row,
      col,
      piece: JSON.parse(localStorage.childclass)[row][col],
      type: JSON.parse(localStorage.childclass)[row][col][1],
    };
    legalMoves = getMoves(selectedPiece.row, selectedPiece.col, JSON.parse(localStorage.childclass));
    //FIX ME
    //legalMoves = legalMoves.filter(
    //  (move) =>
    //    !isMoveLeavingKingInCheck(
    //      [selectedPiece.row, selectedPiece.col],
    //      move,
    //      JSON.parse(localStorage.childclass),
    //      localStorage.currentTurn,
    //    ),
    //);
    showHints(legalMoves);
    return;
  }
  const isLegalMove = legalMoves.some((move) => {
    return move[0] == row && move[1] == col;
  });
  isLegalMove;
  if (isLegalMove) {
    localStorage.moveIndex = String(Number(localStorage.moveIndex)+1)
    let storedpgnMoves = JSON.parse(localStorage.getItem('pgnMoves'))
    let pushingDatatoit = storedpgnMoves.push([
        JSON.parse(localStorage.childclass)[selectedPiece.row][selectedPiece.col],
        [row, col],
        [selectedPiece.row, selectedPiece.col],
        JSON.parse(localStorage.childclass)[row][col],
        WtimeNumbers,
        BtimeNumbers
      ])
    localStorage.pgnMoves = JSON.stringify(storedpgnMoves)
    changepgnmovestoPGN(JSON.parse(localStorage.pgnMoves))
    pgn.innerHTML = String(changepgnmovestoPGN(JSON.parse(localStorage.pgnMoves)))
    if (Number(localStorage.moveIndex) !== JSON.parse(localStorage.pgnMoves).length - 1) {
      if (JSON.parse(localStorage.pgnMoves).length !== 0) {
        console.log("the loop started");
        for (let RM = 0; RM < JSON.parse(localStorage.pgnMoves).length; RM++) {
          if (Number(localStorage.moveIndex) !== JSON.parse(localStorage.pgnMoves).length - 1) {
            let j = JSON.parse(localStorage.pgnMoves)
            j.splice(j.length - 2, 1);
            localStorage.pgnMoves = JSON.stringify(j)
          } else {
            break;
          }
        }
        changepgnmovestoPGN(JSON.parse(localStorage.pgnMoves))
        pgn.innerHTML = String(changepgnmovestoPGN(JSON.parse(localStorage.pgnMoves)))
      }
    }
    localStorage.movesPlayed = String(Number(localStorage.movesPlayed)+1)
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
  movePiece([selectedPiece.row, selectedPiece.col], [row, col], JSON.parse(localStorage.childclass));
  if (localStorage.currentTurn == "w") {
    if (rotation.value == 'True') {
      rightthings.children[0].style.transform = 'Rotate(180deg)'
      rightthings.children[1].style.transform = 'Rotate(180deg)'
      rightthings.children[2].style.transform = 'Rotate(180deg)'
      rightthings.children[3].style.transform = 'Rotate(180deg)'
      rightthings.children[4].style.transform = 'Rotate(180deg)'
      rightthings.children[5].style.transform = 'Rotate(180deg)'
    }
    //promotion
    for (let pawnRow = 0; pawnRow < JSON.parse(localStorage.childclass)[1].length; pawnRow++) {
      if (JSON.parse(localStorage.childclass)[1][pawnRow] == "wp") {
        promotedPiece.style.opacity = 1;
      }
    }
    Btimer();
    clearInterval(Wtime);
  } else {
    if (rotation.value == 'True') {
      rightthings.children[0].style.transform = 'Rotate(0deg)'
      rightthings.children[1].style.transform = 'Rotate(0deg)'
      rightthings.children[2].style.transform = 'Rotate(0deg)'
      rightthings.children[3].style.transform = 'Rotate(0deg)'
      rightthings.children[4].style.transform = 'Rotate(0deg)'
      rightthings.children[5].style.transform = 'Rotate(0deg)'
    }
    //promotion
    for (let pawnRow = 0; pawnRow < JSON.parse(localStorage.childclass)[14].length; pawnRow++) {
      if (JSON.parse(localStorage.childclass)[14][pawnRow] == "bp") {
        promotedPiece.style.opacity = 1;
      }
    }
    Wtimer();
    clearInterval(Btime);
  }
  clearHints(legalMoves);
  localStorage.currentTurn = switchTurn(localStorage.currentTurn);
  selectedPiece = null;
  legalMoves = [];
  render(JSON.parse(localStorage.childclass));
});
function showHints(coords) {
  const squares = getSquaresByCoords(legalMoves);
  squares.forEach((square, index) => {
    const [row, col] = coords[index];
    if (isCapture(row, col, localStorage.currentTurn)) {
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
    JSON.parse(localStorage.childclass)[row][col] &&
    JSON.parse(localStorage.childclass)[row][col][0] != color
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
  localStorage.setItem('childclass' , JSON.stringify(board))
  //console.log(
  //  `Is ${currentTurn} King In Check? ${isKingInCheck(currentTurn, childclass)}`,
  //);
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
  let h = JSON.parse(localStorage.childclass)
  h[JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][2][0]][JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][2][1]] =JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][0]
  h[JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][1][0]][JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][1][1]] =JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][3]
  localStorage.setItem('childclass' , JSON.stringify(h))
  render(JSON.parse(localStorage.childclass));
  if (localStorage.currentTurn == "w") {
    if (rotation.value == 'True') {
      rightthings.children[0].style.transform = 'Rotate(180deg)'
      rightthings.children[1].style.transform = 'Rotate(180deg)'
      rightthings.children[2].style.transform = 'Rotate(180deg)'
      rightthings.children[3].style.transform = 'Rotate(180deg)'
      rightthings.children[4].style.transform = 'Rotate(180deg)'
      rightthings.children[5].style.transform = 'Rotate(180deg)'
    }
    localStorage.currentTurn = "b";
    BtimeNumbers = JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][5];
    console.log(BtimeNumbers);
    Btimer();
    clearInterval(Wtime);
  } else {
    if (rotation.value == 'True') {
      rightthings.children[0].style.transform = 'Rotate(0deg)'
      rightthings.children[1].style.transform = 'Rotate(0deg)'
      rightthings.children[2].style.transform = 'Rotate(0deg)'
      rightthings.children[3].style.transform = 'Rotate(0deg)'
      rightthings.children[4].style.transform = 'Rotate(0deg)'
      rightthings.children[5].style.transform = 'Rotate(0deg)'
    }
    localStorage.currentTurn = "w";
    WtimeNumbers = JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][4];
    console.log(WtimeNumbers);
    Wtimer();
    clearInterval(Btime);
  }
  localStorage.moveIndex = String(Number(localStorage.moveIndex)-1);
});
nextMove.addEventListener("click", () => {
  if (Number(localStorage.moveIndex) < JSON.parse(localStorage.pgnMoves).length - 1) {
    localStorage.moveIndex = String(Number(localStorage.moveIndex)+1)
    let d = JSON.parse(localStorage.childclass)
    d[JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][1][0]][JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][1][1]] = JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][0];
    d[JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][2][0]][JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][2][1]] = null;
    localStorage.setItem('childclass' , JSON.stringify(d))
    render(JSON.parse(localStorage.childclass));
    if (localStorage.currentTurn == "w") {
      if (rotation.value == 'True') {
        rightthings.children[0].style.transform = 'Rotate(180deg)'
        rightthings.children[1].style.transform = 'Rotate(180deg)'
        rightthings.children[2].style.transform = 'Rotate(180deg)'
        rightthings.children[3].style.transform = 'Rotate(180deg)'
        rightthings.children[4].style.transform = 'Rotate(180deg)'
        rightthings.children[5].style.transform = 'Rotate(180deg)'}
      localStorage.currentTurn = "b";
      BtimeNumbers = JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][5];
      Btimer();
      clearInterval(Wtime);
    } else {
      if (rotation.value == 'True') {
        rightthings.children[0].style.transform = 'Rotate(0deg)'
        rightthings.children[1].style.transform = 'Rotate(0deg)'
        rightthings.children[2].style.transform = 'Rotate(0deg)'
        rightthings.children[3].style.transform = 'Rotate(0deg)'
        rightthings.children[4].style.transform = 'Rotate(0deg)'
        rightthings.children[5].style.transform = 'Rotate(0deg)'}
      localStorage.currentTurn = "w";
      WtimeNumbers = JSON.parse(localStorage.pgnMoves)[Number(localStorage.moveIndex)][4];
      Wtimer();
      clearInterval(Btime);
    }
  }
});
function promotePawn(Prow, pieceKey) {
  console.log(Prow, pieceKey);
  for (let Pcol = 0; Pcol < JSON.parse(localStorage.childclass)[Prow].length; Pcol++) {
    console.log(JSON.parse(localStorage.childclass)[Prow][Pcol]);
    if (JSON.parse(localStorage.childclass)[Prow][Pcol] == "wp") {
      JSON.parse(localStorage.childclass)[Prow][Pcol] = "w" + pieceKey;
    }
    if (JSON.parse(localStorage.childclass)[Prow][Pcol] == "bp") {
      JSON.parse(localStorage.childclass)[Prow][Pcol] = "b" + pieceKey;
    }
  }
  render();
}
function resign(turn) {
    console.log(turn);
    if (turn == 'w') {
      localStorage.result = 'Black won'
    }
    if (turn == 'b') {
      localStorage.result = 'White won'
    }
    resultDiv.style.display = 'flex'
    resultDiv.children[0].innerHTML = localStorage.result
    localStorage.result = '*'
    localStorage.acceptDraw = JSON.stringify([false , false])
    localStorage.movesPlayed = '0'
    localStorage.moveIndex = '-1'
    localStorage.pgnMoves = JSON.stringify([])
    localStorage.currentTurn = 'w'   
    localStorage.childclass = JSON.stringify(JSON.parse(localStorage.start))
    render(JSON.parse(localStorage.start))
}
function drawOffer(wantsToDraw , turn) {
  if (turn == 'w') {
  if (wantsToDraw[1]) {
    wantsToDraw[0] = true
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)
    localStorage.result = 'Draw'
    resultDiv.style.display = 'flex'
    resultDiv.children[0].innerHTML = localStorage.result
    localStorage.result = '*'
    localStorage.acceptDraw = JSON.stringify([false , false])
    localStorage.movesPlayed = '0'
    localStorage.moveIndex = '-1'
    localStorage.pgnMoves = JSON.stringify([])
    localStorage.currentTurn = 'w'   
    localStorage.childclass = JSON.stringify(JSON.parse(localStorage.start))
  }else if (wantsToDraw[0]){
    wantsToDraw[0] = false
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)
  }
  else{wantsToDraw[0] = true
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)}
  }
  if (turn == 'b') {
  if (wantsToDraw[0]) {
    wantsToDraw[1] = true
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)
    localStorage.result = 'Draw'
    resultDiv.style.display = 'flex'
    resultDiv.children[0].innerHTML = localStorage.result
    localStorage.result = '*'
    localStorage.acceptDraw = JSON.stringify([false , false])
    localStorage.movesPlayed = '0'
    localStorage.moveIndex = '-1'
    localStorage.pgnMoves = JSON.stringify([])
    localStorage.currentTurn = 'w'   
    localStorage.childclass = JSON.stringify(JSON.parse(localStorage.start))
  }else if (wantsToDraw[1]){
    wantsToDraw[1] = false
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)
  }
  else{wantsToDraw[1] = true
    localStorage.acceptDraw = JSON.stringify(wantsToDraw)}
  }
  console.log(wantsToDraw);
}