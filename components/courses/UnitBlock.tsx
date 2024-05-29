import { PropsWithChildren } from 'react'
import { Unit } from '@/lib/db/schema'

interface Props extends PropsWithChildren {
  value: Unit
}

export function UnitBlock({ children, value }: Props) {
  return (
    <div className="p-2">
      <div key={value.id} className="border border-muted rounded-xl py-2 px-4">
        <div className="py-2 px-1">
          <h2 className="font-bold">{value.name}</h2>
          <p className="font-light text-gray-300">{value.description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
