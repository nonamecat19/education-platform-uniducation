'use client'
import { CourseId, insertUnitParams, NewUnitParams } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
    courseId: CourseId
}

export function AddUnitButton({courseId}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  const { mutate } = trpcCSR.units.createUnit.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      router.refresh()
    },
    onError: () => {
      toast.error('Error')
    }
  })

  const addUnitHandler = (values: NewUnitParams) => {
    mutate(values)
  }

  const form = useForm<z.infer<typeof insertUnitParams>>({
    resolver: zodResolver(insertUnitParams),
    defaultValues: {
      courseId,
      name: '',
      description: '',
    },
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="bg-white py-2 px-5 rounded-md text-black">
          Add unit
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Add unit
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addUnitHandler)}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
              <Button type="submit">
                Add unit
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
