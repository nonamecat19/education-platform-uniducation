import { z } from 'zod'
import { UserRole } from '@/lib/eunms'

export const completeRegisterFormParams = z.object({
  name: z.string(),
  surname: z.string(),
  patronymic: z.string().optional(),
  profession: z.string().optional(),
})

export type CompleteFormParams = z.infer<typeof completeRegisterFormParams>

export const completeRegisterParams = completeRegisterFormParams.extend({
  role: z.nativeEnum(UserRole),
  userId: z.string(),
})

export type CompleteRegisterParams = z.infer<typeof completeRegisterParams>

export const changeUserRoleParams = z.object({
  userId: z.string(),
  role: z.nativeEnum(UserRole),
})

export type ChangeUserRoleParams = z.infer<typeof changeUserRoleParams>
