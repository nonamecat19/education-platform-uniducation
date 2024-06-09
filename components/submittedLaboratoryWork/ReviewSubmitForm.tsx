'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmittedLaboratoryWorkId, UpdateSubmittedLaboratoryWorkParams } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
  submittedLaboratoryWorkId: SubmittedLaboratoryWorkId
}

export default function ReviewSubmitForm({ submittedLaboratoryWorkId }: Props) {
  const form = useForm()

  const router = useRouter()
  const utils = trpcCSR.useContext()

  const { mutate, isLoading } = trpcCSR.submittedLaboratoryWork.updateSubmittedLaboratoryWork.useMutation({
    onSuccess: async () => {
      await utils.courses.getCourses.invalidate()
      router.refresh()
      toast.success(`Course submitted!`)
    },
  })

  const handleSubmit = (values: any) => {
    console.log({
      ...values,
      id: submittedLaboratoryWorkId,
    })
    mutate({
      ...values,
      id: submittedLaboratoryWorkId,
    } as UpdateSubmittedLaboratoryWorkParams)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2 mt-4">
        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mark</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
        >
          {`Submit${isLoading ? 'ing...' : ''}`}
        </Button>
      </form>
    </Form>
  )
}
