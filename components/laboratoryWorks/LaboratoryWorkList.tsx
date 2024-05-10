'use client'
import { CompleteLaboratoryWork } from '@/lib/db/schema/laboratoryWorks'
import { trpc } from '@/lib/trpc/client'
import LaboratoryWorkModal from './LaboratoryWorkModal'

export default function LaboratoryWorkList({
  laboratoryWorks,
}: {
  laboratoryWorks: CompleteLaboratoryWork[]
}) {
  const { data: l } = trpc.laboratoryWorks.getLaboratoryWorks.useQuery(
    undefined,
    {
      initialData: { laboratoryWorks },
      refetchOnMount: false,
    },
  )

  if (l.laboratoryWorks.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {l.laboratoryWorks.map((laboratoryWork) => (
        <LaboratoryWork
          laboratoryWork={laboratoryWork}
          key={laboratoryWork.laboratoryWork.id}
        />
      ))}
    </ul>
  )
}

const LaboratoryWork = ({
  laboratoryWork,
}: {
  laboratoryWork: CompleteLaboratoryWork
}) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{laboratoryWork.laboratoryWork.courseId}</div>
      </div>
      <LaboratoryWorkModal laboratoryWork={laboratoryWork.laboratoryWork} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No laboratory works
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new laboratory work.
      </p>
      <div className='mt-6'>
        <LaboratoryWorkModal emptyState={true} />
      </div>
    </div>
  )
}
