import game from "../../constants";

// checks if a marble has made it off the board
export default function checkMarbleOutOfBounds(pieces: number[]) {
  if (pieces.length > game.BOARD_LENGTH) {
    return true;
  } else {
    return false;
  }
}
