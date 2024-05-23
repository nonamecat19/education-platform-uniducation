import { checkUserRole } from '@/lib/utils'
import { useSession } from '@clerk/nextjs'

export default async function StudentsPage() {
  const { session } = useSession()
  const userRole = checkUserRole(session)
  console.log({ session, userRole })

  return <div>Students page</div>
}
