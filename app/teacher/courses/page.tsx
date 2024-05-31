import { trpcSSR } from '@/lib/trpc/ssr'
import { CourseCard } from '@/components/courses/CourseCard'
import { PageGrid } from '@/components/layout/PageGrid'
import Link from 'next/link'
import { NoItems } from '@/components/layout/NoItems'

export default async function Page() {
  const { courses } = await trpcSSR.teachers.getTeacherCourses()

  return (
    <div>
      <PageGrid>
        {courses.map((course) => {
          return (
            <Link href={`/teacher/courses/${course.id}`} key={course.id}>
              <CourseCard value={course} />
            </Link>
          )
        })}
        {courses.length || <NoItems/>}
      </PageGrid>
    </div>
  )
}
