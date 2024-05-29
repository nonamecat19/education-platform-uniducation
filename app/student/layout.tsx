import { PropsWithChildren } from 'react'
import { checkStudentAuth } from '@/lib/auth/utils'
import { Header } from '@/components/layout/Header'
import { HeaderLinks } from '@/lib/types'

const headerLinks: HeaderLinks = [
  {
    url: '/student',
    name: 'Main'
  },
  {
    url: '/student/courses',
    name: 'Courses'
  }
]

interface Props extends PropsWithChildren {
}

export default async function StudentLayout({ children }: Props) {
  await checkStudentAuth()

  return (
    <main>
      <Header links={headerLinks}/>
      {children}
    </main>
  )
}
