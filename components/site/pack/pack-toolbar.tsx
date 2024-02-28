'use client';

import { Button } from '@/components/ui/button';
import useUser from '@/hooks/use-user';
import { UserPackProvider } from '@/provider/user-pack-provider';
import { Tables } from '@/types/database';
import { Pack } from '@/types/sap-type';
import { addPackCopyCount } from '@/utils/supabase/pack/add-pack-copy-count';
import { CheckIcon, CopyIcon, ShareIcon, XIcon } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import { toast } from 'sonner';

import { DeletePackButton } from './delete-pack-button';
import { EditPackButton } from './edit-pack-button';
import { PackDescription } from './pack-description';

export const PackToolbar = ({ pack }: { pack: Tables<'packs'> }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [copyCount, setCopyCount] = useState(pack.copy_count);
    const code = pack.code as unknown as Pack;
    const { user } = useUser();
    const handleCopy = async () => {
        // copy code to clipboard
        navigator.clipboard
            .writeText(JSON.stringify(code))
            .then(() => {
                setIsCopied(true);
                toast.success('Code copied', {
                    description: 'Paste it in the customizer',
                });
                setTimeout(() => {
                    setIsCopied(false);
                }, 2500);
            })
            .catch(() => {
                toast.error('Failed to copy code to clipboard');
            })
            .finally(() => {
                setHasCopied(true);
            });
        // add +1 to pack's copy count
        if (hasCopied) return;
        try {
            await addPackCopyCount(pack.id);
            setCopyCount(copyCount + 1);
        } catch (error) {
            toast.error('Failed to update copy count');
        }
    };

    const handleShare = () => {
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:8080';
        const shareUrl = `${baseUrl}/packs/${pack.id}`;
        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                toast.success('Link copied to clipboard');
            })
            .catch(() => {
                toast.error('Failed to copy link to clipboard');
            });
    };

    return (
        <Fragment>
            <UserPackProvider user={user} pack={pack}>
                <PackDescription />
                <div className="flex items-center gap-4">
                    <DeletePackButton />
                    <EditPackButton />
                </div>
            </UserPackProvider>
            <div className="flex items-center gap-4">
                <Button onClick={handleShare} variant="default">
                    <span className="sr-only">Share code</span>
                    <ShareIcon />
                </Button>
                <Button
                    onClick={handleCopy}
                    variant={isCopied ? 'active' : 'default'}
                >
                    <span className="sr-only">Copy code</span>
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                    <span className="ml-2 font-lapsus">{copyCount}</span>
                </Button>
            </div>
        </Fragment>
    );
};
