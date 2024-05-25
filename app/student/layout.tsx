import { PropsWithChildren } from 'react'
import { checkStudentAuth } from '@/lib/auth/utils'
import Link from 'next/link'

interface Props extends PropsWithChildren {
}

export default async function StudentLayout({ children }: Props) {
  await checkStudentAuth()

  return (
    <main>
      <header className="flex gap-5">
        <Link href="/student">
          Main
        </Link>
        <Link href="/student/courses">
          Courses
        </Link>
      </header>
      {children}
    </main>
  )
}
