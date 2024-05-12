'use client'

import { Unit, NewUnitParams, insertUnitParams } from '@/lib/db/schema'
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

const UnitForm = ({
  unit,
  closeModal,
}: {
  unit?: Unit
  closeModal?: () => void
}) => {
  const { data: courses } = trpc.courses.getCourses.useQuery()
  const editing = !!unit?.id

  const router = useRouter()
  const utils = trpc.useContext()

  const form = useForm<z.infer<typeof insertUnitParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertUnitParams),
    defaultValues: unit ?? {
      courseId: '',
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

    await utils.units.getUnits.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Unit ${action}d!`)
  }

  const { mutate: createUnit, isLoading: isCreating } =
    trpc.units.createUnit.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateUnit, isLoading: isUpdating } =
    trpc.units.updateUnit.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteUnit, isLoading: isDeleting } =
    trpc.units.deleteUnit.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewUnitParams) => {
    if (editing) {
      updateUnit({ ...values, id: unit.id })
    } else {
      createUnit(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='courseId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a course' />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.id}{' '}
                        {/* TODO: Replace with a field from the course model */}
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
            onClick={() => deleteUnit({ id: unit.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default UnitForm
