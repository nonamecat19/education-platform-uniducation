import { trpcSSR } from '@/lib/trpc/ssr'
import { CourseCard } from '@/components/courses/CourseCard'
import { PageGrid } from '@/components/layout/PageGrid'
import Link from 'next/link'
import { NoItems } from '@/components/layout/NoItems'
import { Suspense } from 'react'
import Loading from '@/app/loading'

export default async function Page() {
  const { courses } = await trpcSSR.teachers.getTeacherCourses()

  return (
    <div>
      <PageGrid>
        <Suspense fallback={<Loading/>}>
          {courses.map((course) => {
            return (
              <Link href={`/teacher/courses/${course.id}`} key={course.id}>
                <CourseCard value={course} />
              </Link>
            )
          })}
          {courses.length === 0 && <NoItems/>}
        </Suspense>
      </PageGrid>
    </div>
  )
}
