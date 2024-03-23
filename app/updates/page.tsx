import { PageHeader } from '@/components/site/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { promises as fs } from 'fs';

async function UpdatePage() {
    const fileUrl = process.cwd() + '/public/data/rebalance.txt';
    const data = await fs.readFile(fileUrl, 'utf-8');
    return (
        <Container>
            <PageHeader title="Updates" subtitle="What's new in the game" />
            <Card className="prose max-w-none prose-pre:bg-transparent prose-pre:font-komika prose-pre:text-card-foreground/90">
                <CardContent className="bg-card">
                    <pre className="whitespace-pre-wrap">{data}</pre>
                </CardContent>
            </Card>
        </Container>
    );
}

export default UpdatePage;
