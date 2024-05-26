import { CompleteForm } from '@/components/completeRegister/CompleteForm'
import { getCurrentUser } from '@/lib/api/users/queries'
import { redirect } from 'next/navigation'

export default async function CompleteRegisterPage() {
  const { user } = await getCurrentUser()
  if (user.role) {
    redirect(`/${user.role}`);
  }

  return (
    <CompleteForm userId={user.id} />
  )
}
