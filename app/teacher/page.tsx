import { trpcSSR } from '@/lib/trpc/ssr'

export default async function TeacherPage() {
  const { teacher } = await trpcSSR.teachers.getCurrentTeacher()

  if (!teacher) {
    return (
      <div>Teacher not found</div>
    )
  }

  return (
    <div>
      Name: {teacher?.name}
      Surname: {teacher?.surname}
      Patronymic: {teacher?.patronymic}
      Profession: {teacher?.profession}
      <div>asdf</div>
    </div>
  )
}
