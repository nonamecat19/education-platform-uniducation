import { db } from '@/lib/db'
import {
  changeUserRoleParams,
  ChangeUserRoleParams,
  completeRegisterParams,
  CompleteRegisterParams,
} from '@/lib/contracts'
import { UserRole } from '@/lib/eunms'
import { students, teachers, users } from '@/lib/db/schema'
import { nanoid } from '@/lib/utils'
import { getUserById } from '@/lib/api/users/queries'
import { setRoleByEmail } from '@/lib/redis'
import { eq } from 'drizzle-orm'

export const completeUserRegisterForm = async (form: CompleteRegisterParams) => {
  const value = completeRegisterParams.parse(form)
  const { user } = await getUserById(form.userId)
  try {
    switch (value.role) {
      case UserRole.Student: {
        await db.insert(students).values({
          name: form.name,
          surname: form.surname,
          patronymic: form.patronymic,
          stuentId: nanoid(8),
          groupId: null,
          userId: form.userId,
        })
        await setRoleByEmail(user.email, form.role)
        await changeUserRole({userId: form.userId, role: form.role})
        return
      }
      case UserRole.Teacher: {
        await db.insert(teachers).values({
          name: form.name,
          surname: form.surname,
          patronymic: form.patronymic,
          profession: form.profession,
          userId: form.userId,
        })
        await setRoleByEmail(user.email, form.role)
        await changeUserRole({userId: form.userId, role: form.role})
        return
      }
      default: {
        throw new Error(`Role ${value.role} is not valid`)
      }
    }

  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const changeUserRole = async (params: ChangeUserRoleParams) => {
  const { userId, role } = changeUserRoleParams.parse(params)
  await db
    .update(users)
    .set({ role })
    .where(eq(users.id, userId))
}
