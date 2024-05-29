import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
}

export default async function AuthLayout({ children }: Props) {
  return (
    <div className="bg-muted h-screen pt-8">
      {children}
    </div>
  )
}
