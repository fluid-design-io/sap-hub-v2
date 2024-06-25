import { Skeleton } from '@/components/ui/skeleton'
import { PER_PAGE } from '@/lib/constants'
import { fetchPacks } from '@/utils/supabase/pack/fetch-packs'
import { MessageCircleDashedIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Fragment } from 'react'

import { Tables } from '@/types/database'
import SitePagination from '../pagination'
import { PackListItem } from './pack-list-item'

const CreatePack = dynamic(() => import('@/components/site/pack/pack-editor'), {
  loading: () => <Loading />,
})

const Loading = () => <Skeleton className="h-[100px] w-full max-w-3xl rounded-lg bg-foreground/5" />

type PackListProps = {
  searchParams?: {
    page?: string
    filter?: string
  }
  userId?: string
}

async function PackList({ searchParams, userId }: PackListProps) {
  const { data, total } = await fetchPacks(searchParams, userId)
  const totalPages = Math.ceil(total / PER_PAGE)
  const currentPage = Math.min(Number(searchParams?.page) || 1, totalPages)
  if (data?.length === 0 || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <MessageCircleDashedIcon className="size-12 text-primary-foreground" />
        <p>No packs found</p>
        <CreatePack className="pr-0" />
      </div>
    )
  }
  return (
    <Fragment>
      <ul className="relative z-[1] flex w-full max-w-3xl flex-col gap-8">
        {data.map((pack: Tables<'packs'>) => (
          <PackListItem key={pack.id} pack={pack} />
        ))}
      </ul>
      <SitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={{
          filter: searchParams?.filter || '',
        }}
      />
    </Fragment>
  )
}

export default PackList
