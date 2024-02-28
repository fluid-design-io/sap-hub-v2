import { cn } from '@/lib/utils';
import React from 'react';

type ContainerProps = {
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
};
function Container({ children, as, className }: ContainerProps) {
    const Comp = as || 'div';
    return (
        <Comp
            className={cn(
                'container mx-auto flex flex-1 flex-col items-center gap-8 px-6',
                className,
            )}
            data-pagefind-body
        >
            {children}
        </Comp>
    );
}

export default Container;
