import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
    'inline-flex items-center rounded-sm border-2 border-black px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                active: 'bg-[#3EC636] text-black hover:bg-[#66E95F]',
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                card: 'bg-card text-card-foreground hover:bg-card/80',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
