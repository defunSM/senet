import { MouseEventHandler, MutableRefObject, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import checkValidMove from "./utils/validateMove";
import  getNextPlayerTurn  from "./utils/playerTurn";
import  moveMarble  from "./utils/playerMove";

import Marble from './Marble';
import Board from './types'
import game from "../constants";

export default function BoardGrid({boardState, setBoardState}: {boardState: Board, setBoardState: any}) {
    // ------------------ Game Logic ---------------------------------------
    const boardBoundary: MutableRefObject<null> = useRef(null)

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
    function Square({marbleId, onClick}: {marbleId: number, onClick: MouseEventHandler}) {

      // pieces and squares of the board
      const greenMarble = <Marble boundaryRef={boardBoundary} color="green"></Marble>
      const redMarble = <Marble boundaryRef={boardBoundary} color="red"></Marble>

      const blackSquare = "bg-[url('/assets/blacktexture.jpg')]";
      const whiteSquare = "bg-[url('/assets/marbletexture.png')]";

      // display the image for the marble
      let displayMarble;

      switch (boardState.pieces[marbleId]) {
        case 1:
          displayMarble = greenMarble;
          break;
        case 2:
          displayMarble = redMarble;
          break;
        default:
          displayMarble = <div className="p-6"></div>;
      }

      // sets the color of the grid for the board
      const squareBackgroundColor =
        marbleId % 2 === 0
          ? blackSquare
          : whiteSquare
      return (
        <button
          onClick={onClick}
          className={
            "m-1 py-4 text-black text-center drop-shadow-sm max-w-xs transition-all font-bold ring-1 ring-black rounded-sm " +
            squareBackgroundColor +
            " square" +
            marbleId
          }
        >
          {/* {boardState.pieces[props.index]} */} {displayMarble}
        </button>
      );
    }

    // setup the senet board
    const boardPositions = Array.from(Array(30).keys());
    const boardGrid = boardPositions.map((_element, marbleId) => {
      const uniqueId = uuidv4();
      return (
        <Square
          key={uniqueId}
          marbleId={marbleId}
          onClick={() => handleSquareSelection(marbleId)}
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
      <div ref={boardBoundary}>
        <div className="">{firstRow}</div>
        <div className="">{secondRow}</div>
        <div className="">{thirdRow}</div>
      </div>
    )
  }
