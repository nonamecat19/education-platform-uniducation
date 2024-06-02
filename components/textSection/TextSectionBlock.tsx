'use client'
import type { TextSection } from '@/lib/db/schema'
import { TextIcon } from 'lucide-react'
import { format } from 'date-fns'
import { EditElement } from '@/components/layout/EditElement'
import { trpcCSR } from '@/lib/trpc/client'
import { useRouter } from 'next/navigation'

interface Props {
  value: TextSection
  isEditable?: boolean
}

export function TextSectionBlock({ value, isEditable }: Props) {
  const router = useRouter()
  const { mutate: deleteTextSection, isLoading: deleteIsLoading } = trpcCSR.textSection.deleteTextSection.useMutation({
    onSuccess: () => {
      router.refresh()
    }
  })

  const content = (
    <div className="py-2">
      <div key={value?.id} className="border border-muted rounded-lg p-4 flex items-center gap-5">
        <div className="flex flex-col gap-2 items-center">
          <TextIcon size={30} />
          <p className="text-xs">
            {format(value?.createdAt, 'dd/MM/yy')}
          </p>
        </div>
        <div>
          <h4>{value?.name}</h4>
          <p>{value?.description}</p>
        </div>
      </div>
    </div>
  )

  if (!isEditable) {
    return content
  }

  const deleteHandler = () => {
    deleteTextSection({ id: value?.id })
  }

  return (
    <EditElement disableEdit deleteHandler={deleteHandler} deleteLoading={deleteIsLoading}>
      {content}
    </EditElement>
  )
}
