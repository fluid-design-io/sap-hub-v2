'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface ModalProps {
    title: string;
    description?: string | null;
    children: React.ReactNode;
}

function Modal({ title, description, children }: ModalProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const handleClose = (isOpen: boolean) => {
        if (isOpen) return;
        setOpen(false);
        setTimeout(() => {
            router.back();
        }, 300);
    };
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="px-0 pb-0 sm:max-w-[425px]">
                    <DialogHeader className="px-4">
                        <DialogTitle className="subtitle text-4xl">
                            {title}
                        </DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    <ScrollArea className="max-h-[calc(80svh-4.5rem)]">
                        {children}
                        <div className="h-6" />
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleClose}>
            <DrawerContent className="max-h-[calc(100svh-4rem)]">
                <DrawerHeader className="*:text-center">
                    <DrawerTitle className="subtitle text-4xl">
                        {title}
                    </DrawerTitle>
                    {description && (
                        <DrawerDescription>{description}</DrawerDescription>
                    )}
                </DrawerHeader>
                <ScrollArea className="overflow-y-auto pb-6">
                    {children}
                    <div className="mt-8 flex w-full justify-center">
                        <DrawerClose asChild>
                            <button className="min-w-48">Close</button>
                        </DrawerClose>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default Modal;
