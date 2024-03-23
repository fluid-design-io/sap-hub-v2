import { Footer } from '@/components/site/footer';
import Header from '@/components/site/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BASE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

import './globals.css';

export const viewport: Viewport = {
    viewportFit: 'cover',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
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

                    {
                        //! DUE TO EXPERIMENTAL FEATURES (PPR), THIS CODE IS COMMENTED OUT
                        // modal
                    }
                    <SiteBackground />
                    <Footer />
                    <Toaster richColors />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
