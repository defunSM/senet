import { useEffect, useState } from "react";
import BoardGrid from "../components/Board/Grid";

import Board from "../components/Board/types";
import moveMarbleForAi from "../components/Board/utils/aiMove";
import findValidMoves from "../components/Board/utils/findMove";
import checkMarbleOutOfBounds from "../components/Board/utils/marbleBoundary";
import getNextPlayerTurn from "../components/Board/utils/playerTurn";
import makeRoll from "../components/Board/utils/roll";
import trackScore from "../components/Board/utils/score";

import LinearProgressWithLabel from '../components/Board/Timer';
import Chat from '../components/Logos/Chat';
import ExitSenet from '../components/Logos/ExitSenet';
import InterfaceButton from '../components/StyledButton';
import game from "../components/constants";

function RollMessage({ boardState }: { boardState: Board }) {

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
      <button
        onClick={() => handleRollClick()}
      className="grid mt-5 text-black justify-self-center font-bold bg-[#AD8E70] m-auto pt-3 pb-3 pl-3 pr-3 rounded-lg shadow-black drop-shadow-lg hover:scale-110 transition-all hover:contrast-150 ring-1 ring-black hover:text-white "
      >
        <span className="">ROLL</span>
      </button>
  )
}
// GameState -> Player 1 Need to click Roll -> Player Select Piece -> Player Validation -> AI Move

// The entire 30 squares on the sennet board, 10 on each row
function Board() {
  const [boardState, setBoardState] = useState({
    pieces: game.PIECES,
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
      const pieces: number[] = boardState.pieces.slice(0, game.BOARD_LENGTH - 1);

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

const ExitIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
  )
}

const ChatIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

  )
}

const SettingsIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
</svg>

  )
}

const AudioIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
</svg>

  )
}

function boardgame() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex flex-col items-center justify-center"><InterfaceButton>Senet</InterfaceButton>
      <div className="">

      <ExitSenet>
        <div className=""><p className=""></p><ExitIcon></ExitIcon>
        </div>
      </ExitSenet>

      <Chat><ChatIcon></ChatIcon></Chat>
      <InterfaceButton><SettingsIcon></SettingsIcon></InterfaceButton>
      <InterfaceButton><AudioIcon></AudioIcon></InterfaceButton>
      <InterfaceButton><p className="text-lg hover:scale-105 m-0 p-0 hover:text-purple-700 font-bold animate-bounce">Roll</p></InterfaceButton>
      <InterfaceButton><p className="text-sm">1</p></InterfaceButton>
      {/* <BasicModal></BasicModal> */}


      </div>
      <div className="mt-5">
        <LinearProgressWithLabel></LinearProgressWithLabel>
      </div>
      <div className="bg-[url('/assets/whitenoise.png')] bg-cover rounded-lg ring-2 ring-black m-10 drop-shadow-xl shadow-white transition-all w-3/4">
        <Board></Board>
      </div>
    </div>
  );
}

export default boardgame;
