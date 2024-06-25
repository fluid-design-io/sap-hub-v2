import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

async function TutorialsList() {
  const supabase = createClient()
  const { data: tutorials } = await supabase
    .from('tutorials')
    .select('id, title, slug')
    .throwOnError()
  if (!tutorials || tutorials.length === 0) return <p>No tutorials found</p>
  return (
    <ul className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
      {tutorials.map(({ slug, title, id }: { slug: string; title: string; id: string }) => (
        <li key={id}>
          <Card>
            <CardContent className="group relative isolate w-full text-card-foreground">
              <div className="pointer-events-none min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-6">{title}</p>
                  <ArrowRight className="size-5 transition group-hover:translate-x-1" />
                </div>
              </div>
              <Link href={`/tutorials/${slug}`}>
                <div className="absolute -inset-2 z-[-1]" />
              </Link>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default TutorialsList
