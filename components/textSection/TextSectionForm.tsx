'use client'

import {
  TextSection,
  NewTextSectionParams,
  insertTextSectionParams,
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
import { trpc } from '@/lib/trpc/client'
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

const TextSectionForm = ({
  textSection,
  closeModal,
}: {
  textSection?: TextSection
  closeModal?: () => void
}) => {
  const { data: units } = trpc.units.getUnits.useQuery()
  const editing = !!textSection?.id

  const router = useRouter()
  const utils = trpc.useContext()

  const form = useForm<z.infer<typeof insertTextSectionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTextSectionParams),
    defaultValues: textSection ?? {
      unitId: '',
      name: '',
      description: '',
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

    await utils.textSection.getTextSection.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Text Section ${action}d!`)
  }

  const { mutate: createTextSection, isLoading: isCreating } =
    trpc.textSection.createTextSection.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateTextSection, isLoading: isUpdating } =
    trpc.textSection.updateTextSection.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteTextSection, isLoading: isDeleting } =
    trpc.textSection.deleteTextSection.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewTextSectionParams) => {
    if (editing) {
      updateTextSection({ ...values, id: textSection.id })
    } else {
      createTextSection(values)
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
              <FormLabel>Unit Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a unit' />
                  </SelectTrigger>
                  <SelectContent>
                    {units?.units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.id}{' '}
                        {/* TODO: Replace with a field from the unit model */}
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
            onClick={() => deleteTextSection({ id: textSection.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default TextSectionForm
