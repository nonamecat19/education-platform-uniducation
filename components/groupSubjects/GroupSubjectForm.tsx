'use client'

import {
  GroupSubject,
  NewGroupSubjectParams,
  insertGroupSubjectParams,
} from '@/lib/db/schema/groupSubjects'
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

const GroupSubjectForm = ({
  groupSubject,
  closeModal,
}: {
  groupSubject?: GroupSubject
  closeModal?: () => void
}) => {
  const { data: subjects } = trpc.subjects.getSubjects.useQuery()
  const { data: groups } = trpc.groups.getGroups.useQuery()
  const editing = !!groupSubject?.id

  const router = useRouter()
  const utils = trpc.useContext()

  const form = useForm<z.infer<typeof insertGroupSubjectParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGroupSubjectParams),
    // @ts-ignore
    defaultValues: groupSubject ?? {
      subjectId: '',
      groupId: '',
      hours: 0,
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

    await utils.groupSubjects.getGroupSubjects.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Group Subject ${action}d!`)
  }

  const { mutate: createGroupSubject, isLoading: isCreating } =
    trpc.groupSubjects.createGroupSubject.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateGroupSubject, isLoading: isUpdating } =
    trpc.groupSubjects.updateGroupSubject.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteGroupSubject, isLoading: isDeleting } =
    trpc.groupSubjects.deleteGroupSubject.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewGroupSubjectParams) => {
    if (editing) {
      updateGroupSubject({ ...values, id: groupSubject.id })
    } else {
      createGroupSubject(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='subjectId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a subject' />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.subjects.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        {subject.id}{' '}
                        {/* TODO: Replace with a field from the subject model */}
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
          name='groupId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a group' />
                  </SelectTrigger>
                  <SelectContent>
                    {groups?.groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.id}{' '}
                        {/* TODO: Replace with a field from the group model */}
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
          name='hours'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours</FormLabel>
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
            onClick={() => deleteGroupSubject({ id: groupSubject.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default GroupSubjectForm
