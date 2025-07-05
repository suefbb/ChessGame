import Chess from "./src/Chess.js";
let uiBoard = document.querySelector(".chess-board");
let chess = new Chess(uiBoard, "w");
chess.play();
