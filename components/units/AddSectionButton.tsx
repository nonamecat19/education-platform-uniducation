'use client'
import { UnitId } from '@/lib/db/schema'
import { trpcCSR } from '@/lib/trpc/client'
import { useForm } from 'react-hook-form'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UnitSections } from '@/lib/eunms'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  unitId: UnitId
}

export function AddSectionButton({ unitId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [type, setType] = useState<UnitSections.TextSection | UnitSections.LaboratoryWork>(UnitSections.TextSection)
  const router = useRouter()

  const { mutate: createTextSection, isLoading: isLoadingTextSection } = trpcCSR.textSection.createTextSection.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      router.refresh()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  const { mutate: createLaboratoryWork, isLoading: isLoadingLaboratoryWork } = trpcCSR.laboratoryWorks.createLaboratoryWork.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      router.refresh()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  const addSectionHandler = (values: any) => {
    if (type === UnitSections.TextSection) {
      createTextSection(values)
      return
    }
    createLaboratoryWork(values)
  }

  const changeTypeHandler = (value: any) => {
    setType(value)
  }

  const form = useForm<any>({
    defaultValues: {
      unitId
    },
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="bg-white py-2 px-5 rounded-md text-black">
          Add section
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Add section
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addSectionHandler)}>
            <div className="flex flex-col gap-5">
              <Tabs value={type} onValueChange={changeTypeHandler}>
                <TabsList className="grid w-full grid-cols-2 mt-2">
                  <TabsTrigger value={UnitSections.TextSection}>
                    Text
                  </TabsTrigger>
                  <TabsTrigger value={UnitSections.LaboratoryWork}>
                    Laboratory work
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <FormField
                control={form.control}
                name="name"
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
                name="description"
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

              {type === UnitSections.LaboratoryWork && (
                <>
                  <FormField
                    control={form.control}
                    name="order"
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
                    name="maxMark"
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
                    name="maxBonus"
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
                    name="penalty"
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
                </>
              )}

              <Button type="submit">
                {(isLoadingLaboratoryWork || isLoadingTextSection) ? 'Loading...' : 'Add section' }
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
