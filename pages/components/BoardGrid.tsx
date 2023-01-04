import { v4 as uuidv4 } from "uuid";
import { getNextPlayerTurn, moveMarble, checkValidMove } from "./BoardLogic"
import { Board } from "./BoardLogic"

export default function BoardGrid({boardState, setBoardState}: {boardState: Board, setBoardState: any}) {
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
        <span className="rounded-full bg-[url('/assets/green_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150 ring-1 ring-black hover:rotate-45"></span>
      );
      const redMarble = (
        <span className="rounded-full bg-[url('/assets/red_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150 ring-1 ring-black hover:rotate-45"></span>
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
          displayMarble = <div className="p-6"></div>;
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
            "m-1 py-4 text-black text-center drop-shadow-sm max-w-xs transition-all font-bold ring-1 ring-black " +
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