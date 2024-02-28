'use client';

import { cn } from '@/lib/utils';
import { ChevronsUpDown, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@ui//button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@ui//dropdown-menu';

import { backgroundNames } from './background-data';

export function ModeToggle({
    variant = 'icon',
}: {
    variant?: 'icon' | 'list-item';
}) {
    const { setTheme, theme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size={variant === 'icon' ? 'icon' : 'default'}
                    className={cn(
                        variant === 'list-item' &&
                            'flex h-12 flex-shrink-0 items-center justify-start text-foreground',
                    )}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] flex-shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] flex-shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                    {variant === 'list-item' && (
                        <>
                            <div className="flex-grow">
                                <p className="ml-3 w-full flex-shrink-0 text-start text-sm">
                                    {theme}
                                </p>
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[8.75rem]">
                <DropdownMenuRadioGroup
                    value={theme || 'field'}
                    onValueChange={setTheme}
                >
                    {backgroundNames.map((theme) => (
                        <DropdownMenuRadioItem
                            key={theme}
                            value={theme}
                            className="capitalize"
                        >
                            {theme}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
