import { publicProcedure, router } from '@/lib/server/trpc'
import { completeRegisterParams } from '@/lib/contracts'
import { getUsers } from '@/lib/api/users/queries'
import { completeUserRegisterForm } from '@/lib/api/users/mutations'

export const usersRouter = router({
  getUsers: publicProcedure
    .query(async () => {
      return getUsers()
    }),
  completeUserRegisterForm: publicProcedure
    .input(completeRegisterParams)
    .mutation(async ({ input }) => {
      return completeUserRegisterForm(input)
    }),
})
