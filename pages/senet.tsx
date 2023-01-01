import {v4 as uuidv4} from 'uuid'
import { useState, useEffect } from 'react'
import {faker} from '@faker-js/faker'

const PIECES = [1,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const MAX = 4 // max number of jumps: 1,4,5 will result in rolling again



interface Board {
  pieces: number[]
  selectedPiece: number
  playerTurn: number 
  roll: number
  phase: string
  validMoves: number[]
  score: number[]
}

// checks if the piece selected can be moved there aka not being blocked
function checkValidMove(boardState: Board, selectedPieceLocation: number) {
  const playerTurn = boardState.playerTurn
  const newPieceLocation = selectedPieceLocation + boardState.roll
  const pieces = boardState.pieces
  
  // check to see if player is not trying to move someone else's piece
  if (playerTurn != pieces[selectedPieceLocation]) { return false }
  
  switch(pieces[newPieceLocation]) {
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

// BUG: the initial validMoves are always [2,4,6,8] for some reason
function findValidMoves(boardState: Board) {
  const validMoves = boardState.pieces.map((piece, index) => {
    if(checkValidMove(boardState, index)){
      return index
    } else {
      return false
    }
  })

  return validMoves.filter(Boolean)

}

function moveMarble(boardState: Board, currentPieceLocation: number) {
  const playerId = boardState.playerTurn
  const newPieceLocation = currentPieceLocation + boardState.roll
  const pieces = boardState.pieces

  // remove the piece from the previous location
  pieces[currentPieceLocation] = 0;
  // move piece up to its new spot

  switch(pieces[newPieceLocation]) {
    // if the new location has no marble there
    case 0:
      pieces[newPieceLocation] = playerId;
      break;
    // if there is a marble there swap them
    default:
      const temp = pieces[newPieceLocation]
      pieces[newPieceLocation] = playerId;
      pieces[currentPieceLocation] = temp;
      
  }
    
  return pieces
}

// determines how many spaces the piece is going to move
function roll(max: number = 4) {

  const randomInteger: number = Math.floor(Math.random() * max)
  if (randomInteger === 0){ return 5 }
  
  return randomInteger
}


function createBoardGrid(boardState: any, setBoardState: any){
  
// ------------------ Game Logic ---------------------------------------

  // core logic for updating the board state
  function updateGameState(selectedPiece: number) {
    const phase = boardState.phase
    switch(phase){
      case "selection":
        const nextPlayerTurn = boardState.playerTurn === 1 ? 2 : 1
        const newPieces = moveMarble(boardState, selectedPiece)
        setBoardState({...boardState, selectedPiece: selectedPiece, playerTurn: nextPlayerTurn, pieces: newPieces, phase: "roll"})
        break;

    }
  }

  function handleSquareSelection(selectedPiece: number) {
    // if a valid move can be made with selected piece: piece is moved otherwise nothing happens
    switch(checkValidMove(boardState, selectedPiece)) {
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
    const greenMarble = <span className="rounded-full bg-[url('/green_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150"></span>
    const redMarble = <span className="rounded-full bg-[url('/red_marble.png')] inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150"></span>

    
    // display the image for the marble
    let displayMarble;
    switch(boardState.pieces[props.index]){
      case 1:
        displayMarble = greenMarble
        break;
      case 2:
        displayMarble = redMarble
        break;
      default:
        displayMarble = <div className="p-5"></div>
    }

    // const marbles = boardState.pieces[props.index] === 1 ? greenMarble : redMarble

    const bgColor = props.index % 2 === 0 ? "bg-[url('/blacktexture.jpg')]" : "bg-[#FF6E31]"
    return <button onClick={props.onClick} className={"m-1 py-4 text-black text-center drop-shadow-sm rounded-lg max-w-xs transition-all font-bold " + bgColor}>{/* {boardState.pieces[props.index]} */} {displayMarble}</button>
  }

  // setup the senet board
  const boardPositions = Array.from(Array(30).keys())
  const boardGrid = boardPositions.map((_element, index) => {

    const uniqueId = uuidv4()
    return <Square key={uniqueId} index={index} onClick={()=>handleSquareSelection(index)}></Square>

  })
  
  // create the three rows, reverse the second one to match the indexing with the path
  const firstRow = <div className="grid grid-cols-10">{boardGrid.slice(0,10)}</div>
  const secondRow = <div className="grid grid-cols-10">{boardGrid.slice(10,20).reverse()}</div>
  const thirdRow = <div className="grid grid-cols-10">{boardGrid.slice(20,30)}</div>
  

  return { firstRow, secondRow, thirdRow }
}

// The entire 30 squares on the sennet board, 10 on each row
function Board(props: any) {

  const [boardState, setBoardState] = useState({pieces: PIECES, selectedPiece: 0, playerTurn: 1, roll: -1, phase: "roll", validMoves: []})

  useEffect(()=>{
    console.log(boardState)
  }, [boardState])

  const { firstRow, secondRow, thirdRow } = createBoardGrid(boardState, setBoardState)
  
  function handleButtonClick() {
    if(boardState.phase==='roll'){
      setBoardState({...boardState, roll: roll(MAX), phase: "selection", validMoves: findValidMoves(boardState)})
    }
  }

  return (
  <div className="bg-[url('/whitenoise.png')] bg-cover m-10 rounded-lg">
      <div className="">{firstRow}</div>
      <div className="">{secondRow}</div>
      <div className="">{thirdRow}</div>

      <button onClick={()=>handleButtonClick()}  className="grid mt-5 text-black justify-self-center font-bold bg-[#AD8E70] m-auto p-5 rounded-lg shadow-black drop-shadow-lg hover:scale-110 transition-all hover:contrast-150">ROLL</button>
      {boardState.phase==='selection' ? <>

      <div className="text-black font-bold ml-5">Player {boardState.playerTurn}:</div>
        <div className="text-black justify-self-center font-semibold ml-8">You rolled a {boardState.roll} </div><div className="text-black font-semibold ml-8">Select a piece to move</div></> : <></>}
  </div>
  )
}

function game (props: any) {
  return (<div className="grid bg-[#243763] h-screen">
    
    <div className="bg-[#FFEBB7] m-auto justify-self-center rounded-lg text-4xl text-black mt-10 p-5 drop-shadow-md shadow-black transition-all hover:scale-110 "><span>Senet</span></div> 
    <div className=" grid bg-[url('/whitenoise.png')] bg-cover rounded-lg m-10 drop-shadow-xl shadow-white transition-all"><Board></Board>
    </div>

    <div className="m-auto py-100">Dolor fuga dignissimos. Asperiores maxime numquam consectetur ex quae. Iste odio rem minima expedita voluptas. Dolorum nemo nihil iure adipisci dolores.</div>
  </div>)
}

export default game;
