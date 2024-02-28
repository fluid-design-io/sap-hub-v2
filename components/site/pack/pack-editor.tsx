'use client';

import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import withUser from '@/hooks/with-user/client';
import { getUrl } from '@/lib/get-item-public-url';
import { User } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardIcon, Loader2, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Modal from '../modal';
import EditorForm, { PackEditorForm } from './editor-form';

function PackEditor({
    defaultValues,
    user,
    id,
}: {
    defaultValues?: PackEditorForm;
    user: User;
    id?: string;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const isEdit = !!defaultValues;
    const [title, setTitle] = useState<string | undefined>(
        defaultValues?.title,
    );
    const [minionId, setMinionId] = useState<string | undefined>(
        defaultValues?.packCode
            ? JSON.parse(defaultValues.packCode)?.Minion
            : null,
    );
    const handleOpenModal = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        setOpen(true);
    };
    return (
        <div className="flex-shrink-0 pr-6">
            <Button onClick={handleOpenModal}>
                {isEdit ? 'Edit' : 'Create'}
                <span className="hidden md:inline-block md:pl-1">Pack</span>
                <PlusIcon className="ml-1.5 size-3.5" strokeWidth={3} />
            </Button>

            <Modal
                title={
                    <div className="flex justify-between">
                        <DialogTitle className="subtitle text-4xl">
                            {title || 'Create Pack'}
                        </DialogTitle>
                        {minionId && (
                            <Image
                                alt={minionId}
                                src={getUrl('pets', minionId)}
                                width={100}
                                height={100}
                                className="-mb-8 size-16"
                            />
                        )}
                    </div>
                }
                description={isEdit ? 'Edit Pack' : 'Create a new pack'}
                open={open}
                onOpenChange={setOpen}
                desktopClassName="sm:max-w-[600px]"
            >
                <EditorForm
                    {...{
                        defaultValues,
                        id,
                        handleClose: () => setOpen(false),
                        onTitleChange: setTitle,
                        onMinionChange: setMinionId,
                    }}
                />
            </Modal>
        </div>
    );
}

export default withUser(PackEditor);
