import { trpcSSR } from '@/lib/trpc/ssr'

export default async function StudentsPage() {
  const { student } = await trpcSSR.students.getCurrentStudent()

  if (!student) {
    return (
      <div>Student not found</div>
    )
  }

  return (
    <div>
      <div>Name: {student?.name}</div>
      <div>Surname: {student?.surname}</div>
      <div>Patronymic: {student?.patronymic}</div>
      <div>StudentID: {student?.stuentId}</div>
    </div>
  )
}
