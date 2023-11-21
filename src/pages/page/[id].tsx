import { InputLimit } from '@/components/input-limit/input-limit';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/styles/link.module.scss';
import { usePathname } from 'next/navigation';

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InputLimit />
        <Link href={'/'} 
        className={clsx({ [styles.link]: true, [styles['link-active']]: usePathname() === '/page' })}>
          back to main
      </Link>
      {children}
    </>
  );
}