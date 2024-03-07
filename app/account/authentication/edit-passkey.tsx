import Modal from '@/components/site/modal';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PasskeyUser, updateFriendlyName } from '@/utils/supabase/auth/passkey';
import React, { Fragment, useState } from 'react';
import { toast } from 'sonner';

function EditPasskey({
    passkey,
    open,
    onOpenChange,
}: {
    passkey: PasskeyUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Modal title="Edit Passkey" open={open} onOpenChange={onOpenChange}>
            <UpdatePasskeyForm passkey={passkey} onOpenChange={onOpenChange} />
        </Modal>
    );
}

export default EditPasskey;

export const UpdatePasskeyForm = ({
    passkey,
    onOpenChange,
}: {
    passkey: PasskeyUser;
    onOpenChange: (open: boolean) => void;
}) => {
    const [loading, setLoading] = useState(false);
    const [friendlyName, setFriendlyName] = useState(
        passkey.friendly_name || '',
    );
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateFriendlyName({
                id: passkey.credential_id,
                friendlyName,
            });
            onOpenChange(false);
            toast.success('Passkey updated');
        } catch (error) {
            toast.error('Failed to update Passkey');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className="flex flex-col gap-6" onSubmit={handleSave}>
            <div className="px-6">
                <Input
                    placeholder="Friendly Name"
                    value={friendlyName}
                    onChange={(e) => setFriendlyName(e.target.value)}
                />
            </div>
            <DialogFooter className="gap-6 px-6">
                <DialogClose disabled={loading} type="button">
                    Cancel
                </DialogClose>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={handleSave}
                    type="submit"
                >
                    Save
                </Button>
            </DialogFooter>
        </form>
    );
};
