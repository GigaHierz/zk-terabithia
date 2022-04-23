import '../styles/globals.scss'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary (provider) {
  return new Web3Provider(provider)
}

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
