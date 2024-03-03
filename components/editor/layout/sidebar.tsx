import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    CollapsibleContent,
    Collapsible as CollapsiblePrimitive,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import React, { useEffect } from 'react';

type SidebarProps = { children: React.ReactNode };

export function Sidebar({ children }: SidebarProps) {
    return (
        <ScrollArea className="mx-auto w-96 flex-shrink-0">
            <Card className="text-card-foreground">
                <CardContent className="flex flex-col gap-6">
                    {children}
                </CardContent>
            </Card>
        </ScrollArea>
    );
}

type CollapsibleProps = {
    children: React.ReactNode;
};

/**
 * Hides content on mobile and shows it on desktop,
 * can be toggled on mobile by clicking the button.
 */
export const Collapsible = ({ children }: CollapsibleProps) => {
    const [onMount, setOnMount] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    useEffect(() => {
        if (!onMount) {
            setOnMount(true);
            return;
        }
        if (isDesktop) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [isDesktop, onMount]);
    if (!onMount) return <Skeleton className="h-10 w-full" />;
    return (
        <CollapsiblePrimitive open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'mb-4 flex w-full items-center justify-between',
                        isDesktop && 'hidden',
                    )}
                >
                    <span>More Settings</span>
                    <ChevronsUpDown className="ml-2 size-4" />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
                {children}
            </CollapsibleContent>
        </CollapsiblePrimitive>
    );
};
