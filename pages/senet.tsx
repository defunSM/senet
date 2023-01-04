import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const PIECES = [
  1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
]; // 1 and 2 represents each players respective marbles
const MAX_ROLL = 4; // max number of jumps: 1,4,5 will result in rolling again
const DEFAULT_ROLL = 5; // when 0 is rolled which means all pieces are face down which means piece can move 5 squares
const WIN_CONDITION_SCORE = 5; // score needed to win game
const BOARD_LENGTH = 30; // number of grids on the board

interface Board {
  pieces: number[];
  selectedPiece: number;
  playerTurn: number;
  roll: number;
  phase: string;
  validMoves: number[];
  score: number[];
  winner: number;
}

// checks if the piece selected can be moved there aka not being blocked
function checkValidMove(boardState: Board, selectedPieceLocation: number) {
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

function findValidMoves(boardState: Board) {
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

function moveMarble(
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
function roll(max: number = 4) {
  const newRoll: number = Math.floor(Math.random() * max);
  if (newRoll === 0) {
    return DEFAULT_ROLL;
  } else {
    return newRoll;
  }
}

// moves the marble for the ai
function moveMarbleForAi(boardState: Board) {
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
    roll(MAX_ROLL)
  );

  return newPieces;
}

// get the next player
function getNextPlayerTurn(boardState: Board) {
  return boardState.playerTurn === 1 ? 2 : 1;
}

// gets the player that scored and if there is a winner
function trackScore(boardState: Board) {

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

function BoardGrid({boardState, setBoardState}: {boardState: Board, setBoardState: any}) {
  // ------------------ Game Logic ---------------------------------------

  // core logic for updating the board state
  function updateGameState(selectedPiece: number) {
    const phase = boardState.phase;
    switch (phase) {
      case "selection":

        const nextPlayerTurn: number = getNextPlayerTurn(boardState);
        const newPieces: number[] = moveMarble(boardState, selectedPiece);

        setBoardState({
          ...boardState,
          selectedPiece: selectedPiece,
          playerTurn: nextPlayerTurn,
          pieces: newPieces,
          phase: "roll",
        });
        break;
    }
  }

  function handleSquareSelection(selectedPiece: number) {
    // if a valid move can be made with selected piece: piece is moved otherwise nothing happens
    switch (checkValidMove(boardState, selectedPiece)) {
      case true:
        updateGameState(selectedPiece);
        break;
      case false:
        break;
    }
  }

  // ------------------------ styling for components + creating the square grids ----------------

  // Each square grid on the senet board
  function Square(props: any) {
    const greenMarble = (
      <span className="rounded-full bg-[url('/assets/green_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150"></span>
    );
    const redMarble = (
      <span className="rounded-full bg-[url('/assets/red_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150"></span>
    );

    // display the image for the marble
    let displayMarble;
    switch (boardState.pieces[props.index]) {
      case 1:
        displayMarble = greenMarble;
        break;
      case 2:
        displayMarble = redMarble;
        break;
      default:
        displayMarble = <div className="p-5"></div>;
    }

    // const marbles = boardState.pieces[props.index] === 1 ? greenMarble : redMarble

    const bgColor =
      props.index % 2 === 0
        ? "bg-[url('/assets/blacktexture.jpg')]"
        : "bg-[#FF6E31]";
    return (
      <button
        onClick={props.onClick}
        className={
          "m-1 py-4 text-black text-center drop-shadow-sm rounded-lg max-w-xs transition-all font-bold " +
          bgColor +
          " square" +
          props.index
        }
      >
        {/* {boardState.pieces[props.index]} */} {displayMarble}
      </button>
    );
  }

  // setup the senet board
  const boardPositions = Array.from(Array(30).keys());
  const boardGrid = boardPositions.map((_element, index) => {
    const uniqueId = uuidv4();
    return (
      <Square
        key={uniqueId}
        index={index}
        onClick={() => handleSquareSelection(index)}
      ></Square>
    );
  });

  // create the three rows, reverse the second one to match the indexing with the path
  const firstRow = (
    <div className="grid grid-cols-10">{boardGrid.slice(0, 10)}</div>
  );
  const secondRow = (
    <div className="grid grid-cols-10">{boardGrid.slice(10, 20).reverse()}</div>
  );
  const thirdRow = (
    <div className="grid grid-cols-10">{boardGrid.slice(20, 30)}</div>
  );

  return (
    <>
      <div className="">{firstRow}</div>
      <div className="">{secondRow}</div>
      <div className="">{thirdRow}</div>
    </>
  )
}

// checks if a marble has made it off the board
function checkMarbleOutOfBounds(pieces: number[]) {
  if (pieces.length > BOARD_LENGTH) {
    return true;
  } else {
    return false;
  }
}

function RollMessage({ boardState }: { boardState: Board}) {

  const visibility = boardState.phase === "selection" ? true : false
  const playerTurn = boardState.playerTurn
  const roll = boardState.roll

  return (
    <>
      <div className={visibility ? "visible" : "invisible"}>
          <div className="text-black font-bold ml-5">
            Player {playerTurn}:
          </div>
          <div className="text-black justify-self-center font-semibold ml-8">
            You rolled a {roll}{" "}
          </div>
          <div className="text-black font-semibold ml-8">
            Select a piece to move
          </div>
      </div>
    </>
  )

}

function RollButton ({boardState, setBoardState}: {boardState: Board, setBoardState: any}) {

  function handleRollClick() {
    if (boardState.phase === "roll") {
      setBoardState({
        ...boardState,
        roll: roll(MAX_ROLL),
        phase: "selection",
      });
    }
  }

  return (
    <>
      <button
        onClick={() => handleRollClick()}
        className="grid mt-5 text-black justify-self-center font-bold bg-[#AD8E70] m-auto p-5 rounded-lg shadow-black drop-shadow-lg hover:scale-110 transition-all hover:contrast-150"
      >
        ROLL
      </button></>
  )
}
// GameState -> Player 1 Need to click Roll -> Player Select Piece -> Player Validation -> AI Move

// The entire 30 squares on the sennet board, 10 on each row
function Board() {
  const [boardState, setBoardState] = useState({
    pieces: PIECES,
    selectedPiece: 0,
    playerTurn: 1,
    roll: -1,
    phase: "roll",
    validMoves: [1],
    score: [0, 0],
    winner: -1,
  });

  // handles changes to state when rolling
  useEffect(() => {
    const validMoves: number[] = findValidMoves(boardState);

    if (boardState.playerTurn === 2) {
      const pieces: number[] | undefined = moveMarbleForAi(boardState);
      console.log(pieces);
      if (pieces) {
        setBoardState({ ...boardState, pieces: pieces, playerTurn: 1 });
      } else {
        setBoardState({
          ...boardState,
          playerTurn: getNextPlayerTurn(boardState),
        });
      }
    } else {
      setBoardState({ ...boardState, validMoves: validMoves });
    }
  }, [boardState.playerTurn]);

  // checks scoring and if there is a winner
  useEffect(() => {
    if (checkMarbleOutOfBounds(boardState.pieces)) {
      // player who manages to get a piece off the board
      const { playerWhoScored, currScore, winner } = trackScore(boardState);
      console.log("Player " + playerWhoScored + " scored");


      // remove undefined spots on the grid after a piece has moved off the board
      const pieces: number[] = boardState.pieces.slice(0, BOARD_LENGTH - 1);

      // resets the board removing the piece that is out of the board from the pieces array and updates score
      setBoardState({
        ...boardState,
        pieces: pieces,
        score: currScore,
        winner: winner,
      });
    }
    console.log(boardState);
  }, [boardState]);

  return (
    <div className="bg-[url('/whitenoise.png')] bg-cover m-10 rounded-lg">
      <BoardGrid boardState={boardState} setBoardState={setBoardState}></BoardGrid>
      <RollButton boardState={boardState} setBoardState={setBoardState}></RollButton>
      <RollMessage boardState={boardState} />
    </div>
  );
}

function game() {
  return (
    <div className="grid bg-[#243763] h-screen">
      <div className="bg-[#FFEBB7] m-auto justify-self-center rounded-lg text-4xl text-black mt-10 p-5 drop-shadow-md shadow-black transition-all hover:scale-110 ">
        <span>Senet</span>
      </div>
      <div className=" grid bg-[url('/assets/whitenoise.png')] bg-cover rounded-lg m-10 drop-shadow-xl shadow-white transition-all">
        <Board></Board>
      </div>

      <div className="m-auto py-100">
        Dolor fuga dignissimos. Asperiores maxime numquam consectetur ex quae.
        Iste odio rem minima expedita voluptas. Dolorum nemo nihil iure adipisci
        dolores.
      </div>
    </div>
  );
}

export default game;
