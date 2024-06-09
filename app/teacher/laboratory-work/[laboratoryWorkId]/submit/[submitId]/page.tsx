import { getSubmittedLaboratoryWorkById } from '@/lib/api/submittedLaboratoryWork/queries'
import { getGroupById } from '@/lib/api/groups/queries'
import { SubmittedLaboratoryWorkStatus } from '@/lib/eunms'
import { getUserById } from '@/lib/api/users/queries'
import ReviewSubmitDialog from '@/components/submittedLaboratoryWork/ReviewSubmitDialog'

interface Props {
  params: {
    submitId: string
    laboratoryWorkId: string
  }
}

export default async function LaboratoryWorkSubmit({ params }: Props) {
  const { submittedLaboratoryWork, laboratoryWork, student } = await getSubmittedLaboratoryWorkById(params.submitId)
  const { group } = await getGroupById(student?.groupId!)
  const { user } = await getUserById(student?.userId!)

  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="border border-muted p-4 rounded-lg flex flex-col gap-3">
        <h1>
          {laboratoryWork?.name}
        </h1>
        <p>
          {laboratoryWork?.description}
        </p>
        <div>
          Max mark: {laboratoryWork?.maxBonus}<br/>
          Max bonus: {laboratoryWork?.maxBonus}<br/>
          Penalty: {laboratoryWork?.penalty}
        </div>
      </div>
      <div className="border border-muted p-4 rounded-lg flex flex-col gap-3">
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
        <div>
          Group: {group?.name}
        </div>
      </div>
      <div className="border border-muted p-4 rounded-lg flex flex-col gap-3">
        <div>
          <div>Student comment</div>
          <div>{submittedLaboratoryWork.studentComment ?? '-'}</div>
        </div>
        <div>
          <div>Your comment</div>
          <div>{submittedLaboratoryWork.teacherComment ?? '-'}</div>
        </div>
        <ReviewSubmitDialog submittedLaboratoryWorkId={submittedLaboratoryWork.id} />
      </div>
    </div>
  )
}
