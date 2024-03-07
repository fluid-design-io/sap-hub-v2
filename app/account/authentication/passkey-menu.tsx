'use client';

import Modal from '@/components/site/modal';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PasskeyUser, unenroll } from '@/utils/supabase/auth/passkey';
import { MoreVertical } from 'lucide-react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

import EditPasskey from './edit-passkey';

function PasskeyMenu({ passkey }: { passkey: PasskeyUser }) {
    const [openEditPasskey, setOpenEditPasskey] = useState(false);
    const [openCofirmDelete, setOpenConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleUnenroll = async () => {
        setLoading(true);
        try {
            await unenroll({ id: passkey.credential_id });
            setOpenConfirmDelete(false);
            toast.success('Passkey deleted');
        } catch (error) {
            toast.error('Failed to delete Passkey');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpenEditPasskey(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setOpenConfirmDelete(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Modal
                title="Confirm Delete"
                description="Are you sure you want to delete this Passkey?"
                open={openCofirmDelete}
                onOpenChange={setOpenConfirmDelete}
            >
                <DialogFooter className="gap-6 px-6">
                    <DialogClose disabled={loading}>Cancel</DialogClose>
                    <Button
                        disabled={loading}
                        variant="destructive"
                        onClick={handleUnenroll}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </Modal>
            <EditPasskey
                passkey={passkey}
                open={openEditPasskey}
                onOpenChange={setOpenEditPasskey}
            />
        </Fragment>
    );
}

export default PasskeyMenu;
