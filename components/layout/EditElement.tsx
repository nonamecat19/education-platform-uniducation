import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import { EditIcon, Trash2Icon } from 'lucide-react'

interface Props extends PropsWithChildren {
  disableEdit?: boolean
  disableDelete?: boolean
  editHandler?: () => void
  deleteHandler?: () => void
}

export function EditElement({disableEdit = false, disableDelete = false, children, editHandler, deleteHandler}: Props) {
  return (
    <div className="relative">
      <div className="absolute top-4 right-2 flex gap-2 opacity-30 hover:opacity-100">
        {disableEdit || (
          <Button size='icon' onClick={editHandler}>
            <EditIcon/>
          </Button>
        )}
        {disableDelete || (
          <Button size='icon' onClick={deleteHandler}>
            <Trash2Icon/>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
