import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import { ViewTransitions } from 'next-view-transitions';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modal';
import { Providers } from '@/components/Providers';
import { cookies } from 'next/headers';
import { Drawer } from '@/components/drawers/Drawer';
import { Profile } from '@/components/drawers/Profile';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Ijele store',
  description: 'Ijele store',
};

const dynamic = 'force-dynamic';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = cookies().get('id')?.value;
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            inter.variable
          )}
        >
          <Providers>
            <Header id={id} />
            <Modals />
            <Drawer />
            <Profile />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
