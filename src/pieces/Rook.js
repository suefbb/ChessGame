import Piece from "../Piece.js";

export default class Rook extends Piece {
  constructor(color) {
    super(color, "R");
    this.directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
  }
  getMoves(row, col, board) {
    let moves = [...this.getRayMoves(row, col, this.directions, board)];
    return moves;
  }
}
