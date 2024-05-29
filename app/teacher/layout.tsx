import { PropsWithChildren } from 'react'
import { checkTeacherAuth } from '@/lib/auth/utils'
import Link from 'next/link'

interface Props extends PropsWithChildren {
}

export default async function TeacherLayout({ children }: Props) {
  await checkTeacherAuth()

  return (
    <main>
      <nav className="flex gap-5 p-2">
        <Link href="/teacher">
          Main
        </Link>
        <Link href="/teacher/courses">
          Courses
        </Link>
        <Link href="/teacher/groups">
          Groups
        </Link>
      </nav>
      {children}
    </main>
  )
}
