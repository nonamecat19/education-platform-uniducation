import { LaboratoryWorkId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { NoItems } from '@/components/layout/NoItems'
import { format } from 'date-fns'
import { AddSubmittedLaboratoryWorkButton } from '@/components/laboratoryWorks/AddSubmittedLaboratoryWorkButton'

interface Props {
  params: {
    id: LaboratoryWorkId
  }
}

export default async function LaboratoryWork({ params }: Props) {
  const { laboratoryWork } = await trpcSSR.laboratoryWorks.getLaboratoryWorkById({ id: params?.id })

  if (!laboratoryWork) {
    return (
      <div>
        <NoItems />
      </div>
    )
  }

  return (
    <div className="px-5">
      <div className="border border-muted p-4 rounded-lg">
        <div>
          <div className="text-3xl">
            {laboratoryWork.name}
          </div>
          <p className="text-md">
            {laboratoryWork.description}
          </p>
        </div>
        <div className="mt-3">
          <div>
            Mark: (Max - {laboratoryWork.maxMark},
            Bonus - {laboratoryWork.maxBonus},
            Penalty - {laboratoryWork.penalty})
          </div>
          <div>
            Created: {format(laboratoryWork.createdAt, 'hh:mm dd/MM/yy')}
          </div>
          <div>
            Updated: {format(laboratoryWork.updatedAt, 'hh:mm dd/MM/yy')}
          </div>
        </div>
      </div>
      <div className="border border-muted p-4 rounded-lg flex flex-col gap-3 mt-3">
        <AddSubmittedLaboratoryWorkButton laboratoryWorkId={laboratoryWork.id}/>
      </div>
    </div>
  )
}
