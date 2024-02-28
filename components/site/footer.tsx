import Link from 'next/link';
import React from 'react';

import { Button } from '@ui/button';

import { ModeToggle } from '../theme/mode-toggle';

export const Footer = () => {
    return (
        <div className="pb-6 pt-32 md:px-8 md:pb-0">
            <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-4 md:h-24 md:flex-row">
                <div>
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{' '}
                        <Button
                            className="h-7 px-0 underline hover:opacity-80"
                            variant="link"
                            asChild
                        >
                            <Link
                                href="https://https://oliverpan.vercel.app/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Oliver
                            </Link>
                        </Button>
                        . The source code is available on{' '}
                        <Button
                            className="h-7 px-0 underline hover:opacity-80"
                            variant="link"
                            asChild
                        >
                            <Link
                                href="https://github.com/fluid-design-io/SAP-hub"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </Link>
                        </Button>
                        .
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                        <Link href="/updates">SAP Updates</Link>
                    </div>
                </div>
                <ModeToggle />
            </div>
        </div>
    );
};
