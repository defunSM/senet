import Board from "../types";

export default function checkValidMove(boardState: Board, selectedPieceLocation: number) {
  const playerTurn = boardState.playerTurn;
  const newPieceLocation = selectedPieceLocation + boardState.roll;
  const pieces = boardState.pieces;

  // check to see if player is not trying to move someone else's piece
  if (playerTurn != pieces[selectedPieceLocation]) {
    return false;
  }

  switch (pieces[newPieceLocation]) {
    // when there is nothing on the square
    case 0:
      return true;
    // your own piece is on the square you are trying to move to
    case playerTurn:
      return false;

    default:
      return true;
  }
}
