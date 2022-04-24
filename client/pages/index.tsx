import { NextPage } from 'next'
import { useState } from 'react'

import Layout from '../components/Layout'
import styled from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [userState, setUserState] = useState<string>('deposit')
  const [amountState, setAmountState] = useState<string>()
  const [noteState, setNoteState] = useState<string>()
  const [recepientAddressState, setRecepientAddressState] = useState<string>()
  const [hashState, setHashState] = useState<string>()
  const [coinState, setCoinState] = useState<string>()
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
    setHashState('Loading...')

    setTimeout(() => {
      setHashState(`This is your HASH. Please keep it safe. If you loose it we won\'t
      be able to retrace it.
     0x32c907f5b88c7c5f6e26d16d`)
    }, 1500)
  }
  const withdraw = () => {
    console.log('promting the wallet')

    setHashState('')

    // TODO: check noteState and recepientAddressState
    // contract.withdraw({ value: 0.1 })

    setCoinState('Loading...')

    setTimeout(() => {
      setCoinState(`your funds have been transferred to your account.`)
    }, 1500)
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
        {userState === 'deposit' ? (
          <button
            id='deposit'
            className={styled.selected}
            onClick={() => updateUserState('deposit')}
          >
            Deposit
          </button>
        ) : (
          <button
            id='deposit'
            className={styled.tab}
            onClick={() => updateUserState('deposit')}
          >
            Deposit
          </button>
        )}
        {userState === 'deposit' ? (
          <button
            id='withdraw'
            className={styled.tab}
            onClick={() => updateUserState('withdraw')}
          >
            Withdraw
          </button>
        ) : (
          <button
            id='withdraw'
            className={styled.selected}
            onClick={() => updateUserState('withdraw')}
          >
            Withdraw
          </button>
        )}
      </div>

      {userState === 'deposit' ? (
        <div className={styled.zkContainer}>
          <div className={styled.flexrow}>
            <div className={styled.flexColumn}>
              <button
                className={styled.button}
                onClick={() => updateAmountState(100)}
              >
                100 aETH
              </button>
              <button
                className={styled.button}
                onClick={() => updateAmountState(200)}
              >
                200 aETH
              </button>
            </div>
            <div className={styled.flexColumn}>
              <button
                className={styled.button}
                onClick={() => updateAmountState(300)}
              >
                300 aETH
              </button>
              <button
                className={styled.button}
                onClick={() => updateAmountState(400)}
              >
                400 aETH
              </button>
            </div>
          </div>
          <p className={styled.text}>
            {amountState || '0'} ETH will be deposited{' '}
          </p>
          <button
            disabled={!amountState}
            className={styled.buttonLarge}
            onClick={deposit}
          >
            Deposit
          </button>
          {hashState ? <p className={styled.infoText}>{hashState}</p> : ''}
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
            <button
              disabled={!noteState && !recepientAddressState}
              className={styled.buttonLarge}
              onClick={withdraw}
            >
              Withdraw
            </button>

            {coinState ? <p className={styled.infoText}>{coinState}</p> : ''}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Home
