import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
    cn(
        'isolate relative',
        'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:brightness-125 disabled:pointer-events-none disabled:opacity-50',
        'active:translate-y-0.5',
    ),
    {
        variants: {
            variant: {
                default:
                    'text-black hover:brightness-110 bg-[#FF6A00] [box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset,0px_-0.4rem_0px_0.35rem_#db5325_inset] active:[box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset,0px_-0.275rem_0px_0.35rem_#db5325_inset]',
                active: 'text-black hover:brightness-110 bg-[#3EC636] [box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset]',
                destructive:
                    'text-destructive-foreground hover:brightness-125 bg-[#A30D00] [box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset]',
                outline:
                    'border border-input hover:text-accent-foreground [box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset]',
                secondary:
                    'text-black hover:brightness-110 bg-[#FF6A00] [box-shadow:0px_-0.05rem_0px_0.175rem_#fff_inset,0px_-0.075rem_0px_0.35rem_#000_inset]',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary-foreground underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-12 px-4 pt-1.5 pb-2.5',
                sm: 'h-10 px-3',
                lg: 'h-14 px-8',
                icon: 'h-11 w-11 pb-[1.5px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
