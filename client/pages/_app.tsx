import '../styles/globals.scss'
import { AppProps } from 'next/app'
import React from 'react'
import { GlobalStyle } from '../styles/styles'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
