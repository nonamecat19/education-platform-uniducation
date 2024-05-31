import { Course } from '@/lib/types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Props {
  value: Course
  onCardClick?: () => void
  onTeacherClick?: () => void
}

export function CourseCard({ value, onCardClick, onTeacherClick }: Props) {
  let { teacher, groupSubject, id } = value
  return (
    <div className='w-80 h-20 bg-white flex flex-col justify-between p-3 rounded-lg'>
      <div className='text-black cursor-pointer' onClick={onCardClick}>
        {groupSubject?.subject?.name}
      </div>
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={onTeacherClick}
      >
        <Avatar className='size-7'>
          <AvatarFallback className='text-xs'>
            {teacher?.name[0]}
            {teacher?.surname[0]}
          </AvatarFallback>
        </Avatar>
        <span className='text-black'>
          {teacher?.name} {teacher?.surname}
        </span>
      </div>
    </div>
  )
}
