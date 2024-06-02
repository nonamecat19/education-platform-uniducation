'use client'
import { LaboratoryWorkId, NewUnitParams } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import { useForm } from 'react-hook-form'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  laboratoryWorkId: LaboratoryWorkId
}

export function AddSubmittedLaboratoryWorkButton({ laboratoryWorkId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  const { mutate, isLoading } = trpcCSR.submittedLaboratoryWork.submitLaboratoryWork.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      router.refresh()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  const addUnitHandler = (values: any) => {
    mutate({
      laboratoryWorkId,
      studentComment: values.studentComment,
    } as any)
  }

  const form = useForm<any>()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="bg-white py-2 px-5 rounded-md text-black">
          Submit work
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Submit work
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addUnitHandler)}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="studentComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isLoading ? 'Loading...' : 'Submit work'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
