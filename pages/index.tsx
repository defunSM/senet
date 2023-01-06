import { Inter, Roboto } from '@next/font/google'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Marble from './components/Marble'
import PlayApp from './components/PlayButton'
import Puzzle from './components/Puzzle'

const inter = Inter({ subsets: ['latin'], weight: '800' })
const interThin = Inter({ subsets: ['latin'], weight: '300'})
const roboto = Roboto({ weight: "700"})

export default function Home() {
  return (
    <>
      <Head>
        <title>Senet</title>
        <meta name="description" content="Senet is a board game from ancient Egypt that was played with dice and pieces on a grid of squares." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center"> <Puzzle></Puzzle></div>
        <div className="bg-white h-screen flex flex-col bg-gradient-to-r from-purple-500 to-pink-500 justify-center">


        <div className="">
        <h1 className={"font-weight-800 text-8xl mb-0 ring-2 pt-4  ring-black bg-yellow-400  " + inter.className}><span className="text-black">Senet</span> is a fun board <span className="hover:scale-110">game</span>. </h1>
        </div>
        <div className="p-20 justify-self-center">
        <span className={"text-lg "}>An ancient Egyptian board game that is believed to have been played as far back as 3100 BCE.<p></p>The game is played on a grid of 30 squares, arranged in three rows of ten.<p></p> Each player has a set of pieces that are moved along the board according to the roll of a pair of dice.<p></p> The goal of the game is to be the first player to get all of their pieces off the board.</span>
        </div>
        {/* <div className="pl-20 text-black font-bold">Are you ready?
        <div className="flex flex-row mt-3 gap-2">
        <Marble color="red"></Marble>
        <Marble color="green"></Marble>
        </div>

        </div> */}
        <div className="flex flex-row justify-center">
        <PlayApp></PlayApp>
        </div>
        {/* <h1 className={"font-weight-800 text-4xl mt-0 pt-0 " + inter.className}>Played by the Egyptians more than 3500 years ago.</h1> */}

        </div>
    </>
  )
}
