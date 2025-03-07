'use client';

import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {/* We'll add organizer-specific header/navigation later */}
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
} 