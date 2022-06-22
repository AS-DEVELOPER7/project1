import type { NextPage } from 'next'
import Head from 'next/head'

import Feed from '../components/Feed'
import {Header} from '../components/Header'
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/>
     <Feed/>
    </div>
  )
}

export default Home
