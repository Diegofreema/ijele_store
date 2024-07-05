import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/Providers';
import { ViewTransitions } from 'next-view-transitions';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modal';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Ijele store',
  description: 'Ijele SC store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <Providers>
            <Header />
            <Modals />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
