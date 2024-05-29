import { GroupSubject, Subject, Teacher } from '@/lib/types'

interface Props {
  teacher?: Teacher
  subject?: Subject
  groupSubject?: GroupSubject
}

export function DescriptionBlock({ teacher, subject, groupSubject }: Props) {
  return (
    <div className="p-2">
      <div className="border border-muted rounded-xl p-4">
        <h1 className="text-xl">
          {subject?.name}
        </h1>
        <h5 className="text-gray-200">
          {teacher?.name} {teacher?.surname} {teacher?.patronymic} <br/>
          Hours: {groupSubject?.hours}
        </h5>
      </div>
    </div>
  )
}
