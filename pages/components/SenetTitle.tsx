import { Inter } from '@next/font/google'
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'], weight: '800' })

export default function SenetHeaderTitle () {
    return <motion.div initial={{x:0, y:-50, opacity: 0.9, width: 10000}}>

    <h1 className={"font-weight-800 text-8xl mb-0 ring-2 pt-4  ring-black bg-yellow-400 justify-center flex " + inter.className}><span className="text-black mr-5">Senet </span> is a <span className=" hover:text-red-500 mr-5 ml-5">fun</span> and <span className="hover:text-green-500 mr-5 ml-5">ancient</span> board <span className="hover:scale-110 hover:text-blue-500 ml-5 ">game</span>. </h1>

    </motion.div>
}