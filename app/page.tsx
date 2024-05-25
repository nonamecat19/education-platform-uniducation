import Link from 'next/link'
import { getUserAuth } from '@/lib/auth/utils'
import SignOutBtn from '@/components/auth/SignOutBtn'

export default async function LandingPage() {
  const { session } = await getUserAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/student"
          >
            Student
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/admin/dashboard"
          >
            Admin
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/teacher"
          >
            Teacher
          </Link>
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
