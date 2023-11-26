import { InputLimit } from '@/components/input-limit/input-limit';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/styles/link.module.scss';
import stylesHeroCard from '@/styles/hero-card.module.scss';
import { usePathname } from 'next/navigation';
import getHeroesAll from '@/api/heroes';
import { GetServerSidePropsContext } from 'next';
import Pagination from '@/components/pagination/pagination';
import Header from '@/components/header/header';
import HeroItem from '@/components/hero-item/hero-item';
import { HomeProps, Heroes } from '@/pages/index.types';
import HeroCard from '@/components/hero-card/hero-card';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { limit, search } = context.query;
  const heroes: Heroes[] = [];

  if (search) {
    heroes.length = 0;
    const data = await getHeroesAll(search.toString());

    if (data && data.results) {
      heroes.push(...data.results);
    }
  } else {
    for (let i = 1; i <= 3; i++) {
      const data = await getHeroesAll('', i);

      if (data && data.results) {
        heroes.push(...data.results);
      }
    }
  }

  if (limit) {
    heroes.length = Number(limit);
  }

  return {
    props: {
      heroes,
      limit: limit || heroes.length.toString(),
    },
  };
}

export default function Home({ heroes, limit }: HomeProps) {
  return (
    <>
      <Header />
      <main className={stylesHeroCard.hero__card_main} data-testid="main">
        <InputLimit limit={limit} />
        <Pagination />
        <Link
          href={'/'}
          className={clsx({
            [styles.link]: true,
            [styles['link-active']]: usePathname() === '/page',
          })}
        >
          CLOSE
        </Link>
        <ul>
          {heroes.map((hero) => {
            return (
              <li key={hero.name}>
                <Link href={`/page/${hero.name}`} className={styles.hero__item}>
                  <HeroItem person={hero} />
                </Link>
              </li>
            );
          })}
        </ul>
        <HeroCard person={heroes[0]} />
      </main>
    </>
  );
}
