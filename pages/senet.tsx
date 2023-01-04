import { useEffect, useState } from "react";
import BoardGrid from "./components/BoardGrid"
import { Board, makeRoll, findValidMoves, moveMarbleForAi, getNextPlayerTurn, trackScore, checkMarbleOutOfBounds } from "./components/BoardLogic"
import { PIECES, BOARD_LENGTH } from './components/constants'

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
        roll: makeRoll(),
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
    const playerTurn: number = boardState.playerTurn

    // move marble based on who the player is
    switch(playerTurn) {
      // player
      case 1:
        setBoardState({ ...boardState, validMoves: validMoves})
        break;
      case 2: // ai
        const pieces: number[] | undefined = moveMarbleForAi(boardState);

        if (pieces) {
          setBoardState({ ...boardState, pieces: pieces, playerTurn: 1 });
        } else {
          setBoardState({
            ...boardState,
            playerTurn: getNextPlayerTurn(boardState),
          });
        }
    }

    console.log(boardState)
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
        playerTurn: 1
      });
    }

    console.log(boardState);
  }, [boardState]);

  return (
    <div className="bg-[url('/assets/whitenoise.png')] bg-cover m-10 rounded-lg">
      <div className="">
      <BoardGrid boardState={boardState} setBoardState={setBoardState}></BoardGrid>
      <RollButton boardState={boardState} setBoardState={setBoardState}></RollButton>
      <RollMessage boardState={boardState} />
      </div>
    </div>
  );
}

function game() {
  return (
    <div className="grid bg-[#243763] h-screen justify-items-center">
      <div className="bg-[#FFEBB7] m-auto rounded-lg text-4xl text-black mt-10 p-5 drop-shadow-md shadow-black transition-all hover:scale-110 ">
        <span>Senet</span>
      </div>
      <div className="bg-[url('/assets/whitenoise.png')] bg-cover rounded-lg ring-2 ring-black m-10 drop-shadow-xl shadow-white transition-all w-3/4">
        <Board></Board>
      </div>
    </div>
  );
}

export default game;
