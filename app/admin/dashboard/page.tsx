import { getUserAuth } from '@/lib/auth/utils'
import { unstable_noStore } from 'next/cache'

export default async function Home() {
  unstable_noStore()
  const { session } = await getUserAuth()
  return (
    <main className='space-y-4'>
      {session ? (
        <pre className='bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces'>
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
    </main>
  )
}
