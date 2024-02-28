import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const textVariantBase = {
  default: "font-komika",
  muted: "text-muted-foreground",
  gradient:
    "bg-clip-text text-transparent bg-gradient-to-br from-zinc-950/70 to-black/95 dark:from-white dark:to-white/65",
};

const textVariants = cva("", {
  variants: {
    size: {
      default: "text-base/6 sm:text-sm/6",
      xs: "text-[0.8rem] sm:text-[0.75rem]",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-lg lg:text-xl",
      "2xl": "text-2xl lg:text-3xl",
      "3xl": "text-2xl lg:text-4xl",
    },
    variant: {
      ...textVariantBase,
      "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    const isExternal = props.target === "_blank";
    return (
      // @ts-expect-error
      <Comp
        className={cn(
          isExternal && "flex items-center",
          textVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
        {isExternal ? (
          <ExternalLink className='ml-1 inline-block size-3.5' />
        ) : null}
      </Comp>
    );
  }
);

TextLink.displayName = "TextLink";

const headingVariants = cva("scroll-m-20", {
  variants: {
    type: {
      h1: "header font-medium tracking-wide text-[min(max(3.5rem,8vw),6rem)] text-balance",
      h2: "pb-2 text-3xl font-medium tracking-wide first:mt-0 mt-6 scroll-mt-20",
      h3: "text-2xl font-medium tracking-wide first:mt-0 mt-4 scroll-mt-12",
      h4: "text-xl font-medium tracking-wide first:mt-0 mt-3 scroll-mt-10",
      h5: "text-lg font-medium tracking-wide",
      h6: "text-base font-medium tracking-wide",
    },
    variant: {
      default: "font-lapsus text-secondary",
      muted: "text-muted-foreground",
      gradient:
        "bg-clip-text text-transparent bg-gradient-to-br from-zinc-950/70 to-black/95 dark:from-white dark:to-white/65",
    },
  },
  defaultVariants: {
    type: "h1",
    variant: "default",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, type, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : type ?? "h1";
    return (
      <Comp
        className={cn(headingVariants({ variant, type, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export { Text, TextLink, Heading };
