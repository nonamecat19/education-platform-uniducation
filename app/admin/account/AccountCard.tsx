import { Card } from '@/components/ui/card'
import { ReactNode } from 'react'

interface AccountCardProps {
  params: {
    header: string
    description: string
    price?: number
  }
  children: ReactNode
}

export function AccountCard({ params, children }: AccountCardProps) {
  const { header, description } = params
  return (
    <Card>
      <div id='body' className='p-4 '>
        <h3 className='text-xl font-semibold'>{header}</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      {children}
    </Card>
  )
}

export function AccountCardBody({ children }: { children: ReactNode }) {
  return <div className='p-4'>{children}</div>
}

export function AccountCardFooter({
  description,
  children,
}: {
  children: ReactNode
  description: string
}) {
  return (
    <div
      className='bg-muted p-4 border dark:bg-card flex justify-between items-center rounded-b-lg'
      id='footer'
    >
      <p className='text-muted-foreground text-sm'>{description}</p>
      {children}
    </div>
  )
}
