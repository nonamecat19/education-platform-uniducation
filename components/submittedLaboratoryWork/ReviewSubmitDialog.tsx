'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import ReviewSubmitForm from '@/components/submittedLaboratoryWork/ReviewSubmitForm'
import { SubmittedLaboratoryWorkId } from '@/lib/db/schema'

interface Props {
  submittedLaboratoryWorkId: SubmittedLaboratoryWorkId
}

export default function ReviewSubmitDialog({ submittedLaboratoryWorkId }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="w-40 px-5 py-2 bg-white rounded-lg text-black">
          Review work
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review work</SheetTitle>
        </SheetHeader>
        <ReviewSubmitForm submittedLaboratoryWorkId={submittedLaboratoryWorkId} />
      </SheetContent>
    </Sheet>
  )
}
