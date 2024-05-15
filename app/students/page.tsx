import { checkStudentAuth } from '@/lib/auth/utils'

export default async function StudentsPage() {
  await checkStudentAuth()

  return <div>Students page</div>
}
