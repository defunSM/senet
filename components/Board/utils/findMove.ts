import  checkValidMove  from "./validateMove";
import Board from "../types";

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

export default function findValidMoves(boardState: Board) {
  const validMoves: number[] = boardState.pieces
    .map((_piece, index) => {
      if (checkValidMove(boardState, index)) {
        return index;
      } else {
        return undefined;
      }
    })
    .filter(isDefined);

  return validMoves;
}
