import Link from 'next/link'
import { getCurrentRole, getUserAuth } from '@/lib/auth/utils'
import SignOutBtn from '@/components/auth/SignOutBtn'
import { UserRole } from '@/lib/eunms'

export default async function LandingPage() {
  const { session } = await getUserAuth()

  const role = await getCurrentRole()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {role === UserRole.Student && (
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              href="/student"
            >
              Go to student page
            </Link>
          )}
          {role === UserRole.Admin && (
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              href="/admin/dashboard"
            >
              Go to admin page
            </Link>
          )}
          {role === UserRole.Teacher && (
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              href="/teacher"
            >
              Go to teacher page
            </Link>
          )}
          {!!session ? (
            <SignOutBtn />
          ) : (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/sign-in"
            >
              Sign In
            </Link>
          )}
        </nav>
      </header>
    </div>
  )
}
