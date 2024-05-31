'use client'
import { trpcCSR } from '@/lib/trpc/client'
import { PageGrid } from '@/components/layout/PageGrid'
import { CourseCard } from '@/components/courses/CourseCard'
import { useRouter } from 'next/navigation'
import { CourseId, TeacherId } from '@/lib/db/schema'
import { NoItems } from '@/components/layout/NoItems'

export default function CoursesPage() {
  const { data } = trpcCSR.courses.getStudentCourses.useQuery()
  const router = useRouter()

  const courseClickHandler = (id: CourseId | undefined) => {
    if (!id) {
      return
    }
    router.push(`/student/courses/${id}`)
  }

  const teacherClickHandler = (id: TeacherId | undefined) => {
    if (!id) {
      return
    }
    router.push(`/student/teachers/${id}`)
  }

  return (
    <PageGrid>
      {data?.courses?.map((course) => {
        return (
          <div key={course.id}>
            <CourseCard
              value={course}
              onCardClick={() => courseClickHandler(course.id)}
              onTeacherClick={() => teacherClickHandler(course?.teacher?.id)}
            />
          </div>
        )
      })}
    </PageGrid>
  )
}
