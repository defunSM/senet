import { motion } from 'framer-motion'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], weight: '800' })

export default function SenetTitle () {
    return <motion.div initial={{opacity: 0.9}}
    animate={{x: 0, y: -50, opacity:1, width: 10000}}
    transition={{ delay: 1}}>

    <h1 className={"font-weight-800 text-8xl mb-0 ring-2 pt-4  ring-black bg-yellow-400 " + inter.className}><span className="text-black">Senet </span> is a <span className=" hover:text-red-500">fun</span> and <span className="hover:text-green-500">ancient</span> board <span className="hover:scale-110 hover:text-blue-500">game</span>. </h1>

    </motion.div>
}