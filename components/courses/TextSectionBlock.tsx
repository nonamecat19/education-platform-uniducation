import type { TextSection } from '@/lib/db/schema'
import { TextIcon } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  value: TextSection
}

export function TextSectionBlock({ value }: Props) {
  return (
    <div className="py-2">
      <div key={value.id} className="border border-muted rounded-lg p-4 flex items-center gap-5">
        <div className="flex flex-col gap-2 items-center">
          <TextIcon size={30} />
          <p className="text-xs">
            {format(value.createdAt, 'dd/MM/yy')}
          </p>
        </div>
        <div>
          <h4>{value.name}</h4>
          <p>{value.description}</p>
        </div>
      </div>
    </div>
  )
}
