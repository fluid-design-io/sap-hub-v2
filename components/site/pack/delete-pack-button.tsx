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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useUserPack } from '@/provider/user-pack-provider';
import { deletePack } from '@/utils/supabase/pack/delete-pack';
import { Loader2, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const DeletePackButton = () => {
    const { user, pack } = useUserPack();
    const [loading, setLoading] = useState(false);

    if (!user) return null;
    const handleDeletePack = async () => {
        setLoading(true);
        try {
            await deletePack(pack.id);
            toast('Pack deleted');
        } catch (error) {
            console.error('🟠 Error:', error);
            toast.error('Failed to delete pack');
        } finally {
            setLoading(false);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <span className="sr-only">Delete pack</span>
                    {loading ? <Loader2 className="animate-spin" /> : <XIcon />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Confirm deletion of pack "{pack.title}"
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this pack? This action
                        is irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePack}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
