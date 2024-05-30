import type { LaboratoryWork } from '@/lib/db/schema'
import { FlaskConical } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  value: LaboratoryWork
  url: string
}

export function LaboratoryWorkBlock({ value, url }: Props) {
  return (
    <div className="py-2">
      <div key={value.id} className="border border-muted rounded-lg p-4 flex items-center gap-5">
        <div className="flex flex-col gap-2 items-center">
          <FlaskConical size={30} />
          <p className="text-xs">
            {format(value.createdAt, 'dd/MM/yy')}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h4>{value.name}</h4>
            <p>{value.description}</p>
          </div>
          <Link href={`${url}/laboratory-work/${value.id}`}>
            <Button>
              Go to laboratory work
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
