import { trpcSSR } from '@/lib/trpc/ssr'
import { getCurrentUser } from '@/lib/api/users/queries'

export default async function StudentsPage() {
  const { student } = await trpcSSR.students.getCurrentStudent()
  const { user } = await getCurrentUser()

  if (!student || !user) {
    return (
      <div>Student not found</div>
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
          Name: {student?.name}
        </div>
        <div>
          Surname: {student?.surname}
        </div>
        <div>
          Patronymic: {student?.patronymic}
        </div>
        <div>
          Profession: {student?.stuentId}
        </div>
        <div>
          Email: {user.email}
        </div>
      </div>
    </div>
  )
}
