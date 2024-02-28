'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@ui/button';

declare global {
    interface Window {
        pagefind: any;
    }
}

function getRoutePathFromData(route: string) {
    const url = new RegExp('/server/app/(.*?).html');
    const strippedUrl = url.exec(route);
    return strippedUrl ? `/${strippedUrl[1]}` : null;
}

function Result({ result }: { result: any }) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await result.data();
            setData(data);
        }
        fetchData();
    }, [result]);

    if (!data) return null;

    const routePath = getRoutePathFromData(data.raw_url);
    if (!routePath) {
        return null;
    }

    return (
        <Link href={routePath} className="block py-4">
            <h3 className="text-base font-medium text-popover-foreground">
                {data.meta.title}:{' '}
            </h3>
            <p
                className="mt-1.5 text-sm text-popover-foreground/70 [&_mark]:bg-transparent [&_mark]:font-bold [&_mark]:text-inherit [&_mark]:underline [&_mark]:underline-offset-1"
                dangerouslySetInnerHTML={{ __html: data.excerpt }}
            />
        </Link>
    );
}

export function Search({
    variant = 'default',
}: {
    variant?: 'link' | 'default';
}) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState([]);

    const isDesktop = useMediaQuery('(min-width: 768px)');

    // Close modal when user clicks on a search result (when route changes)
    const pathname = usePathname();
    const closeModal = useCallback(() => setOpen(false), []);
    useEffect(() => {
        closeModal();
    }, [closeModal, pathname]);

    async function handleSearch(query: string) {
        setQuery(query);
        if (window.pagefind) {
            const search = await window.pagefind.search(query);
            setResults(search.results);
        }
    }

    useEffect(() => {
        async function loadPagefind() {
            if (typeof window.pagefind === 'undefined') {
                try {
                    window.pagefind = await import(
                        // @ts-expect-error pagefind.js generated after build
                        /* webpackIgnore: true */ './pagefind/pagefind.js'
                    );
                } catch (e) {
                    window.pagefind = { search: () => ({ results: [] }) };
                }
            }
        }
        loadPagefind();
    }, []);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <SearchButton variant={variant} setOpen={setOpen} />
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                    <SearchResultList
                        value={query}
                        onValudChange={handleSearch}
                        results={results}
                    />
                </PopoverContent>
            </Popover>
        );
    }
    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <SearchButton variant={variant} setOpen={setOpen} />
                </DrawerTrigger>
                <DrawerContent className="min-h-96">
                    <div className="mt-4 border-t">
                        <SearchResultList
                            value={query}
                            onValudChange={handleSearch}
                            results={results}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

const SearchButton = ({
    variant,
    setOpen,
}: {
    variant: 'link' | 'default';
    setOpen: (value: boolean) => void;
}) => {
    return (
        <Button
            onClick={() => setOpen(true)}
            title="⌘K"
            variant={variant}
            className={cn('flex items-center gap-2', {
                'h-auto p-0 font-bold text-[hsl(var(--header-foreground))]':
                    variant === 'link',
            })}
        >
            <SearchIcon className="size-5 lg:size-4" strokeWidth={3} />
            <span className="hidden sm:block">Search</span>
        </Button>
    );
};

function SearchResultList({
    value,
    onValudChange,
    results,
}: {
    value: string;
    onValudChange: (value: string) => void;
    results: any[];
}) {
    return (
        <Command shouldFilter={false}>
            <CommandInput
                placeholder="Find something..."
                value={value}
                onValueChange={onValudChange}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {results.map((result) => (
                        <CommandItem key={result.id} value={result}>
                            <Result result={result} />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
