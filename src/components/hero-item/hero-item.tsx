import styles from '@/styles/hero-item.module.scss';
import Image from 'next/image';

type PersonProps = {
  name: string;
};

type initialStateProps = {
  person: PersonProps | null;
};

export default function HeroItem({ person }: initialStateProps) {
  return (
    <>
      <Image
        priority={true}
        src="/placeholder.webp"
        alt="placeholder"
        width={100}
        height={150}
        className={styles.image}
      />
      <div className="d-grid">
        <h3 data-testid="hero-item" className={styles.h3}>
          {person && person.name}
        </h3>
      </div>
    </>
  );
}
