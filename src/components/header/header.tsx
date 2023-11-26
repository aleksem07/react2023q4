import Search from '@/components/search/search';
import styles from '@/styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Search />
    </header>
  );
}
