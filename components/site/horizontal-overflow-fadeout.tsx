import { cn } from '@/lib/utils';
import React, { Fragment } from 'react';

function HorizontalOverflowFadeOut({ className }: { className?: string }) {
    return (
        <Fragment>
            <div
                className={cn(
                    'absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent',
                    className,
                )}
            />
            <div
                className={cn(
                    'absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent',
                    className,
                )}
            />
        </Fragment>
    );
}

export default HorizontalOverflowFadeOut;
