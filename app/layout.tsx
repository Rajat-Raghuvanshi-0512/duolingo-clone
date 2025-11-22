import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

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
        <body className={`${font.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
