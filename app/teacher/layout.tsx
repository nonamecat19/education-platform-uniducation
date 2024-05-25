import { PropsWithChildren } from 'react'
import { checkTeacherAuth } from '@/lib/auth/utils'

interface Props extends PropsWithChildren {
}

export default async function TeacherLayout({ children }: Props) {
  await checkTeacherAuth()

  return (
    <main>
      {children}
    </main>
  )
}
