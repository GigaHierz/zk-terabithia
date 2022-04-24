import { NextPage } from 'next'
import { useState } from 'react'

import Layout from '../components/Layout'
import styled from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [userState, setUserState] = useState<string>()
  const [amountState, setAmountState] = useState<string>()
  const [noteState, setNoteState] = useState<string>()
  const [recepientAddressState, setRecepientAddressState] = useState<string>()
  const [contractInterface, setContractInterface] = useState()
  const [selectedChainState, setSelectedChainState] = useState<string>()

  const handleChange = event => {
    setSelectedChainState(event.target.value)
  }

  const deposit = () => {
    console.log('promting the wallet')

    // tokenContract.safeMint(signer, { value: price })
    // if (true) {
    //   setUserState(true)
    // } else {
    //   setUserState(false)
    // }
    // contract.deposit({ value: 0.1 })
  }
  const withdraw = () => {
    console.log('promting the wallet')

    // TODO: check noteState and recepientAddressState
    // contract.withdraw({ value: 0.1 })
  }

  const updateUserState = (state: string) => {
    if (state === 'deposit') {
      setUserState('deposit')
      const button = document.getElementById('deposit')
      button.classList.add('selected')
    }
    if (state !== 'deposit') {
      setUserState('withdraw')
      const button = document.getElementById('withdraw')
      button.classList.add('selected')
    }
  }
  const updateAmountState = (amount: number) => {
    const ethAmount = amount / 2
    setAmountState(ethAmount.toString())
  }

  return (
    <Layout>
      <h2>ZK-Maia</h2>
      <p className={styled.text}>
        ZK-Maia is a zero-knowledge proof cross-chain bridge that allows to
        deposit, lend and withdraw crypto at a low cost without compromising
        privacy.
      </p>
      <div className={styled.flexrow}>
        <button
          id='deposit'
          className={styled.tab}
          selected={Boolean(userState === 'deposit')}
          onClick={() => updateUserState('deposit')}
        >
          Deposit
        </button>
        <button
          id='withdraw'
          className={styled.tab}
          selected={userState !== 'deposit'}
          onClick={() => updateUserState('withdraw')}
        >
          Withdraw
        </button>
      </div>

      {userState === 'deposit' ? (
        <div className={styled.zkContainer}>
          <div className={styled.flexrow}>
            <div className={styled.flexColumn}>
              <button
                className={styled.button}
                onClick={() => updateAmountState(100)}
              >
                100aETH
              </button>
              <button
                className={styled.button}
                onClick={() => updateAmountState(200)}
              >
                200aETH
              </button>
            </div>
            <div className={styled.flexColumn}>
              <button
                className={styled.button}
                onClick={() => updateAmountState(300)}
              >
                300aETH
              </button>
              <button
                className={styled.button}
                onClick={() => updateAmountState(400)}
              >
                400aETH
              </button>
            </div>
          </div>
          <p className={styled.flexrow}>
            {amountState || '0'} ETH will be deposited{' '}
          </p>
          <button className={styled.buttonLarge} onClick={deposit}>
            Deposit
          </button>
        </div>
      ) : (
        <div className={styled.zkContainer}>
          <div className={styled.flexColumn}>
            <label className={styled.label}>Choose your Blockchain</label>
            <select
              className={styled.selectlist}
              value={selectedChainState}
              onChange={handleChange}
            >
              <option className={styled.selectItem} value='avalanche'>
                Avalanche
              </option>
              <option className={styled.selectItem} value='binance'>
                Binance
              </option>
              <option className={styled.selectItem} value='ethereum'>
                Ethereum
              </option>
              <option className={styled.selectItem} value='optimism'>
                Optimism
              </option>
              <option className={styled.selectItem} value='aave'>
                Aave
              </option>
              <option className={styled.selectItem} value='bnb'>
                Binance
              </option>
              <option className={styled.selectItem} value='fantom'>
                Fantom
              </option>
              <option className={styled.selectItem} value='polygon'>
                Polygon
              </option>
            </select>
          </div>
          <div className={styled.flexColumn}>
            <label className={styled.label}>Note</label>
            <input
              className={styled.input}
              type='p'
              onChange={event => setNoteState(event.target.value)}
              placeholder={'hash'}
            ></input>
          </div>
          <div className={styled.flexColumn}>
            <label className={styled.label}>Recepient Address</label>
            <input
              className={styled.input}
              type='p'
              onChange={event => setRecepientAddressState(event.target.value)}
              placeholder={'0xAddress'}
            ></input>
            <button className={styled.buttonLarge} onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Home
