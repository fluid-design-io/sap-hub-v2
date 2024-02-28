import Link from 'next/link';
import React, { Suspense } from 'react';

import LogoIcon from '../icon/sap-logo';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import AuthButton from './auth-button';
import HeaderMobileDropdown from './header-mobile-dropdown';
import { siteNavigation } from './navigation';
import { Search } from './search';

function Header() {
    return (
        <header>
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">SAP Hub</span>
                        <LogoIcon className="size-8" />
                    </Link>
                </div>
                <div className="flex gap-4 lg:hidden">
                    <Suspense
                        fallback={<Skeleton className="size-10 rounded-md" />}
                    >
                        <Search />
                    </Suspense>
                    <Suspense
                        fallback={<Skeleton className="size-10 rounded-md" />}
                    >
                        <HeaderMobileDropdown>
                            <AuthButton className="flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-normal text-popover-foreground outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground" />
                        </HeaderMobileDropdown>
                    </Suspense>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {siteNavigation.map((item) => (
                        <Button
                            key={item.name}
                            variant="link"
                            className="h-auto p-0"
                            asChild
                        >
                            <Link
                                href={item.href}
                                className="text-sm font-semibold leading-6 !text-[hsl(var(--header-foreground))]"
                            >
                                {item.name}
                            </Link>
                        </Button>
                    ))}
                    <Search variant="link" />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Suspense fallback={null}>
                        <AuthButton />
                    </Suspense>
                </div>
            </nav>
        </header>
    );
}

export default Header;
