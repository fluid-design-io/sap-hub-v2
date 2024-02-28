import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
    cn(
        'isolate relative',
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'active:translate-y-0.5',
    ),
    {
        variants: {
            variant: {
                default: 'text-black hover:brightness-110',
                active: 'text-black hover:brightness-110',
                destructive: 'text-destructive-foreground hover:brightness-125',
                outline: 'border border-input hover:text-accent-foreground',
                secondary: 'text-black hover:brightness-110',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary-foreground underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-12 px-4 pt-1.5 pb-2.5',
                sm: 'h-10 rounded-md px-3',
                lg: 'h-14 rounded-md px-8',
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
        let borderImageSource = ``;
        switch (variant) {
            case 'active':
                borderImageSource = `url('/assets/static/button/btn-active.svg')`;
                break;
            case 'secondary':
                borderImageSource = `url('/assets/static/button/btn-secondary.svg')`;
                break;
            case 'link':
                borderImageSource = ``;
                break;
            case 'destructive':
                borderImageSource = `url('/assets/static/button/btn-destructive.svg')`;
                break;
            default:
                borderImageSource = `url('/assets/static/button/btn-primary.svg')`;
                break;
        }
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                style={{
                    borderImageSource,
                    borderImageRepeat: 'stretch',
                    borderImageWidth: '25px',
                    borderImageSlice: '45 fill',
                    borderImageOutset: 0,
                }}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
