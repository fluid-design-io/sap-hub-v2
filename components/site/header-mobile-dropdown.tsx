'use client';

import { MenuIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@ui//button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@ui//dropdown-menu';

import { siteNavigation } from './navigation';

function HeaderMobileDropdown({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const mobileNavigation = [{ name: 'Home', href: '/' }, ...siteNavigation];
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button>
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[8.75rem]">
                <DropdownMenuRadioGroup
                    value={pathname}
                    onValueChange={(value) => router.push(value)}
                >
                    {mobileNavigation.map((item) => (
                        <DropdownMenuRadioItem
                            key={item.name}
                            value={item.href}
                            className="capitalize"
                        >
                            {item.name}
                        </DropdownMenuRadioItem>
                    ))}
                    {children}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HeaderMobileDropdown;
