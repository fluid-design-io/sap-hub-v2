'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAtom } from 'jotai';
import { ChevronLeft, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-hook-form';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ui/alert-dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@ui/tooltip';

import { loadingAtom } from './atoms';

type ToolbarProps = {
    children?: React.ReactNode;
    /**
     * The title of the document.
     */
    title?: string;
    /**
     * When the delete button is clicked, this function is called.
     * @param id
     * @returns
     */
    onDelete: () => void;
};

export const Toolbar = ({ children, title, onDelete }: ToolbarProps) => {
    const [loading] = useAtom(loadingAtom);
    const router = useRouter();
    const { isDirty } = useFormState();
    const handleGoBack = () => {
        if (isDirty) {
            if (confirm('Are you sure you want to leave this page?')) {
                router.back();
            }
            return;
        }
        router.back();
    };
    return (
        <TooltipProvider delayDuration={0}>
            <div className="sticky top-0 z-10 w-full bg-background">
                <div className="flex items-center p-2">
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    size="icon"
                                    disabled={false}
                                    onClick={handleGoBack}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Go Back</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Go Back
                            </TooltipContent>
                        </Tooltip>
                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />
                        {title ? (
                            <span className="text-sm font-medium">{title}</span>
                        ) : (
                            <span className="text-sm font-medium">
                                New document
                            </span>
                        )}
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <AlertDialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                type="button"
                                                disabled={loading}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete document
                                                </span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Delete document
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure? This action
                                                    cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={onDelete}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Yes, delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    Delete document
                                </TooltipContent>
                            </Tooltip>
                        </AlertDialog>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-6" />
                    {children}
                    <Button
                        size="sm"
                        type="submit"
                        disabled={loading || !isDirty}
                        className="min-w-16"
                    >
                        {loading ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
                <Separator />
            </div>
        </TooltipProvider>
    );
};
