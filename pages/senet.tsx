import {v4 as uuidv4} from 'uuid'
import { useState, useEffect } from 'react'
import {faker} from '@faker-js/faker'

const PIECES = [1,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const MAX = 4 // max number of jumps: 1,4,5 will result in rolling again

// Each square grid on the sennet board
function Square(props: any) {
  const bgColor = props.index % 2 === 0 ? "bg-[#AD8E70]" : "bg-[#FF6E31]"
  return <button onClick={props.onClick} className={"m-1 py-4 text-black text-center drop-shadow-sm rounded-lg max-w-xs transition-all hover:scale-110 font-bold " + bgColor}>{props.pieces[props.index]}</button>
}

// checks if the move is valid
function checkValidMove(playerId: number, newPieceLocation: number, pieces: any) {
  if (pieces[newPieceLocation]===0){ return true }
  if (pieces[newPieceLocation]!=playerId && pieces[newPieceLocation+1]!=playerId){
    return false
  }
  return true
}

function movePiece(playerId: number, pieceId: number, jumps: number, pieces: any) {
  const newPieceLocation = pieceId + jumps
  if (checkValidMove(playerId, newPieceLocation, pieces)){
    if (pieces[newPieceLocation]!=0 && pieces[newPieceLocation]!=playerId) 
    { 
      pieces[pieceId] = pieces[newPieceLocation] 
      return pieces
    } 
    else 
    { 
      pieces[pieceId] = 0; 
    }

    pieces[newPieceLocation] = playerId
    // console.log(pieces)
    return pieces
  }
}

// determines how many spaces the piece is going to move
function roll(max: number) {

  const randomInteger: number = Math.floor(Math.random() * max)
  if (randomInteger === 0){ return 5 }
  
  return randomInteger
}

interface Board {
  pieces: number[]
  selectedPiece: number
  playerTurn: number 
  roll: number
  waitingForSelection: boolean
}

function createBoardGrid(boardState: any, setBoardState: any){

  function handleSquareSelection(index: number) {
    setBoardState({...boardState, selectedPiece: index})

  }

  // setup the senet board
  const boardPositions = Array.from(Array(30).keys())
  const boardGrid = boardPositions.map((_element, index) => {

    const uniqueId = uuidv4()
    return <Square key={uniqueId} index={index} pieces={boardState.pieces} onClick={()=>handleSquareSelection(index)}></Square>

  })
  
  // create the three rows, reverse the second one to match the indexing with the path
  const firstRow = <div className="grid grid-cols-10">{boardGrid.slice(0,10)}</div>
  const secondRow = <div className="grid grid-cols-10">{boardGrid.slice(10,20).reverse()}</div>
  const thirdRow = <div className="grid grid-cols-10">{boardGrid.slice(20,30)}</div>
  

  return { firstRow, secondRow, thirdRow }
}

// The entire 30 squares on the sennet board, 10 on each row
function Board(props: any) {

  const [boardState, setBoardState] = useState({pieces: PIECES, selectedPiece: 0, playerTurn: 1, roll: -1, waitingForSelection: false})

  useEffect(()=>{
    console.log(boardState)
    

  }, [boardState])

  const { firstRow, secondRow, thirdRow } = createBoardGrid(boardState, setBoardState)

  return (
  <div className="bg-[#FFEBB7] m-10 rounded-lg">
      <div className="">{firstRow}</div>
      <div className="">{secondRow}</div>
      <div className="">{thirdRow}</div>

      <button onClick={()=>setBoardState({...boardState, roll: roll(MAX), waitingForSelection: true})}  className="grid mt-5 text-black justify-self-center font-bold bg-[#AD8E70] m-auto p-5 rounded-lg shadow-black drop-shadow-lg hover:scale-110 transition-all hover:contrast-150">ROLL</button>
      {boardState.waitingForSelection ? <><div className="text-black justify-self-center">You rolled a {boardState.roll} </div><div className="text-black">Select a piece to move</div></> : <></>}
  </div>
  )
}

function game (props: any) {
  return (<div className="grid bg-[#243763] h-screen">
    
    <div className="bg-[#FFEBB7] m-auto justify-self-center rounded-lg text-4xl text-black mt-10 p-5 drop-shadow-md shadow-black transition-all hover:scale-110 "><span>Senet</span></div> 
    <div className=" grid bg-[#FFEBB7] rounded-lg m-10 drop-shadow-xl shadow-white hover:scale-105 transition-all"><Board></Board>
    </div>

    <div className="m-auto">Dolor fuga dignissimos. Asperiores maxime numquam consectetur ex quae. Iste odio rem minima expedita voluptas. Dolorum nemo nihil iure adipisci dolores.</div>
  </div>)
}

export default game;