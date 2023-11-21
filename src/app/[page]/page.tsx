'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import styles from '@/styles/link.module.scss';

export default function Page() {

  return (
    <>
      <Link href={'/'} 
        className={clsx({ [styles.link]: true, [styles['link-active']]: usePathname() === '/page' })}>
          back to main
      </Link>
    </>
  );
}