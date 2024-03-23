'use client';

import Modal from '@/components/site/intercept-modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function NotFoundPage() {
    const router = useRouter();
    return (
        <Modal title="404" description="Toy not found">
            <div className="flex justify-center">
                <Button asChild className="mx-auto mt-12">
                    <Button onClick={() => router.back()}>Go Back</Button>
                </Button>
            </div>
        </Modal>
    );
}

export default NotFoundPage;
