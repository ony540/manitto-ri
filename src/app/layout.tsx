import type { Metadata } from 'next';
import './globals.css';
import { Staatliches, BioRhyme_Expanded } from 'next/font/google';
import localFont from 'next/font/local';

const staatliches = Staatliches({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-tit',
});
const bioRhyme_Expanded = BioRhyme_Expanded({
  weight: ['800'],
  preload: false,
  variable: '--font-sub-tit',
});

const lineSeed = localFont({
  src: [
    { path: '../font/LINESeedKR-Rg.woff2', weight: '400' },
    { path: '../font/LINESeedKR-Bd.woff2', weight: '700' },
    { path: '../font/LINESeedKR-Th.woff2', weight: '300' },
  ],
  variable: '--font-cont',
});

export const metadata: Metadata = {
  title: 'Manitto-ri',
  description: '마니또 정하기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${staatliches.variable} ${bioRhyme_Expanded.variable} ${lineSeed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
