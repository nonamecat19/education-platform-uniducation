'use client'
import { trpc } from '@/lib/trpc/client'
import { PageGrid } from '@/components/layout/PageGrid'

export default function CoursesPage() {
  const { data } = trpc.courses.getCourses.useQuery()

  return (
    <PageGrid>
      {data?.courses?.map((course) => {
        return <div key={course.id}>{JSON.stringify(course)}</div>
      })}
    </PageGrid>
  )
}
