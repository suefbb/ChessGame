const BOARD_DIM = 15;
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
var childclass = [
  ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
  [
    14,
    "bR",
    "bE",
    "bB",
    "bZ",
    null,
    "bS",
    null,
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
    null,
    "wS",
    null,
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
      pieceImg.src = `W${pieceMap[piece[1]]}.png`;
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
      console.log(newRow , newCol);

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
      console.log(newRow , newCol);
      

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
      console.log(newRow , newCol);
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
  let moves = [];
  const directions = [
    [0,1],[0,-1],[-1,0],[1,0]
  ];
  moves=[...getSlideMoves(row, col, directions, board)]
  const Ndirections = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
  ];
  for (const [dr , dc] of Ndirections) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare !== null) {
      }
      if (targetSquare == null || targetSquare[0] != this.color) {
        moves.push([newRow, newCol]);
      }
    }
  }
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
  if (childclass[row][col][0] == "w") {
    directions.push([-3,0],[-3,1],[-3,2],[-3,-1],[-3,-2],[-3,-3],[2,0],[2,1],[2,-1],[2,-2])
  }
  else{directions.push([-2,0],[-2,1],[-2,-1],[-2,-2],[3,0],[3,1],[3,2],[3,-1],[3,-2],[3,-3])}
  for (const [dr , dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null || targetSquare[0] != this.color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  return moves;
}
function getPigeonMoves(row, col, board) {
  let moves = [];
  const directions = [
    [-1,1],[-1,-1],[1,-1],[1,1]
  ];
  moves=[...getSlideMoves(row, col, directions, board)]
  const Ndirections = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
  ];
  for (const [dr , dc] of Ndirections) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null || targetSquare[0] != this.color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  return moves;
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
  for (const [dr , dc] of Jumpdirections) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidSquare(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];
      if (targetSquare == null || targetSquare[0] != this.color) {
        moves.push([newRow, newCol]);
      }
    }
  }
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
      default:
        console.log("Not programmed yet.");
        break;
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
function isCapture(row, col, color) {
  return (
    isValidSquare(row, col) &&
    childclass[row][col] &&
    childclass[row][col][0] != color
  );
}
//let seconds = 9
//let tenseconds = 5
//let minutes = 9
///function timer() {
//  setInterval(()=>{seconds--
//  console.log(seconds);
//  }, 1000)
//}
//timer()