'use client'

import { Student, NewStudentParams, insertStudentParams } from '@/lib/db/schema'
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

const StudentForm = ({
  student,
  closeModal,
}: {
  student?: Student
  closeModal?: () => void
}) => {
  const { data: groups } = trpcCSR.groups.getGroups.useQuery()
  const editing = !!student?.id

  const router = useRouter()
  const utils = trpcCSR.useContext()
  const { data: users } = trpcCSR.users.getUsers.useQuery()

  const form = useForm<any>({
    // resolver: zodResolver(insertStudentParams),
    defaultValues: student ?? {
      name: '',
      surname: '',
      patronymic: '',
      groupId: '',
      stuentId: '',
      userId: ''
    } as any,
  })

  const onSuccess = async (
    action: 'create' | 'update' | 'delete',
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error)
      return
    }

    await utils.students.getStudents.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Student ${action}d!`)
  }

  const { mutate: createStudent, isLoading: isCreating } =
    trpcCSR.students.createStudent.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateStudent, isLoading: isUpdating } =
    trpcCSR.students.updateStudent.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteStudent, isLoading: isDeleting } =
    trpcCSR.students.deleteStudent.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewStudentParams) => {
    if (editing) {
      updateStudent({ ...values, id: student.id })
    } else {
      createStudent(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
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
          name='surname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='patronymic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patronymic</FormLabel>
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
          name='groupId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
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
                        {group.name}
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
          name='stuentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stuent Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a user' />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.users?.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user?.name}{' '}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteStudent({ id: student.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default StudentForm
