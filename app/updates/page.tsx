import { PageHeader } from '@/components/site/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { promises as fs } from 'fs';
import React from 'react';

async function UpdatePage() {
    const fileUrl = process.cwd() + '/public/data/rebalance.txt';
    const data = await fs.readFile(fileUrl, 'utf-8');
    return (
        <Container>
            <PageHeader title="Updates" subtitle="What's new in the game" />
            <Card className="prose max-w-none">
                <CardContent>
                    <pre className="whitespace-pre-wrap font-komika text-card-foreground/90">
                        {data}
                    </pre>
                </CardContent>
            </Card>
        </Container>
    );
}

export default UpdatePage;
