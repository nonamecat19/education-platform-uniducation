import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { requireRoles } from '@/lib/auth/utils'

export default async function LandingPage() {

  const role = await getSession()
  console.log({role})
  await requireRoles(['student'])

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4'
            href='/sign-in'
          >
            Sign In
          </Link>
        </nav>
      </header>
    </div>
  )
}
