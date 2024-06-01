import { trpcSSR } from '@/lib/trpc/ssr'
import { getCurrentUser } from '@/lib/api/users/queries'

export default async function TeacherPage() {
  const { teacher } = await trpcSSR.teachers.getCurrentTeacher()
  const { user } = await getCurrentUser()

  if (!teacher || !user) {
    return (
      <div>Teacher not found</div>
    )
  }

  return (
    <div
      className="p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces flex gap-5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user?.image ?? ''}
        alt="avatar"
        className="h-28 rounded-lg"
      />
      <div>
        <div>
          Name: {teacher?.name}
        </div>
        <div>
          Surname: {teacher?.surname}
        </div>
        <div>
          Patronymic: {teacher?.patronymic}
        </div>
        <div>
          Profession: {teacher?.profession}
        </div>
        <div>
          Email: {user.email}
        </div>
      </div>
    </div>
  )
}
