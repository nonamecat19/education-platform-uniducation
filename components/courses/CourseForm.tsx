'use client'

import { Course, NewCourseParams, insertCourseParams } from '@/lib/db/schema'
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

const CourseForm = ({
  course,
  closeModal,
}: {
  course?: Course
  closeModal?: () => void
}) => {
  const { data: groupSubjects } =
    trpcCSR.groupSubjects.getGroupSubjects.useQuery()
  const { data: teachers } = trpcCSR.teachers.getTeachers.useQuery()
  const editing = !!course?.id

  const router = useRouter()
  const utils = trpcCSR.useContext()

  const form = useForm<z.infer<typeof insertCourseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCourseParams),
    defaultValues: course ?? {
      groupSubjectId: '',
      teacherId: '',
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

    await utils.courses.getCourses.invalidate()
    router.refresh()
    if (closeModal) closeModal()
    toast.success(`Course ${action}d!`)
  }

  const { mutate: createCourse, isLoading: isCreating } =
    trpcCSR.courses.createCourse.useMutation({
      onSuccess: (res) => onSuccess('create'),
      // onError: (err) => onError('create', { error: err.message }),
    })

  const { mutate: updateCourse, isLoading: isUpdating } =
    trpcCSR.courses.updateCourse.useMutation({
      onSuccess: (res) => onSuccess('update'),
      // onError: (err) => onError('update', { error: err.message }),
    })

  const { mutate: deleteCourse, isLoading: isDeleting } =
    trpcCSR.courses.deleteCourse.useMutation({
      onSuccess: (res) => onSuccess('delete'),
      // onError: (err) => onError('delete', { error: err.message }),
    })

  const handleSubmit = (values: NewCourseParams) => {
    if (editing) {
      updateCourse({ ...values, id: course.id })
    } else {
      createCourse(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='groupSubjectId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Subject Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a group subject' />
                  </SelectTrigger>
                  <SelectContent>
                    {groupSubjects?.groupSubjects.map((groupSubject) => (
                      <SelectItem
                        key={groupSubject.id}
                        value={groupSubject.id.toString()}
                      >
                        {groupSubject?.subject?.name}{' '}{groupSubject?.group?.name}
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
          name='teacherId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a teacher' />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers?.teachers.map((teacher) => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id.toString()}
                      >
                        {teacher.name} {teacher.surname}
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
            onClick={() => deleteCourse({ id: course.id })}
          >
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default CourseForm
