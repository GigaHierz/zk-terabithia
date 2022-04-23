import Head from 'next/head'
import styles from '../styles/Header.module.scss'
import Sidebar from './Menu'
import Link from 'next/link'

import { useWeb3React } from '@web3-react/core'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Button } from '@chakra-ui/react'

export default function Header () {
  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://speedy-nodes-nyc.moralis.io/{process.env.MORALIS_KEY}/avalanche/testnet`,

    appName: 'ZK-Terabithia',
    supportedChainIds: [1, 3, 4, 5, 42, 43114, 43113, 43112]
  })
  const {
    active,
    activate,
    deactivate,
    library,
    chainId,
    account
  } = useWeb3React()
  const activateWallet = (): void => {
    activate(CoinbaseWallet)
  }
  return (
    <>
      <div className={styles.flexHeader}>
        <div className={styles.centerItems}>
          <Link href='/'>
            <img
              className={styles.logo}
              src='/images/logo_matchmenft_gold.png'
              alt=''
            />
          </Link>

          <h1>ZK-Terabithia</h1>
        </div>
        <Button onClick={activateWallet}>
          <img src='/coinbase-logo.png' alt='' />
          {active ? 'Connected' : 'Connect Wallet'}
        </Button>
        {/* <div>Connection Status: {}</div> */}
      </div>
      {/* <div>Account: {account}</div> */}
      {/* <div>Network ID: {chainId}</div> */}
    </>
  )
}
