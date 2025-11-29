import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ExitModal from '@/components/modals/exitModal';
import HeartsModal from '@/components/modals/heartsModal';
import PracticeModal from '@/components/modals/practiceModal';

const font = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Duolingo Clone',
  description: 'Duolingo Clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} antialiased`}>
          {children}
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
        </body>
      </html>
    </ClerkProvider>
  );
}
