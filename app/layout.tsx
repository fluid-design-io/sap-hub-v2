import { Footer } from '@/components/site/footer';
import Header from '@/components/site/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:8080';

export const viewport: Viewport = {
    viewportFit: 'cover',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        default: 'SAP Hub',
        template: '%s | SAP Hub',
    },
    description: 'Super Auto Pets Community',
};

const SiteBackground = dynamic(() => import('@/components/theme/background'), {
    ssr: false,
});

const lapsus = localFont({
    src: './fonts/Lapsus/LapsusPro.otf',
    fallback: ['sans-serif', 'system-ui'],
    variable: '--font-lapsus',
});
const komika = localFont({
    src: [
        {
            path: './fonts/Komika/Komika-Regular.ttf',
            weight: '400',
        },
        {
            path: './fonts/Komika/Komika-Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/Komika/Komika-Bold.ttf',
            weight: '700',
        },
        {
            path: './fonts/Komika/Komika-Bold-Italic.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
    fallback: ['sans-serif', 'system-ui'],
    variable: '--font-komika',
});

export default function SiteRootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn(lapsus.variable, komika.variable)}
            suppressHydrationWarning
        >
            <body className="max-w-full overflow-x-hidden bg-background font-komika text-foreground antialiased">
                <ThemeProvider>
                    <Header />
                    {children}
                    {modal}
                    {/* <SiteBackground /> */}
                    <Footer />
                    <Toaster richColors />
                    {/* <Analytics /> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
