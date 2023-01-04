import { Inter, Roboto } from '@next/font/google'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: "500"})

export default function Home() {
  return (
    <>
      <Head>
        <title>Senet</title>
        <meta name="description" content="Senet is a board game from ancient Egypt that was played with dice and pieces on a grid of squares." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="bg-white h-screen grid p-20 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="grid ml-10 mr-10">
          <div className="bg-yellow-200 p-20 rounded-3xl ring-black ring-1 shadow-md drop-shadow-md">
            {/* <span className="text-black ">Senet</span> */}
            <p className={"text-black text-3xl " }>Senet is an ancient Egyptian board game that was played by people in ancient Egypt more than 3500 years ago.
            
            The game consists of a rectangular board with 30 squares arranged in three rows of ten squares each. Each player has a set of game pieces, which they move according to the roll of dice. The objective of the game is to be the first player to move all of their pieces off the board.</p>
          </div>

            <div className="bg-gradient-r from-purple-500 to-pink-500 p-20 rounded-b-3xl"></div>
          </div>
        </div>
    </>
  )
}
