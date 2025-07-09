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
createBoard();
render();

let selecetedPiece = null;
let legalMoves = [];
let currentTurn = "w";
board.addEventListener("click", (e) => {
  let square = e.target.closest(".square");
  if (!square) return;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  if (!selecetedPiece) {
    if (!square.children.length > 0) return;
    if (childclass[row][col][0] != currentTurn) return;
    selecetedPiece = {
      row,
      col,
      piece: childclass[row][col],
      color: childclass[row][col][0],
      type: childclass[row][col][1],
    };
    switch (selecetedPiece.type) {
      case "R":
        legalMoves = [
          ...getRookMoves(selecetedPiece.row, selecetedPiece.col, childclass),
        ];
        break;
      case "B":
        legalMoves = [
          ...getBishopMoves(selecetedPiece.row, selecetedPiece.col, childclass),
        ];
        break;
      case "N":
        legalMoves = [
          ...getKnightMoves(selecetedPiece.row, selecetedPiece.col, childclass),
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
      childclass[row][col] = selecetedPiece.piece;
      childclass[selecetedPiece.row][selecetedPiece.col] = null;
      currentTurn = currentTurn == "w" ? "b" : "w";
      selecetedPiece = null;
      legalMoves = [];
      render();
    } else {
      console.log("Not a legal Move");
      console.log(legalMoves);
      selecetedPiece = null;
      legalMoves = [];
      render();
    }
  }
});
//end
function movepawn(pawnRow) {
  console.log(pawnRow);
}
function moverook(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 13].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 13].parentElement.classList[1].slice(
    2,
    pieces[mm + 13].parentElement.classList[1].length
  );
  for (t2 = 2; t2 < 198; t2++) {
    childclass[t2].children[0].style.display = "none";
  }
  for (s2 = 2; s2 < 198; s2++) {
    if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[mm + 13].parentElement.id.slice(
            1,
            pieces[mm + 13].parentElement.id.length
          )
        ) &&
      childclass[s2].id[0] == pieces[mm + 13].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "none";
    } else if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[mm + 13].parentElement.id.slice(
            1,
            pieces[mm + 13].parentElement.id.length
          )
        ) ||
      childclass[s2].id[0] == pieces[mm + 13].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "block";
    } else {
      childclass[s2].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b = false;
  for (let rci = 0; rci < 13; rci++) {
    if (a == 197) {
      break;
    }
    a++;
    if (childclass[a].children.length > 1 || b == true) {
      childclass[a].children[0].style.display = "none";
      b = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b2 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a - 14;
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b2 == true) {
      childclass[a].children[0].style.display = "none";
      b2 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b3 = false;
  for (let rci = 0; rci < 13; rci++) {
    a--;
    if (
      Number(
        childclass[a].classList[1].slice(2, childclass[a].classList[1].length)
      ) < 3
    ) {
      break;
    }
    if (childclass[a].children.length > 1 || b3 == true) {
      childclass[a].children[0].style.display = "none";
      b3 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b4 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 14;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b4 == true) {
      childclass[a].children[0].style.display = "none";
      b4 = true;
    }
  }
}
function movebishop(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 15].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 15].parentElement.classList[1].slice(
    2,
    pieces[mm + 15].parentElement.classList[1].length
  );
  for (t3 = 2; t3 < 198; t3++) {
    childclass[t3].children[0].style.display = "none";
  }
  for (s3 = 2; s3 < 198; s3++) {
    if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) &&
      childclass[s3].id[0] == pieces[mm + 15].parentElement.id[0]
    ) {
      childclass[s3].children[0].style.display = "none";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) ==
      alpha.indexOf(childclass[s3].id[0]) -
        alpha.indexOf(pieces[mm + 15].parentElement.id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) ==
      alpha.indexOf(pieces[mm + 15].parentElement.id[0]) -
        alpha.indexOf(childclass[s3].id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else {
      childclass[s3].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      if (a < 3) {
        break;
      }
      a = a - 13;
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      a = a - 15;
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 15;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "n" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 13;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "a" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
}
function moveknight(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 17].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 17].parentElement.classList[1].slice(
    2,
    pieces[mm + 17].parentElement.classList[1].length
  );
  for (t4 = 2; t4 < 198; t4++) {
    childclass[t4].children[0].style.display = "none";
  }
  for (s4 = 2; s4 < 198; s4++) {
    if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else {
      childclass[s4].children[0].style.display = "none";
    }
  }
}
function movecro(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[20].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[20].parentElement.classList[1].slice(
    2,
    pieces[20].parentElement.classList[1].length
  );
  for (t2 = 2; t2 < 198; t2++) {
    childclass[t2].children[0].style.display = "none";
  }
  for (s2 = 2; s2 < 198; s2++) {
    if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[20].parentElement.id.slice(
            1,
            pieces[20].parentElement.id.length
          )
        ) &&
      childclass[s2].id[0] == pieces[20].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "none";
    } else if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
      Number(
        pieces[20].parentElement.id.slice(1, pieces[20].parentElement.id.length)
      )
    ) {
      childclass[s2].children[0].style.display = "block";
    } else if (
      alpha.indexOf(childclass[s2].id[0]) ==
        alpha.indexOf(pieces[20].parentElement.id[0]) + 1 ||
      alpha.indexOf(childclass[s2].id[0]) ==
        alpha.indexOf(pieces[20].parentElement.id[0]) - 1
    ) {
      childclass[s2].children[0].style.display = "block";
    } else {
      childclass[s2].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b = false;
  for (let rci = 0; rci < 13; rci++) {
    if (a == 197) {
      break;
    }
    a++;
    if (childclass[a].children.length > 1 || b == true) {
      childclass[a].children[0].style.display = "none";
      b = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b2 = false;
  for (let rci = 0; rci < 14; rci++) {
    if (rci == 0) {
      a++;
    } else {
      a = a - 14;
    }
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b2 == true) {
      childclass[a].children[0].style.display = "none";
      b2 = true;
    } else {
      childclass[a].children[0].style.display = "block";
    }
    console.log(
      childclass[a].children.length > 1 || b2 == true,
      childclass[a].children[0]
    );
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b3 = false;
  for (let rci = 0; rci < 14; rci++) {
    if (rci == 0) {
      a--;
    } else {
      a = a - 14;
    }
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b3 == true) {
      childclass[a].children[0].style.display = "none";
      b3 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b4 = false;
  for (let rci = 0; rci < 13; rci++) {
    a--;
    if (
      Number(
        childclass[a].classList[1].slice(2, childclass[a].classList[1].length)
      ) < 3
    ) {
      break;
    }
    if (childclass[a].children.length > 1 || b4 == true) {
      childclass[a].children[0].style.display = "none";
      b4 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    if (rci == 0) {
      a--;
    } else {
      a = a + 14;
    }
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b6 = false;
  for (let rci = 0; rci < 13; rci++) {
    if (rci == 0) {
      a++;
    } else {
      a = a + 14;
    }
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b6 == true) {
      childclass[a].children[0].style.display = "none";
      b6 = true;
    }
  }
}
function movezebra(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[21].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[21].parentElement.classList[1].slice(
    2,
    pieces[21].parentElement.classList[1].length
  );
  for (t3 = 2; t3 < 198; t3++) {
    childclass[t3].children[0].style.display = "none";
  }
  for (s3 = 2; s3 < 198; s3++) {
    if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) &&
      childclass[s3].id[0] == pieces[21].parentElement.id[0]
    ) {
      childclass[s3].children[0].style.display = "none";
    } else if (
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) -
        Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) -
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) < Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) -
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) < Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) -
        Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) +
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) > Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) +
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) > Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
      alpha.indexOf(childclass[s3].id[0]) -
        alpha.indexOf(pieces[21].parentElement.id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
      alpha.indexOf(pieces[21].parentElement.id[0]) -
        alpha.indexOf(childclass[s3].id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else {
      childclass[s3].children[0].style.display = "none";
    }
    if (childclass[s3].id[0] == pieces[21].parentElement.id[0]) {
      childclass[s3].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      if (a < 3) {
        break;
      }
      a = a - 13;
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
    a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
    b5 = false;
    for (let rci = 0; rci < 13; rci++) {
      a = a - 15;
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 15;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "n" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false; //a=120
  for (let rci = 0; rci < 13; rci++) {
    a = a + 13;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (a >= 184 || childclass[a].id[1] + childclass[a].id[2] == "1") {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a++;
      } else {
        a = a - 13;
      }
      if (a < 2) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a = a - 14;
      } else {
        a = a - 15;
      }
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a < 184) {
    for (let rci = 0; rci < 13; rci++) {
      if (a > 198) {
        break;
      }
      if (rci == 1) {
        a = a + 14;
      } else {
        a = a + 15;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (a >= 184 || childclass[a].id[1] + childclass[a].id[2] == "1") {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a < 184) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a--;
      } else {
        a = a + 13;
      }
      if (a > 198) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "1"
      ) {
        break;
      }
    }
  }
}
function movepiece(cn, gg, last) {
  //cn هو ايتم المربع gg هو اي دي المربع المضغوط عليه
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      if (pi2 > 13) {
        //P A W N
        for (let f = 1; f < childclass.length; f++) {
          if (Number(childclass[f].children[0].id) == Number(gg)) {
            cc = childclass[f];
          }
        } //198
        for (let ff = -2; ff < childclass.length - 2; ff++) {
          if (ff == 197) {
            childclass[ff + 2] = last;
          }
          if (
            Number(
              childclass[ff + 2].classList[1].slice(
                2,
                childclass[ff + 2].classList[1].length
              )
            ) == Number(cn)
          ) {
            cc.appendChild(childclass[ff + 2].children[1]);
          }
          if (ff >= 0) {
            cirs[ff].style.display = "none";
          }
        }
      } else if (pi2 < 14) {
        //R O O K
        for (let f = 1; f < childclass.length; f++) {
          if (Number(childclass[f].children[0].id) == Number(gg)) {
            cc = childclass[f];
          }
        }
        for (let ff = 1; ff < childclass.length; ff++) {
          if (
            Number(
              childclass[ff].classList[1].slice(
                2,
                childclass[ff].classList[1].length
              )
            ) == Number(cn)
          ) {
            cc.appendChild(childclass[ff].children[1]);
            cc.children[1].classList[1] =
              "it" +
              String(
                Number(
                  cc.children[1].classList[1].slice(
                    2,
                    cc.children[1].classList[1].length
                  )
                ) - 28
              );
          }
          if (ff > 1) {
            cirs[ff - 2].style.display = "none";
          }
        }
      }
    }
  }
}
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
var childclass = [
  ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
  [
    14,
    '<img src="Brook.png" height="43px" width="43px">',
    "",
    '<img src="Bbishop.png" height="30px" width="31px">',
    '<img src="Bcrocodile.png" height="43px" width="43px">',
    "",
    '<img src="تصميم_بدون_عنوان__2_-removebg-preview.png" height="43px" width=""43px>',
    "",
    "",
    "",
    "",
    "imgZ",
    '<img src="Bbishop.png" height="30px" width="31px">',
    "",
    '<img src="Brook.png" height="43px" width="43px">',
  ],
  [
    13,
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
    '<img src="Bpawn.png" height="45px" width="42px">',
  ],
  [
    12,
    "",
    "",
    '<img src="Bknight.png" height="43px" width="43px">',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    '<img src="Bknight.png" height="43px" width="43px">',
    "",
    "",
  ],
  [11, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [10, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [9, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [8, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [7, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [6, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [5, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [4, "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  [
    3,
    "",
    "",
    '<img src="Wknight.png" height="43px" width="43px">',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    '<img src="Wknight.png" height="43px" width="43px">',
    "",
    "",
  ],
  [
    2,
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
  ],
  [
    1,
    '<div><img src="Wrook.png" height="43px" width="43px"></div>',
    "",
    '<div><img src="Wbishop.png" height="42px" width="37px"></div>',
    '<div><img src="Wcrocodile.png" height="43px" width="43px"></div>',
    "",
    '<img src="تصميم_بدون_عنوان__2_-removebg-preview.png" height="43px" width="43px">',
    "",
    "",
    "",
    "",
    "imgZ",
    '<div><img src="Wbishop.png" height="42px" width="37px"></div>',
    "",
    '<div><img src="Wrook.png" height="43px" width="43px"></div>',
  ],
];
let legalMove = [];
let board = document.getElementById("pp");
for (let i = 0; i < childclass.length; i++) {
  for (let j = 0; j < childclass.length; j++) {
    let square = document.createElement("div");
    square.innerHTML = childclass[i][j];
    board.appendChild(square);
    square.dataset.row = i;
    square.dataset.colmn = j;
    square.classList.add("square");
    if ((i + j) % 2 == 0) {
      square.style.backgroundColor = "wheat";
    } else {
      square.style.backgroundColor = "brown";
    }
    if (i == 13 && j > 0) {
      square.children[0].setAttribute(
        "onClick",
        'movepawn(this.parentElement.getAttribute("data-row"),this.parentElement.getAttribute("data-colmn"))'
      );
    }
  }
}
const Wpawns = document.getElementsByClassName("Wp");
//end
board.addEventListener("click", (e) => {
  console.log("a");
  let square = e.target.closest(".square");
  for (let legal = legalMove.length - 1; legal >= 0; legal--) {
    console.log(
      legalMove[legal][0] == square.getAttribute("data-row") &&
        legalMove[legal][1] == square.getAttribute("data-colmn")
    );
    if (
      legalMove[legal][0] == square.getAttribute("data-row") &&
      legalMove[legal][1] == square.getAttribute("data-colmn")
    ) {
      console.log(NPr + (legal - legalMove.length), NPc);
      console.log(NPr, NPc);
      if (
        square.getAttribute("data-row") ==
        Wpawns[NPc - 1].parentElement.getAttribute("data-row")
      ) {
        childclass[NPr + (legal - 2)][NPc] = Wpawns[NPc - 1];
        childclass[NPr][NPc] = "";
      } else {
        childclass[NPr + 1][NPc + 2 * legal - 1] = Wpawns[NPc - 1];
        childclass[NPr][NPc] = "";
      }
      square.appendChild(Wpawns[NPc - 1]);
      board.children[NPr * 15 + NPc].innerHTML = childclass[NPr][NPc];
      console.log(Wpawns);
      break;
    }
  }
});
var NPr = 0; //2
var NPc = 0;
function movepawn(pawnRow, pawncol) {
  legalMove = [];
  console.log(pawnRow, pawncol);
  NPr = Number(pawnRow);
  NPc = Number(pawncol);
  if (board.children[(NPr - 1) * 15 + NPc].innerHTML == "") {
    legalMove.splice(0, 0, [NPr - 1, NPc]);
  }
  if (
    board.children[(NPr - 2) * 15 + NPc].innerHTML == "" &&
    board.children[(NPr - 1) * 15 + NPc].innerHTML == ""
  ) {
    legalMove.splice(0, 0, [NPr - 2, NPc]);
  }
  if (board.children[(NPr - 1) * 15 + NPc + 1].innerHTML !== "") {
    legalMove.splice(0, 0, [NPr - 1, NPc - 1]);
  }
  if (board.children[(NPr - 1) * 15 + NPc - 1].innerHTML !== "") {
    legalMove.splice(0, 0, [NPr - 1, NPc + 1]);
  }
  console.log(legalMove);
}
function moverook(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 13].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 13].parentElement.classList[1].slice(
    2,
    pieces[mm + 13].parentElement.classList[1].length
  );
  for (t2 = 2; t2 < 198; t2++) {
    childclass[t2].children[0].style.display = "none";
  }
  for (s2 = 2; s2 < 198; s2++) {
    if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[mm + 13].parentElement.id.slice(
            1,
            pieces[mm + 13].parentElement.id.length
          )
        ) &&
      childclass[s2].id[0] == pieces[mm + 13].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "none";
    } else if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[mm + 13].parentElement.id.slice(
            1,
            pieces[mm + 13].parentElement.id.length
          )
        ) ||
      childclass[s2].id[0] == pieces[mm + 13].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "block";
    } else {
      childclass[s2].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b = false;
  for (let rci = 0; rci < 13; rci++) {
    if (a == 197) {
      break;
    }
    a++;
    if (childclass[a].children.length > 1 || b == true) {
      childclass[a].children[0].style.display = "none";
      b = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b2 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a - 14;
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b2 == true) {
      childclass[a].children[0].style.display = "none";
      b2 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b3 = false;
  for (let rci = 0; rci < 13; rci++) {
    a--;
    if (
      Number(
        childclass[a].classList[1].slice(2, childclass[a].classList[1].length)
      ) < 3
    ) {
      break;
    }
    if (childclass[a].children.length > 1 || b3 == true) {
      childclass[a].children[0].style.display = "none";
      b3 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 13].parentElement);
  let b4 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 14;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b4 == true) {
      childclass[a].children[0].style.display = "none";
      b4 = true;
    }
  }
}
function movebishop(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 15].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 15].parentElement.classList[1].slice(
    2,
    pieces[mm + 15].parentElement.classList[1].length
  );
  for (t3 = 2; t3 < 198; t3++) {
    childclass[t3].children[0].style.display = "none";
  }
  for (s3 = 2; s3 < 198; s3++) {
    if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) &&
      childclass[s3].id[0] == pieces[mm + 15].parentElement.id[0]
    ) {
      childclass[s3].children[0].style.display = "none";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) ==
      alpha.indexOf(childclass[s3].id[0]) -
        alpha.indexOf(pieces[mm + 15].parentElement.id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[mm + 15].parentElement.id.slice(
            1,
            pieces[mm + 15].parentElement.id.length
          )
        ) ==
      alpha.indexOf(pieces[mm + 15].parentElement.id[0]) -
        alpha.indexOf(childclass[s3].id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else {
      childclass[s3].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      if (a < 3) {
        break;
      }
      a = a - 13;
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      a = a - 15;
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 15;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "n" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[mm + 15].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 13;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "a" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
}
function moveknight(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[mm + 17].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[mm + 17].parentElement.classList[1].slice(
    2,
    pieces[mm + 17].parentElement.classList[1].length
  );
  for (t4 = 2; t4 < 198; t4++) {
    childclass[t4].children[0].style.display = "none";
  }
  for (s4 = 2; s4 < 198; s4++) {
    if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          2 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 1 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) + 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) -
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else if (
      Number(childclass[s4].id.slice(1, childclass[s4].id.length)) ==
        Number(
          pieces[mm + 17].parentElement.id.slice(
            1,
            pieces[mm + 17].parentElement.id.length
          )
        ) +
          1 &&
      alpha.indexOf(childclass[s4].id[0]) ==
        alpha.indexOf(pieces[mm + 17].parentElement.id[0]) - 2 &&
      childclass[s4].children.length == 1
    ) {
      childclass[s4].children[0].style.display = "block";
    } else {
      childclass[s4].children[0].style.display = "none";
    }
  }
}
function movecro(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[20].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[20].parentElement.classList[1].slice(
    2,
    pieces[20].parentElement.classList[1].length
  );
  for (t2 = 2; t2 < 198; t2++) {
    childclass[t2].children[0].style.display = "none";
  }
  for (s2 = 2; s2 < 198; s2++) {
    if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
        Number(
          pieces[20].parentElement.id.slice(
            1,
            pieces[20].parentElement.id.length
          )
        ) &&
      childclass[s2].id[0] == pieces[20].parentElement.id[0]
    ) {
      childclass[s2].children[0].style.display = "none";
    } else if (
      Number(childclass[s2].id.slice(1, childclass[s2].id.length)) ==
      Number(
        pieces[20].parentElement.id.slice(1, pieces[20].parentElement.id.length)
      )
    ) {
      childclass[s2].children[0].style.display = "block";
    } else if (
      alpha.indexOf(childclass[s2].id[0]) ==
        alpha.indexOf(pieces[20].parentElement.id[0]) + 1 ||
      alpha.indexOf(childclass[s2].id[0]) ==
        alpha.indexOf(pieces[20].parentElement.id[0]) - 1
    ) {
      childclass[s2].children[0].style.display = "block";
    } else {
      childclass[s2].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b = false;
  for (let rci = 0; rci < 13; rci++) {
    if (a == 197) {
      break;
    }
    a++;
    if (childclass[a].children.length > 1 || b == true) {
      childclass[a].children[0].style.display = "none";
      b = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b2 = false;
  for (let rci = 0; rci < 14; rci++) {
    if (rci == 0) {
      a++;
    } else {
      a = a - 14;
    }
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b2 == true) {
      childclass[a].children[0].style.display = "none";
      b2 = true;
    } else {
      childclass[a].children[0].style.display = "block";
    }
    console.log(
      childclass[a].children.length > 1 || b2 == true,
      childclass[a].children[0]
    );
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b3 = false;
  for (let rci = 0; rci < 14; rci++) {
    if (rci == 0) {
      a--;
    } else {
      a = a - 14;
    }
    if (a < 3) {
      break;
    }
    if (childclass[a].children.length > 1 || b3 == true) {
      childclass[a].children[0].style.display = "none";
      b3 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b4 = false;
  for (let rci = 0; rci < 13; rci++) {
    a--;
    if (
      Number(
        childclass[a].classList[1].slice(2, childclass[a].classList[1].length)
      ) < 3
    ) {
      break;
    }
    if (childclass[a].children.length > 1 || b4 == true) {
      childclass[a].children[0].style.display = "none";
      b4 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    if (rci == 0) {
      a--;
    } else {
      a = a + 14;
    }
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[20].parentElement);
  let b6 = false;
  for (let rci = 0; rci < 13; rci++) {
    if (rci == 0) {
      a++;
    } else {
      a = a + 14;
    }
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b6 == true) {
      childclass[a].children[0].style.display = "none";
      b6 = true;
    }
  }
}
function movezebra(mm, ...gf2) {
  for (let pi2 = 0; pi2 < pieces.length; pi2++) {
    if (pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)") {
      pieces[pi2].style.backgroundColor = "";
    }
  }
  pieces[21].style.backgroundColor = "rgb(195, 220, 85)";
  ppn = pieces[21].parentElement.classList[1].slice(
    2,
    pieces[21].parentElement.classList[1].length
  );
  for (t3 = 2; t3 < 198; t3++) {
    childclass[t3].children[0].style.display = "none";
  }
  for (s3 = 2; s3 < 198; s3++) {
    if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) &&
      childclass[s3].id[0] == pieces[21].parentElement.id[0]
    ) {
      childclass[s3].children[0].style.display = "none";
    } else if (
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) -
        Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) -
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) < Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) -
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) < Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) -
        Number(childclass[s3].id.slice(1, childclass[s3].id.length)) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) +
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) > Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
        alpha.indexOf(childclass[s3].id[0]) -
          alpha.indexOf(pieces[21].parentElement.id[0]) +
          1 &&
      Number(
        pieces[21].parentElement.id.slice(1, pieces[21].parentElement.id.length)
      ) > Number(childclass[s3].id.slice(1, childclass[s3].id.length))
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
      alpha.indexOf(childclass[s3].id[0]) -
        alpha.indexOf(pieces[21].parentElement.id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else if (
      Number(childclass[s3].id.slice(1, childclass[s3].id.length)) -
        Number(
          pieces[21].parentElement.id.slice(
            1,
            pieces[21].parentElement.id.length
          )
        ) ==
      alpha.indexOf(pieces[21].parentElement.id[0]) -
        alpha.indexOf(childclass[s3].id[0])
    ) {
      childclass[s3].children[0].style.display = "block";
    } else {
      childclass[s3].children[0].style.display = "none";
    }
    if (childclass[s3].id[0] == pieces[21].parentElement.id[0]) {
      childclass[s3].children[0].style.display = "none";
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 13; rci++) {
      if (a < 3) {
        break;
      }
      a = a - 13;
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
    a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
    b5 = false;
    for (let rci = 0; rci < 13; rci++) {
      a = a - 15;
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  for (let rci = 0; rci < 13; rci++) {
    a = a + 15;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (
      childclass[a].id[0] == "n" ||
      childclass[a].id[1] + childclass[a].id[2] == "1"
    ) {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false; //a=120
  for (let rci = 0; rci < 13; rci++) {
    a = a + 13;
    if (a > 198) {
      break;
    }
    if (childclass[a].children.length > 1 || b5 == true) {
      childclass[a].children[0].style.display = "none";
      b5 = true;
    }
    if (a >= 184 || childclass[a].id[1] + childclass[a].id[2] == "1") {
      break;
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a++;
      } else {
        a = a - 13;
      }
      if (a < 2) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "n" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a > 15) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a = a - 14;
      } else {
        a = a - 15;
      }
      if (a < 3) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "14"
      ) {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a < 184) {
    for (let rci = 0; rci < 13; rci++) {
      if (a > 198) {
        break;
      }
      if (rci == 1) {
        a = a + 14;
      } else {
        a = a + 15;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (a >= 184 || childclass[a].id[1] + childclass[a].id[2] == "1") {
        break;
      }
    }
  }
  a = Array.prototype.indexOf.call(childclass, pieces[21].parentElement);
  b5 = false;
  if (a < 184) {
    for (let rci = 0; rci < 14; rci++) {
      if (rci == 1) {
        a--;
      } else {
        a = a + 13;
      }
      if (a > 198) {
        break;
      }
      if (childclass[a].children.length > 1 || b5 == true) {
        childclass[a].children[0].style.display = "none";
        b5 = true;
      }
      if (
        childclass[a].id[0] == "a" ||
        childclass[a].id[1] + childclass[a].id[2] == "1"
      ) {
        break;
      }
    }
  }
}
function movepiece(pawnParentIndex, pawnNewSquare) {
  //cn هو ايتم المربع gg هو اي دي المربع المضغوط عليه
}
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
