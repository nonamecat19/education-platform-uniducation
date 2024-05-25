import { trpcSSR } from '@/lib/trpc/ssr'

export default async function StudentsPage() {
  const { student } = await trpcSSR.students.getCurrentStudent()

  console.log({ student })

  return (
    <div>
      <div>Name: {student.name}</div>
      <div>Surname: {student.surname}</div>
      <div>Patronymic: {student.patronymic}</div>
      <div>StudentID: {student.stuentId}</div>
    </div>
  )
}
