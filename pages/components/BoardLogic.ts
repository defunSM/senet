import { DEFAULT_ROLL, MAX_ROLL, BOARD_LENGTH, WIN_CONDITION_SCORE } from "./constants";

export interface Board {
    pieces: number[];
    selectedPiece: number;
    playerTurn: number;
    roll: number;
    phase: string;
    validMoves: number[];
    score: number[];
    winner: number;
  }

export function checkValidMove(boardState: Board, selectedPieceLocation: number) {
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

function isDefined<T>(argument: T | undefined): argument is T {
    return argument !== undefined;
}

export function findValidMoves(boardState: Board) {
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

export function moveMarble(
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

  // determines how many spaces the piece is going to move
export function makeRoll(max: number = 4) {
    const newRoll: number = Math.floor(Math.random() * max);
    if (newRoll === 0) {
      return DEFAULT_ROLL;
    } else {
      return newRoll;
    }
  }

  // moves the marble for the ai
export function moveMarbleForAi(boardState: Board) {
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
      makeRoll(MAX_ROLL)
    );

    return newPieces;
  }

  // get the next player
export function getNextPlayerTurn(boardState: Board) {
    return boardState.playerTurn === 1 ? 2 : 1;
  }

  // gets the player that scored and if there is a winner
export function trackScore(boardState: Board) {

    const playerWhoScored = boardState.pieces.slice(BOARD_LENGTH).reduce((acc, val) => acc + val , 0)

    // increases that player's score by 1
    const currScore = boardState.score;
    currScore[playerWhoScored - 1] += 1;

    // check for winner
    let winner;

    switch(WIN_CONDITION_SCORE) {
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

  // checks if a marble has made it off the board
export function checkMarbleOutOfBounds(pieces: number[]) {
    if (pieces.length > BOARD_LENGTH) {
      return true;
    } else {
      return false;
    }
  }