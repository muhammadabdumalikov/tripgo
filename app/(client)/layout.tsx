'use client';

import { Poppins } from 'next/font/google';
import '../globals.css';
import ResponsiveNav from '@/components/(client)/layout/Navbar/ResponsiveNav';
import Footer from '@/components/shared/layout/Footer';

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${font.className} antialiased`}>
      <div className="flex flex-col min-h-screen">
        <ResponsiveNav />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
} 