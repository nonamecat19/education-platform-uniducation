import { trpcSSR } from '@/lib/trpc/ssr'

export default async function TeacherPage() {
  const { teacher } = await trpcSSR.teachers.getCurrentTeacher()

  return (
    <div>
      Name: {teacher.name}
      Surname: {teacher.surname}
      Patronymic: {teacher.patronymic}
      Profession: {teacher.profession}
      <div>asdf</div>
    </div>
  )
}
