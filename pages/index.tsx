import { Inter } from '@next/font/google'
import Head from 'next/head'
import PlayApp from './components/PlayButton'
import Puzzle from './components/Puzzle'
import SenetHeaderTitle from './components/SenetTitle'
const inter = Inter({ subsets: ['latin'], weight: '800' })
// const roboto = Roboto({ weight: "700"})

const Title = () => {
  return (
  <>
<h1 className={"font-weight-800 text-8xl mb-0 ring-2 pt-4  ring-black bg-yellow-400  " + inter.className}><span className="text-black">Senet</span> is a fun and tactical board <span className="hover:scale-110">game</span>. </h1>

      </>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Senet</title>
        <meta name="description" content="Senet is a board game from ancient Egypt that was played with dice and pieces on a grid of squares." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center">
        <Puzzle></Puzzle>
      </div>

        <div className="bg-white h-screen flex flex-col bg-gradient-to-r from-purple-500 to-pink-500 justify-center">

        <div className="justify-self-center mb-5">
          <SenetHeaderTitle></SenetHeaderTitle>
        </div>

         <div className="mt-5 mb-10 ml-20 flex flex-col justify-center items-center">
          <span className="text-xl">Played as far back as 3100 BCE.<p></p>

          The game is played on a grid of 30 squares.<p></p>



          Each player has a set of pieces.<p></p>


           The goal of the game is to get rid of all pieces.</span>



        </div>


          <div className="flex flex-row justify-center">
          <PlayApp></PlayApp>
          </div>
        </div>
    </>
  )
}
