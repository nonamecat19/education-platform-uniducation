import { getUserAuth } from '@/lib/auth/utils'
import { unstable_noStore } from 'next/cache'

export default async function Home() {
  unstable_noStore()
  const { session } = await getUserAuth()
  return (
    <main className='space-y-4'>
      {session ? (
        <div className='bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces flex gap-5'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={(session.user as any)?.image}
            alt="avatar"
            className="h-28 rounded-lg"
          />
          <div>
            <div>
              Name: {session.user.name}
            </div>
            <div>
              Email: {session.user.email}
            </div>
            <div>
              Id: {session.user.id}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
