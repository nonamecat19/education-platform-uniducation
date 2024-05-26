import { trpcSSR } from '@/lib/trpc/ssr'
import Link from 'next/link'

export default async function Page() {

  const { groups } = await trpcSSR.teachers.getTeacherGroups()

  return (
    <div>
      {
        groups.map((group) => {
          return (
            <Link
              href={`/teacher/groups/${group.id}`}
              key={group.id}
              className="p-2"
            >
              <div>
                Name: {group.name}
              </div>
              <div>
                Course: {group.course}
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}
