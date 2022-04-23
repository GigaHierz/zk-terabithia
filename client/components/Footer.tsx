import { StylesProvider } from '@chakra-ui/react'
import styles from '../styles/Footer.module.scss'

export default function Footer () {
  return (
    <div className={styles.footer}>
      <a href='https://linktr.ee/ZK-Terabithia'>Linktree</a>
      <a href='https://linktr.ee/ZK-TerabithiaxAvalanche'>
        Linktree ZK-Terabithia@AvalancheSummit 2022
      </a>
      <a href='https://twitter.com/MatchmeNft'>Twitter</a>
      <a href='https://testnet.snowtrace.io/address/0x9F1Fca06405619692fa941b351d42342df496a26'>
        Contract
      </a>
    </div>
  )
}
