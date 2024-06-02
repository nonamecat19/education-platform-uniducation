import { LaboratoryWorkId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { NoItems } from '@/components/layout/NoItems'
import { format } from 'date-fns'
import { SubmittedLaboratoryWorkStatus } from '@/lib/eunms'

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

  const submittedLaboratoryWorks = await trpcSSR.submittedLaboratoryWork.getSubmittedLaboratoryWorkByLaboratoryWorkId({ id: laboratoryWork.id })

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
        {submittedLaboratoryWorks.map(({submittedLaboratoryWork, student, user}) => (
          <div
            key={submittedLaboratoryWork.id}
            className="border border-muted p-4 rounded-lg"
          >
            <div className="flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="rounded-lg size-14"
                alt="user avatar"
                src={user?.image!}
              />
              <div>
                <div>
                  {student?.name} {student?.surname}
                </div>
                <div>
                  {submittedLaboratoryWork?.status} - {submittedLaboratoryWork?.status === SubmittedLaboratoryWorkStatus.Graded && submittedLaboratoryWork?.mark}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
