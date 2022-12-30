import {v4 as uuidv4} from 'uuid'
import { useState } from 'react'
import {faker} from '@faker-js/faker'

const PIECES = [1,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const MAX = 4 // max number of jumps: 1,4,5 will result in rolling again

// Each square grid on the sennet board
function Square(props: any) {
  const bgColor = props.index % 2 === 0 ? "bg-[#AD8E70]" : "bg-[#FF6E31]"
  return <div className={"m-1 py-4 text-black text-center drop-shadow-sm rounded-lg max-w-xs transition-all hover:scale-110 font-bold " + bgColor}>{props.pieces[props.index]}</div>
}

function roll(max: number) {

  const randomInteger: number = Math.floor(Math.random() * max)
  if (randomInteger === 0){ return 5 }
  
  return randomInteger
}

// The entire 30 squares on the sennet board, 10 on each row
function Board(props: any) {
  
  const [pieces, setPieces] = useState(PIECES)
  const [rollInt, setRollInt] = useState(1)

  // setup the senet board
  const boardPositions = Array.from(Array(30).keys())
  const boardGrid = boardPositions.map((_element, index) => {
    const uniqueId = uuidv4()
    return <Square key={uniqueId} index={index} pieces={pieces}></Square>
  })
  
  // create the three rows, reverse the second one to match the indexing with the path
  const firstRow = <div className="grid grid-cols-10">{boardGrid.slice(0,10)}</div>
  const secondRow = <div className="grid grid-cols-10">{boardGrid.slice(10,20).reverse()}</div>
  const thirdRow = <div className="grid grid-cols-10">{boardGrid.slice(20,30)}</div>

  return (
  <div className="bg-[#FFEBB7] m-10 rounded-lg">
      <div className="">{firstRow}</div>
      <div className="">{secondRow}</div>
      <div className="">{thirdRow}</div>
      <button className="grid mt-5 text-black justify-self-center font-bold bg-[#AD8E70] m-auto p-5 rounded-lg shadow-black drop-shadow-lg hover:scale-110 transition-all hover:contrast-150">ROLL</button>
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
