import PawskeyIcon from '@/components/icon/pawskey';
import { getUserPasskey } from '@/utils/supabase/auth/passkey';
import React from 'react';

import PasskeyMenu from './passkey-menu';

async function PasskeyList() {
    const data = await getUserPasskey();
    console.log(`🔵 PasskeyList`, { data });
    if (!data) {
        return <div>No passkeys found</div>;
    }
    const time = (date: string): string => {
        const now = new Date();
        const then = new Date(date);
        const diff = now.getTime() - then.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) {
            return 'today';
        }
        if (days === 1) {
            return 'yesterday';
        }
        return `${days} days ago`;
    };
    return (
        <ul className="text-card-foreground">
            {data.map((passkey) => (
                <li
                    key={passkey.credential_id}
                    className="flex items-center gap-6"
                >
                    <div className="flex-shrink-0">
                        <PawskeyIcon className="size-5" />
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row md:justify-between">
                        <div>
                            <div>
                                {passkey.friendly_name || 'Unnamed passkey'}
                            </div>
                            <div className="md:min-w-[200px]">
                                Connected {time(passkey.created_at || '')}
                            </div>
                        </div>
                        <div>
                            <PasskeyMenu passkey={passkey} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PasskeyList;
