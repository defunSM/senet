import { motion } from 'framer-motion'

export default function Marble({color, boundaryRef}: {color: string, boundaryRef: any}){
    const background = color + "marble"
    return <motion.div drag dragConstraints={boundaryRef} onDragEnd={
        (event: any, info: any) => console.log(event.path[2])} dragSnapToOrigin={true}><div className={background + " rounded-sm inline-block p-5 drop-shadow-md shadow-black transition-all hover:scale-150 ring-1 ring-black hover:rotate-45 index-100 " }></div></motion.div>
}
