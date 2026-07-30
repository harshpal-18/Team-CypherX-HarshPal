import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'QuickBite — AI-Powered Smart Canteen',
  description: 'Skip the queue. Grab your food. AI-powered pre-ordering for your campus canteen.',
  keywords: 'canteen, food ordering, smart queue, AI, campus, university',
  openGraph: {
    title: 'QuickBite — AI-Powered Smart Canteen',
    description: 'Skip the queue. Grab your food.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              border: '2px solid #1D1D1D',
              borderRadius: 16,
              boxShadow: '4px 4px 0 #1D1D1D',
              background: '#fff',
              color: '#1D1D1D',
            },
          }}
        />
      </body>
    </html>
  );
}
