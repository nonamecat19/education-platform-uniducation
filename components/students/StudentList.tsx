'use client'
import { CompleteStudent } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import StudentModal from './StudentModal'

export default function StudentList({
  students,
}: {
  students: CompleteStudent[]
}) {
  const { data: s } = trpcCSR.students.getStudents.useQuery(undefined, {
    initialData: { students },
    refetchOnMount: false,
  })

  if (s.students.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {s.students.map((student) => (
        <Student student={student} key={student.id} />
      ))}
    </ul>
  )
}

const Student = ({ student }: { student: CompleteStudent }) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{student.name}</div>
      </div>
      <StudentModal student={student} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No students
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new student.
      </p>
      <div className='mt-6'>
        <StudentModal emptyState={true} />
      </div>
    </div>
  )
}
