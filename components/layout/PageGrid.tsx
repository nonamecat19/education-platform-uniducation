import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export function PageGrid({ children }: Props) {
  return <div className='flex gap-4 flex-wrap'>{children}</div>
}
