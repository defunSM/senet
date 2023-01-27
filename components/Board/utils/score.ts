import Board from "../types";
import game from "../../constants";

// gets the player that scored and if there is a winner
export default function trackScore(boardState: Board) {

  const playerWhoScored = boardState.pieces.slice(game.BOARD_LENGTH).reduce((acc, val) => acc + val , 0)

  // increases that player's score by 1
  const currScore = boardState.score;
  currScore[playerWhoScored - 1] += 1;

  // check for winner
  let winner;

  switch(game.WIN_CONDITION_SCORE) {
    case currScore[0]:
      winner = 1;
      break;
    case currScore[1]:
      winner = 2;
      break;
    default:
      winner = boardState.winner
  }

  return { playerWhoScored, currScore, winner }


}
