import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// import type { Metadata } from 'next'
// import { Roboto } from 'next/font/google'
// import Header from '@/components/header/header'

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// })

// export const metadata: Metadata = {
//   title: 'Star Wars App',
//   description: 'Generated by create next app',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={roboto.className}>
//         <Header />
//         {children}
//       </body>
//     </html>
//   )
// }
