import Board from "../types";

export default function getNextPlayerTurn(boardState: Board) {
  return boardState.playerTurn === 1 ? 2 : 1;
}
