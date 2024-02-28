'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            themes={[
                'desert',
                'field',
                'lava-cave',
                'lava-mountain',
                'scary-forest',
                'snow',
            ]}
            defaultTheme="field"
            disableTransitionOnChange
            enableSystem={false}
            enableColorScheme={false}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
