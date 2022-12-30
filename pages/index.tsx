import { Inter } from '@next/font/google'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Senet</title>
        <meta name="description" content="Senet is a board game from ancient Egypt that was played with dice and pieces on a grid of squares." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          {/* <span className="text-4xl">Senet</span> */}
          <p className="text-2xl">
            Senet is a board game from ancient Egypt that was played with dice and pieces on a grid of squares.&nbsp;
          <Link href="/play" className={styles.description}>click here to learn more</Link>
          </p>
        </div>

        <div className={styles.center}>
        </div>

        <div className={styles.grid + "justify-center"}>
          <a
            href="/play"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Play now <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
