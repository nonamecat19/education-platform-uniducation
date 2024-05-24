import { checkStudentAuth } from '@/lib/auth/utils'

export const dynamic = 'force-dynamic';

export default async function StudentsPage() {
  await checkStudentAuth()

  return <div>Students page</div>
}
