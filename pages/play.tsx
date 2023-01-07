import { faker } from '@faker-js/faker'
import { Arvo } from '@next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const arvo = Arvo({ weight: "400"})

function getServerSideProps() {
    return {
        props: { username: getRandomUserName()}
    }
}

function getRandomUserName() {
    const username = faker.name.firstName() + " " + faker.name.lastName()
    return username.toLowerCase()
}

function additionalDetails() {
    const music = faker.music.genre()
    return {music: music}
}

interface User {
    userName: string
}

function Play (props: any)  {
    const [clicked, setClicked] = useState(0)
    const [username, setUsername] = useState(props.username)

    useEffect(() => setUsername(getRandomUserName()), [clicked])

    const avatarUrl = "https://avatars.dicebear.com/api/miniavs/" + username + ".svg?background=white"

    return (
        <div className="h-screen grid bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-yellow-400 m-10 rounded-lg transition-all drop-shadow-md">
                <div className="mt-10 mb-1 p-1 text-2xl justify-center grid border-yellow-300 border-2 bg-yellow-300 text-black rounded-lg drop-shadow-md font-semibold">Choose a character</div>
                <div className="pt-5 hover:pb-5 grid justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-lg hover:translate-y-8 transition-all">
                <div className="mb-3 grid justify-center">
                <Image className="rounded-lg hover:scale-110 hover:contrast-125 transition-all drop-shadow-md"
                src={avatarUrl}
                width={120}
                height={120}
                alt="player avatar"
                unoptimized={true}></Image>
                </div>
                <div className={arvo.className + " text-4xl justify-self-center mb-3 p-2 rounded-lg border-yellow-300 border-2 bg-yellow-300 text-black drop-shadow-md"}>{username}</div>
                <div className="grid justify-center">
                <button className="p-0 m-0" onClick={() => setClicked(clicked + 1)}><Image className="hover:scale-110 hover:contrast-75 transition-all" src="/refresh.svg" width={45} height={45} alt="refresh username"></Image></button>
                </div>
            <div className="mt-5 mb-5 justify-center flex">
                        <div className="mr-5 p-2 bg-yellow-300 text-black rounded-lg flex drop-shadow-md hover:scale-110 transition-all">
                <Image className="" src="/left-arrow.svg" width={30} height={30} alt="left-arrow"></Image>
                        <span className="mt-0.5 ml-1 font-semibold"><Link href="/">Go back</Link></span>
                    </div>
                        <div className="mr-5 p-2 bg-yellow-300 text-black rounded-lg flex drop-shadow-md transition-all hover:scale-110">
                        <span className="mt-0.5 mr-2 font-semibold"><Link href="/senet">Next</Link></span>
                <Image className="" src="/right-arrow.svg" width={30} height={30} alt="right-arrow"></Image>
                    </div>
                </div>
            </div>
            </div>
            </div>
            )
}

export default Play;
