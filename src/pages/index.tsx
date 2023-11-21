import styles from '@/styles/page.module.css'
import Link from 'next/link'
import Header from '@/components/header/header'
import getHeroesAll from '@/api/heroes';

type Heroes = {
  name: string
}

export async function getStaticProps() {
  const data = await getHeroesAll('');
  const heroes = data.results;
  return {
    props: {
      heroes
    }
  }
}

export default function Home( { heroes }: { heroes: Heroes[] }) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {heroes.map(hero => {
          return (
            <Link href={`/page/${hero.name}`} key={hero.name}>
              <h1 className={styles.title}>
                {hero.name}
              </h1>
            </Link>
          )
        })}
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
