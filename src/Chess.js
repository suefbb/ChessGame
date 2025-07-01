export const BOARD_DIM = 14;

export const COLORS = {
  WHITE: "w",
  BLACK: "b",
};

export default class Chess {
  constructor(uiBoard, currentTurn) {
    this.uiBoard = uiBoard;
    this.selectedPiece = null;
    this.legalMoves = [];
    this.currentTurn = this.currentTurn ? this.currentTurn : COLORS.WHITE;
  }

  play() {}
}
