import { NextPage } from 'next'
import { createContext, useState } from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'
import { ethers, utils } from 'ethers'

const Home: NextPage = () => {
  const [userState, setUserState] = useState<boolean>()
  const [contractInterface, setContractInterface] = useState()

  const mint = () => {
    console.log('promting the wallet')

    // tokenContract.safeMint(signer, { value: price })
    if (true) {
      setUserState(true)
    } else {
      setUserState(false)
    }
    // contract.mint({ value: 0.1 })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2>ZK- Terabithia</h2>
        <span className={styles.intro}>
          Zk-terabithia is a zero-knowledge proof cross-chain bridge that allows
          to deposit, lend and withdraw crypto at a low cost without
          compromising privacy.
        </span>
        <div className={styles.intro}> </div>
      </div>
    </Layout>
  )
}

export default Home
