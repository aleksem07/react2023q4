import styles from '@/styles/page.module.css'
import Link from 'next/link'

import Header from '@/components/header/header'

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Link href="/page">
          <h1 className={styles.title}>
            hero
          </h1>
        </Link>
        <Link href="/page/123">
          <h1 className={styles.title}>
            id
          </h1>
        </Link>
      </main>
    </>
  )
}
