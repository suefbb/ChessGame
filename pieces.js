import { isValidSquare } from "./utils.js";
export function getSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  // i made the z let becuase dr and dc are the fake directions
  let z = -1;
  for (const [dr, dc] of directions) {
    z++;
    for (let i = 1; ; i++) {
      //when you move a crocodile make the directions let = crocodile direction
      if (board[row][col][1] == "C") {
        directions = [
          [0, 1],
          [(i - 1) / i, 1 / i],
          [(i - 1) / i, -1 / i],
          [0, -1],
          [(-i + 1) / i, -1 / i],
          [(-i + 1) / i, 1 / i],
        ];
      }
      //when you move an octopus make the directions let = octopus direction
      if (board[row][col][1] == "O") {
        if (i == 3) {
          break;
        }
        directions = [
          [-0.5 * (i + 1), -1 / i],
          [-0.5 * (i + 1), 1 / i],
          [0.5 * (i + 1), -1 / i],
          [0.5 * (i + 1), 1 / i],
          [-1 / i, -0.5 * (i + 1)],
          [1 / i, -0.5 * (i + 1)],
          [-1 / i, 0.5 * (i + 1)],
          [1 / i, 0.5 * (i + 1)],
        ];
      }
      // i represents distance from current piece.
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;

      // If we're getting out of the board's boundaries then stop.
      if (!isValidSquare(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      // If it's an empty square then add it to the available moves and continue looping.
      if (targetPiece == null) {
        moves.push([newRow, newCol]);
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
export function getKingMoves(row, col, board) {
  return getJumpingMoves(
    row,
    col,
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ],
    board,
  );
}
export function getJumpingMoves(row, col, directions, board) {
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
export function getZSlideMoves(row, col, directions, board) {
  const pieceColor = board[row][col][0];
  const moves = [];
  let z = -1;
  for (const [dr, dc] of directions) {
    for (let i = 1; ; i++) {
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
      if (i >= 2 && board[row][col][1] == "Z") {
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
export function getSSlideMoves(row, col, directions, board) {
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
      const newRow = row + directions[z][0] * i;
      const newCol = col + directions[z][1] * i;
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
export function getRookMoves(row, col, board) {
  let directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}
export function getBishopMoves(row, col, board) {
  let directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  let moves = [...getSlideMoves(row, col, directions, board)];
  return moves;
}
export function getKnightMoves(row, col, board) {
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
export function getFrogMoves(row, col, board) {
  const directions = [
    [4, -2],
    [4, -3],
    [5, -2],
    [5, -3],
    [-2, 4],
    [-3, 4],
    [-2, 5],
    [-3, 5],
    [-4, -2],
    [-4, -3],
    [-5, -2],
    [-5, -3],
    [-2, -4],
    [-3, -4],
    [-2, -5],
    [-3, -5],
    [-4, 2],
    [-4, 3],
    [-5, 2],
    [-5, 3],
    [2, -4],
    [3, -4],
    [2, -5],
    [3, -5],
    [4, 2],
    [4, 3],
    [5, 2],
    [5, 3],
    [2, 4],
    [3, 4],
    [2, 5],
    [3, 5],
  ];
  return getJumpingMoves(row, col, directions, board);
}
export function getZebraMoves(row, col, board) {
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
export function getSnakeMoves(row, col, board) {
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
export function getElephantMoves(row, col, board) {
  return [...getRookMoves(row, col, board), ...getKnightMoves(row, col, board)];
}
export function getQueenMoves(row, col, board) {
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
export function getCrocodileMoves(row, col, board) {
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
export function getWallMoves(row, col, board) {
  let moves = [];
  const directions = [
    [0, 2],
    [-1, 2],
    [-2, 2],
    [1, 2],
    [2, 2],
    [0, -3],
    [-1, -3],
    [-2, -3],
    [1, -3],
    [2, -3],
  ];
  if (board[row][col][0] == "w") {
    directions.push(
      [-3, -3],
      [-3, -2],
      [-3, -1],
      [-3, 0],
      [-3, 1],
      [-3, 2],
      [2, -2],
      [2, -1],
      [2, 0],
      [2, 1],
    );
  } else {
    directions.push(
      [3, -3],
      [3, -2],
      [3, -1],
      [3, 0],
      [3, 1],
      [3, 2],
      [-2, -2],
      [-2, -1],
      [-2, 0],
      [-2, 1],
    );
  }
  return [...getJumpingMoves(row, col, directions, board)];
}
export function getPigeonMoves(row, col, board) {
  return [
    ...getBishopMoves(row, col, board),
    ...getKnightMoves(row, col, board),
  ];
}
export function getOctopusMoves(row, col, board) {
  let moves = [];
  //i wrote any directions becuase i can't put the real dircetions here becuase i is not defiend
  let directions = [
    [0, 1],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [-1, -1],
    [-1, 1],
  ];
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
export function getPawnMoves(row, col, board) {
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
  return [...moves, ...getPawnCaptures(row, col, board)];
}

function getPawnCaptures(row, col, board) {
  let moves = [];
  const pieceColor = board[row][col][0];
  const direction = pieceColor == "w" ? -1 : 1;
  const enPassantRow = pieceColor == "w" ? 9 : 6;
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

export function getCaptures(row, col, board) {
  let moves = [];
  let selectedPiece = board[row][col];
  switch (selectedPiece[1]) {
    case "R":
      moves = [...getRookMoves(row, col, board)];
      break;
    case "B":
      moves = [...getBishopMoves(row, col, board)];
      break;
    case "N":
      moves = [...getKnightMoves(row, col, board)];
      break;
    case "Z":
      moves = [...getZebraMoves(row, col, board)];
      break;
    case "p":
      moves = [...getPawnCaptures(row, col, board)];
      break;
    case "S":
      moves = [...getSnakeMoves(row, col, board)];
      break;
    case "Q":
      moves = [...getQueenMoves(row, col, board)];
      break;
    case "C":
      moves = [...getCrocodileMoves(row, col, board)];
      break;
    case "E":
      moves = [...getElephantMoves(row, col, board)];
      break;
    case "W":
      moves = [...getWallMoves(row, col, board)];
      break;
    case "P":
      moves = [...getPigeonMoves(row, col, board)];
      break;
    case "O":
      moves = [...getOctopusMoves(row, col, board)];
      break;
    case "F":
      moves = [...getFrogMoves(row, col, board)];
      break;
    case "K":
      moves = [...getKingMoves(row, col, board)];
      break;
    default:
      console.log("Not programmed yet.");
      break;
  }
  return moves;
}

export function getMoves(row, col, board) {
  let moves = getCaptures(row, col, board);
  if (board[row][col][1] == "p") moves.push(...getPawnMoves(row, col, board));
  return moves;
}