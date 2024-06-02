'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { UserRole } from '@/lib/eunms'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CompleteFormParams, completeRegisterFormParams } from '@/lib/contracts'
import { trpcCSR } from '@/lib/trpc/client'
import { useRouter } from 'next/navigation'

interface Props {
  userId: string
}

export function CompleteForm({ userId }: Props) {
  type FormRoles = UserRole.Student | UserRole.Teacher | UserRole.Admin

  const [role, setRole] = useState<FormRoles>(UserRole.Student)
  const router = useRouter()

  const { mutate, isLoading } = trpcCSR.users.completeUserRegisterForm.useMutation({
    onSuccess: () => {
      router.push(`/${role}`)
    },
  })

  const onRoleChange = (value: string) => {
    setRole(value as FormRoles)
  }
  const form = useForm<CompleteFormParams>({
    resolver: zodResolver(completeRegisterFormParams),
  })

  const handleSubmit = (values: CompleteFormParams) => {
    console.log({ values })
    mutate({
      ...values,
      role,
      userId,
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Complete registration</CardTitle>
            <CardDescription>We need some info about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <Tabs value={role} onValueChange={onRoleChange}>
              <FormLabel>Role</FormLabel>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value={UserRole.Student}>
                  Student
                </TabsTrigger>
                <TabsTrigger value={UserRole.Teacher}>
                  Teacher
                </TabsTrigger>
                <TabsTrigger value={UserRole.Admin}>
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-4">

              {
                [UserRole.Student, UserRole.Teacher].includes(role) && (
                  <>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
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
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="surname"
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
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="patronymic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Patronymic</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )
              }

              {
                [UserRole.Teacher].includes(role) && (
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )
              }
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {isLoading ? 'Loading... Please wait' : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
