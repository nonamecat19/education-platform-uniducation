'use client'

import {
  LaboratoryWork,
  NewLaboratoryWorkParams,
  insertLaboratoryWorkParams,
} from '@/lib/db/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpcCSR } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const LaboratoryWorkForm = ({
  laboratoryWork,
  closeModal,
}: {
  laboratoryWork?: LaboratoryWork
  closeModal?: () => void
}) => {
  const { data: units } = trpcCSR.units.getUnits.useQuery()
  const editing = !!laboratoryWork?.id

  const router = useRouter()
  const utils = trpcCSR.useContext()

  const form = useForm<z.infer<typeof insertLaboratoryWorkParams>>({
    resolver: zodResolver(insertLaboratoryWorkParams),
    // @ts-ignore
    defaultValues: laboratoryWork ?? {
      unitId: '',
      name: '',
      description: '',
      order: 0,
      maxMark: 0,
      maxBonus: 0,
      penalty: 0,
    },
  })

  const onSuccess = async (
    action: 'create' | 'update' | 'delete',
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error)
      return
    }

    await utils.laboratoryWorks.getLaboratoryWorks.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Laboratory Work ${action}d!`)
  }

  const { mutate: createLaboratoryWork, isLoading: isCreating } =
    trpcCSR.laboratoryWorks.createLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateLaboratoryWork, isLoading: isUpdating } =
    trpcCSR.laboratoryWorks.updateLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteLaboratoryWork, isLoading: isDeleting } =
    trpcCSR.laboratoryWorks.deleteLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewLaboratoryWorkParams) => {
    if (editing) {
      updateLaboratoryWork({ ...values, id: laboratoryWork.id })
    } else {
      createLaboratoryWork(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='unitId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a unit' />
                  </SelectTrigger>
                  <SelectContent>
                    {units?.units?.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.name}{' '}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='order'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='maxMark'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Mark</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='maxBonus'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Bonus</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='penalty'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penalty</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mr-1'
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? 'ing...' : 'e'}`
            : `Creat${isCreating ? 'ing...' : 'e'}`}
        </Button>
        {editing ? (
          <Button
            type='button'
            variant={'destructive'}
            onClick={() => deleteLaboratoryWork({ id: laboratoryWork.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default LaboratoryWorkForm
