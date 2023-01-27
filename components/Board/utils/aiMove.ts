import Board from "../types";
import  findValidMoves  from "./findMove";
import  moveMarble  from "./playerMove";
import makeRoll from "./roll";
import game from "../../constants";

 // moves the marble for the ai
 export default function moveMarbleForAi(boardState: Board) {
  // get valid moves
  const validAiMoves: number[] = findValidMoves(boardState);

  // if no moves to do return undefined otherwise continues to select a marble
  if (validAiMoves.length === 0) {
    return undefined;
  }

  // select one of the valid moves
  const aiRandomSelectMarble: number = Math.floor(
    Math.random() * validAiMoves.length
  );
  const aiChosenMarble = validAiMoves[aiRandomSelectMarble];

  // normal move marble similar to player
  const newPieces: number[] = moveMarble(
    boardState,
    aiChosenMarble,
    makeRoll(game.MAX_ROLL)
  );

  return newPieces;
}
