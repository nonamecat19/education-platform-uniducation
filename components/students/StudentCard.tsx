import { Student } from '@/lib/db/schema'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Props {
  student: Student
}

export function StudentCard({student}: Props) {
  return (
    <div className="p-3 border border-muted ">
      <div className="flex gap-3">
        <div>
          <Avatar>
            <AvatarFallback>
              {student?.surname[0]}{student?.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          {student?.surname} {student?.name}<br/>{student?.patronymic}
        </div>
      </div>
    </div>
  )
}
