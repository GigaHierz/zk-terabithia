import { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        137: 'https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN',
        80001: 'https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN',
        10: 'https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN',
        69: 'https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN'
      }
    }
  }
  // coinbasewallet: {
  //   package: CoinbaseWalletSDK, // Required
  //   options: {
  //     appName: 'My Awesome App', // Required
  //     rpc:
  //       'https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN', // Optional if `infuraId` is provided; otherwise it's required
  //     chainId: 80001, // Optional. It defaults to 1 if not provided
  //     darkMode: false // Optional. Use dark theme, defaults to false
  //   }
  // }
}

const web3Modal = new Web3Modal({
  network: 'kovan',
  cacheProvider: true,
  providerOptions
})

export function useWeb3Modal () {
  const [provider, setProvider] = useState(undefined)
  const [error, setError] = useState(null)

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal.cachedProvider && !provider) {
    connectWallet()
  }

  async function connectWallet () {
    try {
      const externalProvider = await web3Modal.connect()
      const ethersProvider = new ethers.providers.Web3Provider(externalProvider)

      setProvider(ethersProvider)
    } catch (e) {
      setError('NO_WALLET_CONNECTED')
      console.log('NO_WALLET_CONNECTED', e)
    }
  }

  function disconnectWallet () {
    web3Modal.clearCachedProvider()
    setProvider(undefined)
  }

  return { connectWallet, disconnectWallet, provider, error }
}
