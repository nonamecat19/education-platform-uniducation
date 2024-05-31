import { trpcSSR } from '@/lib/trpc/ssr'
import Link from 'next/link'
import { GroupCard } from '@/components/groups/GroupCard'
import { PageGrid } from '@/components/layout/PageGrid'
import { NoItems } from '@/components/layout/NoItems'

export default async function Page() {
  const { groups } = await trpcSSR.teachers.getTeacherGroups()

  return (
    <div>
      <PageGrid>
        {groups.map((group) => {
          return (
            <Link
              href={`/teacher/groups/${group.id}`}
              key={group.id}
              className="p-2"
            >
              <GroupCard group={group} />
            </Link>
          )
        })}
        {groups?.length || <NoItems/>}
      </PageGrid>
    </div>
  )
}
