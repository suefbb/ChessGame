const BOARD_DIM = 15;
let movesPlayed = 0
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
  P: "pigeon"
};
let pgnMoves = []
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
    null,
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
    null,
    "wO",
    "wW",
    "wC",
    "wB",
    "wP",
    "wR",
  ],
];
let board = document.querySelector(".board");
let nextMove = document.querySelector("#nextMove")
let lastMove = document.querySelector("#lastMove")
let moveIndex = -1
let pgnString = ''
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
      pieceImg.style.height='100%'
      pieceImg.style.width='100%'
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
  let z = -1
  for (const [dr, dc] of directions) {
    z++
    for (let i = 1; ; i++) {
      //when you move a crocodile make the directions let = crocodile direction
      if(childclass[row][col][1] == 'C'){
        directions = [
          [0, 1],
          [(i-1)/i, 1/i],
          [(i-1)/i, -1/i],
          [0, -1],
          [(-i+1)/i , -1/i],
          [(-i+1)/i , 1/i]
        ];}
      //when you move an octopus make the directions let = octopus direction
      if(childclass[row][col][1] == 'O'){
        if (i == 3) {break}
        directions = [
          [-0.5*(i+1), -1/i],
          [-0.5*(i+1), 1/i],
          [0.5*(i+1), -1/i],
          [0.5*(i+1), 1/i],
          [-1/i ,-0.5*(i+1)],
          [1/i , -0.5*(i+1)],
          [-1/i , 0.5*(i+1)],
          [1/i , 0.5*(i+1)]
        ];}
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol))break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) {moves.push([newRow, newCol]);}
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
function getJumpingMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  let moves = [];
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
function getSSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  let z = -1
  for (const [dr, dc] of directions) {
    z++
    for (let i = 1; ; i++) {
      if(i%2==0){
        directions = [
          [-2, 0],
          [-2, 0],
          [0, 2],
          [0, 2],
          [0, -2],
          [0, -2],
          [2, 0],
          [2, 0],
        ];}
      else{
        directions=[
          [-2, -1/i],
          [-2, 1/i],
          [-1/i, 2],
          [1/i, 2],
          [-1/i, -2],
          [1/i, -2],
          [2, -1/i],
          [2, 1/i]
        ]}
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
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
  return getJumpingMoves(row, col, directions, board);
}
function getFrogMoves(row, col, board) {
  const directions = [
    [4, -2], [4, -3], [5, -2], [5, -3], [-2, 4], [-3, 4], [-2, 5], [-3, 5],
    [-4, -2],[-4, -3],[-5, -2],[-5, -3],[-2, -4],[-3, -4],[-2, -5],[-3, -5],
    [-4, 2], [-4, 3], [-5, 2], [-5, 3], [2, -4], [3, -4], [2, -5], [3, -5],
    [4, 2],  [4, 3],  [5, 2],  [5, 3],  [2, 4],  [3, 4],  [2, 5],  [3, 5]
  ];
  return getJumpingMoves(row, col, directions, board);
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
function getElephantMoves(row, col, board) {
  return [...getRookMoves(row, col, board), ...getKnightMoves(row, col, board)];
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
  let directions = [[0,1],[1,1],[1,-1],[0,-1],[-1,-1],[-1,1]]
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}
function getWallMoves(row, col, board) {
  let moves = [];
  const directions = [
    [0,2],
    [-1,2],
    [-2,2],
    [1,2],
    [2,2],
    [0,-3],
    [-1,-3],
    [-2,-3],
    [1,-3],
    [2,-3],
  ];
  if (childclass[row][col][0]=='w') {
    directions.push([-3,-3],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[2,-2],[2,-1],[2,0],[2,1])    
  }else{directions.push([3,-3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[-2,-2],[-2,-1],[-2,0],[-2,1])}
  return [...getJumpingMoves(row, col, directions, board)];
}
function getPigeonMoves(row, col, board) {
  return [
    ...getBishopMoves(row, col, board),
    ...getKnightMoves(row, col, board),
  ];
}
function getOctopusMoves(row, col, board) {
  let moves = []
  //i wrote any directions becuase i can't put the real dircetions here becuase i is not defiend
  let directions = [[0,1],[1,1],[1,-1],[0,-1],[-1,-1],[-1,1],[-1,-1],[-1,1]]
  moves = [...getSlideMoves(row, col, directions, board)];
  const Jumpdirections = [
    [-3, -2],
    [-3, 2],
    [3, -2],
    [3, 2],
    [-2, -3],
    [2, -3],
    [-2, 3],
    [2, 3],
  ];
  moves.push(...getJumpingMoves(row, col, Jumpdirections, board));
  return moves;
}
function getPawnMoves(row, col, board) {
  let moves = [];
  const pieceColor = board[row][col][0];
  const direction = pieceColor == "w" ? -1 : 1;
  const enPassantRow = pieceColor == "w" ? 9 : 6;
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
createBoard();
render();

let selectedPiece = null;
let legalMoves = [];
let currentTurn = "w";
let pgn = document.querySelector(".PGN")
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
      case "p":
        legalMoves = [
          ...getPawnMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break
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
          ...getCrocodileMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "E":
        legalMoves = [
          ...getElephantMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "W":
        legalMoves = [
          ...getWallMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "P":
        legalMoves = [
          ...getPigeonMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "O":
        legalMoves = [
          ...getOctopusMoves(selectedPiece.row, selectedPiece.col, childclass),
        ];
        break;
      case "F":
        legalMoves = [
          ...getFrogMoves(selectedPiece.row, selectedPiece.col, childclass),
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
    if (isLegalMove) {
      moveIndex++
      pgnMoves.push([childclass[selectedPiece.row][selectedPiece.col],[row,col],[selectedPiece.row,selectedPiece.col],childclass[row][col]])
      console.log(pgnMoves[moveIndex]);
      pgnMoves[moveIndex].push(WtimeNumbers,BtimeNumbers)
      if (moveIndex !== pgnMoves.length-1) {
        if(pgnMoves !== []){
          console.log("the loop started");
          for (let RM = 0; RM < pgnMoves.length; RM++) {
            if(moveIndex !== pgnMoves.length-1){
              pgnMoves.splice(pgnMoves.length-2 , 1)
              console.log(pgnMoves);
            }
            else{break}
          }}
      }
      console.log(pgnMoves);
      if (currentTurn == 'w') {
        Btimer()
        clearInterval(Wtime)
      }
      else{Wtimer()
          clearInterval(Btime)
          movesPlayed++}
      if (childclass[selectedPiece.row][selectedPiece.col][1] !== 'p') {
        pgnString += ` ${childclass[selectedPiece.row][selectedPiece.col][1]}${childclass[0][col]}${childclass[row][0]}`
      }else{pgnString += ` ${childclass[0][col]}${childclass[row][0]}`}
      pgn.innerHTML = pgnString
    }
    if (!isLegalMove) {
      console.log("Not a legal Move");
      console.log(legalMoves);
      clearHints(legalMoves);
      selectedPiece = null;
      legalMoves = [];
      render();
      return;
    }console.log(selectedPiece);
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
        `.square[data-row="${coords[i][0]}"][data-col="${coords[i][1]}"]`,
      ),
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
  const piece = board[fromR][fromC];
  const isPawn = getPieceType(fromR, fromC, board) == "P";
  const forwardDirection = piece[0] == "w" ? -1 : 1;
  if (isPawn && Math.abs(fromC - toC) == 1 && toR - fromR == forwardDirection) {
    return true;
  }
  return false;
}

let Btime = ''
let BtimeNumbers = [10,0,0,0]
let Bmin = document.getElementById("Bmin")
let Btensec = document.getElementById("Btensec")
let Bsec = document.getElementById("Bsec")
let Bmlsec = document.getElementById("Bmlsec")
function Btimer() {
  Btime = setInterval(()=>{
  Bmin.innerHTML= BtimeNumbers[0]
  Btensec.innerHTML = BtimeNumbers[1]
  Bsec.innerHTML = BtimeNumbers[2]
  if (BtimeNumbers[0] == 0 && BtimeNumbers[1] < 4) {
    Bmlsec.innerHTML = '.' + BtimeNumbers[3]
  }
  if (BtimeNumbers[3] !== 0) {
    BtimeNumbers[3]--
  }
  else if (BtimeNumbers[3] == 0 && BtimeNumbers[2] !== 0) {
    clearInterval(Btime)
    BtimeNumbers[3] = 9
    BtimeNumbers[2] --
    Btimer()
  }
  else if (BtimeNumbers[3] == 0 && BtimeNumbers[2] == 0 && BtimeNumbers[1] !== 0) {
    clearInterval(Btime)
    BtimeNumbers[3] = 9
    BtimeNumbers[2] = 9
    BtimeNumbers[1] --
    Btimer()
  }
  else if (BtimeNumbers[3] == 0 && BtimeNumbers[2] == 0 && BtimeNumbers[1] == 0 && BtimeNumbers[0] !== 0) {
    clearInterval(Btime)
    BtimeNumbers[3] = 9
    BtimeNumbers[2] = 9
    BtimeNumbers[1] = 5
    BtimeNumbers[0] --
    Btimer()
  }
  else if(BtimeNumbers[3] == 0 && BtimeNumbers[2] == 0 && BtimeNumbers[1] == 0 && BtimeNumbers[0] == 0) {
    clearInterval(Btime)
  }
  }, 100)
}
let Wtime = ''
let WtimeNumbers = [10,0,0,0]
let Wmin = document.getElementsByClassName("Wmin")
let Wtensec = document.getElementsByClassName("Wtensec")
let Wsec = document.getElementsByClassName("Wsec")
let Wmlsec = document.getElementsByClassName("Wmlsec")
function Wtimer() {
  Wtime = setInterval(()=>{
  Wmin[0].innerHTML= WtimeNumbers[0]
  Wtensec[0].innerHTML = WtimeNumbers[1]
  Wsec[0].innerHTML = WtimeNumbers[2]
  if (WtimeNumbers[0] == 0 && WtimeNumbers[1] < 4) {
    Wmlsec[0].innerHTML = '.' + WtimeNumbers[3]
  }
  if (WtimeNumbers[3] !== 0) {
    WtimeNumbers[3]--
  }
  else if (WtimeNumbers[3] == 0 && WtimeNumbers[2] !== 0) {
    clearInterval(Wtime)
    WtimeNumbers[3] = 9
    WtimeNumbers[2] --
    Wtimer()
  }
  else if (WtimeNumbers[3] == 0 && WtimeNumbers[2] == 0 && WtimeNumbers[1] !== 0) {
    clearInterval(Wtime)
    WtimeNumbers[3] = 9
    WtimeNumbers[2] = 9
    WtimeNumbers[1] --
    Wtimer()
  }
  else if (WtimeNumbers[3] == 0 && WtimeNumbers[2] == 0 && WtimeNumbers[1] == 0 && WtimeNumbers[0] !== 0) {
    clearInterval(Wtime)
    WtimeNumbers[3] = 9
    WtimeNumbers[2] = 9
    WtimeNumbers[1] = 5
    WtimeNumbers[0] --
    Wtimer()
  }
  else if(WtimeNumbers[3] == 0 && WtimeNumbers[2] == 0 && WtimeNumbers[1] == 0 && WtimeNumbers[0] == 0) {
    clearInterval(Wtime)
  }
  }, 100)
}
lastMove.addEventListener('click', ()=>{
  childclass[pgnMoves[moveIndex][2][0]][pgnMoves[moveIndex][2][1]] =pgnMoves[moveIndex][0]
  childclass[pgnMoves[moveIndex][1][0]][pgnMoves[moveIndex][1][1]] =pgnMoves[moveIndex][3]
  console.log(pgnMoves);
  render()
  console.log(currentTurn == 'w');
  if (currentTurn == 'w') {
    currentTurn = 'b'
    BtimeNumbers = pgnMoves[moveIndex][5]
    console.log(BtimeNumbers);
    Btimer()
    clearInterval(Wtime)
  }
  else{
    currentTurn = 'w'
    WtimeNumbers = pgnMoves[moveIndex][4]
    console.log(WtimeNumbers);
    Wtimer()
    clearInterval(Btime)}
  moveIndex--
  console.log(moveIndex);
  console.log(pgnMoves);
})
nextMove.addEventListener('click', ()=>{
  if (moveIndex < pgnMoves.length-1) {
    moveIndex++
    childclass[pgnMoves[moveIndex][2][0]][pgnMoves[moveIndex][2][1]] = pgnMoves[moveIndex][3]
    childclass[pgnMoves[moveIndex][1][0]][pgnMoves[moveIndex][1][1]] = pgnMoves[moveIndex][0]
    console.log(pgnMoves);
    render()
    console.log(currentTurn == 'w');
    if (currentTurn == 'w') {
      currentTurn = 'b'
      BtimeNumbers = pgnMoves[moveIndex][5]
      Btimer()
      clearInterval(Wtime)
    }
    else{
      currentTurn = 'w'
      WtimeNumbers = pgnMoves[moveIndex][4]
      Wtimer()
      clearInterval(Btime)}
    console.log(moveIndex);
    console.log(pgnMoves);
  }
})