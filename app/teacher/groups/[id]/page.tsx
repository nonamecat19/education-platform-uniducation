import { trpcSSR } from '@/lib/trpc/ssr'
import { CourseId } from '@/lib/db/schema'
import { StudentCard } from '@/components/students/StudentCard'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function GroupPage({ params }: Params) {
  const { group } = await trpcSSR.groups.getGroupById({ id: params.id })
  const { students } = await trpcSSR.students.getStudentsByGroupId({ id: params.id })

  return (
    <div>
      <div className="p-5">
        <h1 className="text-xl">
          {group?.name}
        </h1>
        <h3 className="text-gray-300">
          Course: {group?.course}
        </h3>
      </div>

      <div>
        {students.map((el) => {
          return <StudentCard key={el.id} student={el} />
        })}
      </div>
    </div>
  )
}
