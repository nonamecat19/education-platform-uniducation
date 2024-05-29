import { PropsWithChildren } from 'react'
import { checkTeacherAuth } from '@/lib/auth/utils'
import { Header } from '@/components/layout/Header'
import { HeaderLinks } from '@/lib/types'

const headerLinks: HeaderLinks = [
  {
    url: '/teacher',
    name: 'Main',
  },
  {
    url: '/teacher/courses',
    name: 'Courses',
  },
  {
    url: '/teacher/groups',
    name: 'Groups',
  },
]

interface Props extends PropsWithChildren {
}

export default async function TeacherLayout({ children }: Props) {
  await checkTeacherAuth()

  return (
    <main>
      <Header links={headerLinks} />
      {children}
    </main>
  )
}
