import Piece from "../Piece.js";

export default class Bishop extends Piece {
  constructor(color) {
    super(color, "B");
    this.directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
  }
  getMoves(row, col, board) {
    let moves = [...this.getRayMoves(row, col, this.directions, board)];
    return moves;
  }
}
