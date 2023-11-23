import styles from '@/styles/page.module.css';
import Link from 'next/link';
import Header from '@/components/header/header';
import getHeroesAll from '@/api/heroes';
import HeroItem from '@/components/hero-item/hero-item';
import { InputLimit } from '@/components/input-limit/input-limit';
import { GetServerSidePropsContext } from 'next';

type Heroes = {
  name: string;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const heroes: Heroes[] = [];

  for (let i = 1; i <= 3; i++) {
    const data = await getHeroesAll('', i);
    heroes.push(...data.results);
  }

  const { limit } = ctx.query;
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

export default function Home({ heroes, limit }: { heroes: Heroes[], limit: string }) {
  return (
    <>
      <Header />
      <main className={styles.main} data-testid="main">
        <InputLimit limit={limit} />
        <ul className={styles.grid}>
          {heroes.map((hero) => {
            return (
              <Link
                href={`/page/${hero.name}`}
                key={hero.name}
                className={styles.hero__item}
              >
                <HeroItem person={hero} />
              </Link>
            );
          })}
        </ul>
      </main>
    </>
  );
}
