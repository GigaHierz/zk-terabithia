import Head from 'next/head'
import styles from '../styles/Layout.module.scss'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

export default function Layout ({ children }: { children: any }) {
  return (
    <>
      <div className={styles.pageframe}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com'></link>
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          ></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Nunito+Sans:wght@200&display=swap'
            rel='stylesheet'
          ></link>
          <title>ZK-Terabithia</title>
        </Head>

        <div className={styles.page}>
          <div className={styles.center}>
            <Header></Header>
            <Menu></Menu>

            <main className={styles.main}>{children}</main>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  )
}
