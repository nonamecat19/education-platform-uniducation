import UserSettings from './UserSettings'
import { checkAuth, getUserAuth } from '@/lib/auth/utils'
import { unstable_noStore } from 'next/cache'

export default async function Account() {
  unstable_noStore()
  await checkAuth()
  const { session } = await getUserAuth()

  return (
    <main>
      <h1 className='text-2xl font-semibold my-4'>Account</h1>
      <div className='space-y-4'>
        <UserSettings session={session} />
      </div>
    </main>
  )
}
