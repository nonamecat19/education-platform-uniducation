import { trpcSSR } from '@/lib/trpc/ssr'
import { getUserAuth } from '@/lib/auth/utils'

export default async function TeacherPage() {
  const auth = await getUserAuth()
  console.log({ auth })

  const data = await trpcSSR.teachers.getTeacherById({
    id: '',
  })

  return (
    <div>
      <div>asdf</div>
    </div>
  )
}
