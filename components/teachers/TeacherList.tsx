'use client'
import { CompleteTeacher } from '@/lib/db/schema'
import { trpc } from '@/lib/trpc/client'
import TeacherModal from './TeacherModal'

export default function TeacherList({
  teachers,
}: {
  teachers: CompleteTeacher[]
}) {
  const { data: t } = trpc.teachers.getTeachers.useQuery(undefined, {
    initialData: { teachers },
    refetchOnMount: false,
  })

  if (t.teachers.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {t.teachers.map((teacher) => (
        <Teacher teacher={teacher} key={teacher.id} />
      ))}
    </ul>
  )
}

const Teacher = ({ teacher }: { teacher: CompleteTeacher }) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{teacher.name}</div>
      </div>
      <TeacherModal teacher={teacher} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No teachers
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new teacher.
      </p>
      <div className='mt-6'>
        <TeacherModal emptyState={true} />
      </div>
    </div>
  )
}
