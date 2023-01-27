import game from "../../constants";

// determines how many spaces the piece is going to move
export default function makeRoll(max: number = 4) {
    const newRoll: number = Math.floor(Math.random() * max);
    if (newRoll === 0) {
      return game.DEFAULT_ROLL;
    } else {
      return newRoll;
    }
}
