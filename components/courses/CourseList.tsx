'use client'
import { CompleteCourse } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import CourseModal from './CourseModal'

export default function CourseList({ courses }: { courses: CompleteCourse[] }) {
  const { data: c } = trpcCSR.courses.getCourses.useQuery(undefined, {
    initialData: { courses },
    refetchOnMount: false,
  })

  if (c.courses.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {c.courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </ul>
  )
}

const Course = ({ course }: { course: CompleteCourse }) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{course.groupSubjectId}</div>
      </div>
      <CourseModal course={course} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No courses
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new course.
      </p>
      <div className='mt-6'>
        <CourseModal emptyState={true} />
      </div>
    </div>
  )
}
