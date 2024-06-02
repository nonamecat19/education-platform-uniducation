'use client'
import { UnitId } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  unitId: UnitId
  disabled?: boolean
}

export function DeleteUnitButton({ unitId, disabled = false }: Props) {
  const router = useRouter()
  const { mutate, isLoading } = trpcCSR.units.deleteUnit.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  })

  function deleteUnitHandler() {
    mutate({ id: unitId })
  }

  return (
    <Button
      variant="destructive"
      disabled={disabled}
      onClick={deleteUnitHandler}
    >
      {isLoading ? 'Loading...' : 'Delete unit'}
    </Button>
  )
}
