import { trpcSSR } from '@/lib/trpc/ssr'
import Link from 'next/link'

export default async function Page() {

  const { courses } = await trpcSSR.teachers.getTeacherCourses()
  // TODO: populate

  return (
    <div>
      {
        courses.map((course) => {
          return (
            <div key={course.id}>
              {JSON.stringify(course)}
            </div>
          )
          // return (
          //   <Link
          //     href={`/teacher/groups/${group.id}`}
          //     key={group.id}
          //     className="p-2"
          //   >
          //     <div>
          //       Name: {group.name}
          //     </div>
          //     <div>
          //       Course: {group.course}
          //     </div>
          //   </Link>
          // )
        })
      }
    </div>
  )
}
