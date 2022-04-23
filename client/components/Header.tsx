import styles from '../styles/Header.module.scss'
import Link from 'next/link'

import dynamic from 'next/dynamic'
const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false
})
export default function Header () {
  return (
    <>
      <div className={styles.flexHeader}>
        <div className={styles.centerItems}>
          <Link href='/'>
            <img className={styles.logo} src='/zk_logo.png' alt='' />
          </Link>

          <h1>ZK-Terabithia</h1>
        </div>

        <ConnectWallet />
      </div>
    </>
  )
}
