import { getCurrentRole, getUserAuth } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const { session } = await getUserAuth()

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=%2Fcomplete-register')
  }

  const role = await getCurrentRole()

  redirect(`/${role}`)
}
