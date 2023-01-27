import Board from "../types";

export default function moveMarble(
  boardState: Board,
  currentPieceLocation: number,
  aiRoll: number = 0
) {
  const playerId = boardState.playerTurn;

  // determine which roll to use depending on who is moving the marble
  let newPieceLocation;
  if (aiRoll === 0) {
    newPieceLocation = currentPieceLocation + boardState.roll;
  } else {
    newPieceLocation = currentPieceLocation + aiRoll;
  }

  const pieces: number[] = boardState.pieces;

  // remove the piece from the previous location
  pieces[currentPieceLocation] = 0;
  // move piece up to its new spot

  switch (pieces[newPieceLocation]) {
    // if the new location has no marble there
    case 0:
      pieces[newPieceLocation] = playerId;
      break;
    // if there is a marble there swap them
    default:
      const temp: number =
        pieces[newPieceLocation] === undefined ? 0 : pieces[newPieceLocation];
      pieces[newPieceLocation] = playerId;
      pieces[currentPieceLocation] = temp;
  }

  return pieces;
}
