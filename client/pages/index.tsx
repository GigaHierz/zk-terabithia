import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'
import { Colors } from '../styles/styles'

const Tab = styled.button<{ selected: boolean }>`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  :&hover {
    background-color: grey;
  }

  background-color: ${({ selected }) =>
    selected ? `${Colors.brandSecondary}` : `${Colors.brandPrimary}`};
`
const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 2rem 1rem;
  width: 16rem;
  background: transparent;
  color: ${Colors.brandSecondary};
  border: 2px solid white;
`
const ButtonLarge = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 3rem 1rem;
  width: 35rem;
  height: 5rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`
const Text = styled.p`
  font-size: larger;
  margin: 0.5rem 1rem;
`
const Label = styled.label`
  font-size: large;
  margin: 0.5rem 1rem;
`
const ZkContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  padding: 2rem;
  margin: 2rem;
  width: 40rem;
  height: 40rem;
`

const Input = styled.input`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1rem;
  width: 35rem;
  height: 4rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
const SelectList = styled.select`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1rem;
  width: 35rem;
  height: 4rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
const SelectItem = styled.option`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1rem;
  width: 35rem;
  height: 4rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  font-size: larger;
`

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
    state === 'deposit' ? setUserState('deposit') : setUserState('withdraw')
  }
  const updateAmountState = (amount: number) => {
    const ethAmount = amount / 2
    setAmountState(ethAmount.toString())
  }

  return (
    <Layout>
      <h2>ZK- Terabithia</h2>
      <Text className={styles.intro}>
        Zk-terabithia is a zero-knowledge proof cross-chain bridge that allows
        to deposit, lend and withdraw crypto at a low cost without compromising
        privacy.
      </Text>
      <FlexRow>
        <Tab
          selected={userState === 'deposit'}
          onClick={() => updateUserState('deposit')}
        >
          Deposit
        </Tab>
        <Tab
          selected={userState !== 'deposit'}
          onClick={() => updateUserState('withdraw')}
        >
          Withdraw
        </Tab>
      </FlexRow>

      {userState === 'deposit' ? (
        <ZkContainer>
          <FlexColumn>
            <FlexRow>
              <Button onClick={() => updateAmountState(100)}>100aETH</Button>
              <Button onClick={() => updateAmountState(200)}>200aETH</Button>
            </FlexRow>
            <FlexRow>
              <Button onClick={() => updateAmountState(300)}>300aETH</Button>
              <Button onClick={() => updateAmountState(400)}>400aETH</Button>
            </FlexRow>
          </FlexColumn>
          <Text>{amountState || '0'} ETH will be deposited </Text>
          <ButtonLarge onClick={deposit}>Deposit</ButtonLarge>
        </ZkContainer>
      ) : (
        <ZkContainer>
          <FlexColumn>
            <Label>Choose your Blockchain</Label>
            <SelectList value={selectedChainState} onChange={handleChange}>
              <SelectItem value='avalanche'>Avalanche</SelectItem>
              <SelectItem value='binance'>Binance</SelectItem>
              <SelectItem value='ethereum'>Ethereum</SelectItem>
            </SelectList>
          </FlexColumn>
          <FlexColumn>
            <Label>Note</Label>
            <Input
              type='text'
              onChange={event => setNoteState(event.target.value)}
              placeholder={'hash'}
            ></Input>
          </FlexColumn>
          <FlexColumn>
            <Label>Recepient Address</Label>
            <Input
              type='text'
              onChange={event => setRecepientAddressState(event.target.value)}
              placeholder={'0xAddress'}
            ></Input>
            <ButtonLarge onClick={withdraw}>Withdraw</ButtonLarge>
          </FlexColumn>
        </ZkContainer>
      )}
    </Layout>
  )
}

export default Home
