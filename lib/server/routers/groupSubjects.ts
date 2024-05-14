import {
  getGroupSubjectById,
  getGroupSubjects,
} from '@/lib/api/groupSubjects/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
  groupSubjectIdSchema,
  insertGroupSubjectParams,
  updateGroupSubjectParams,
} from '@/lib/db/schema'
import {
  createGroupSubject,
  deleteGroupSubject,
  updateGroupSubject,
} from '@/lib/api/groupSubjects/mutations'

export const groupSubjectsRouter = router({
  getGroupSubjects: publicProcedure.query(async () => {
    return getGroupSubjects()
  }),
  getGroupSubjectById: publicProcedure
    .input(groupSubjectIdSchema)
    .query(async ({ input }) => {
      return getGroupSubjectById(input.id)
    }),
  createGroupSubject: publicProcedure
    .input(insertGroupSubjectParams)
    .mutation(async ({ input }) => {
      return createGroupSubject(input)
    }),
  updateGroupSubject: publicProcedure
    .input(updateGroupSubjectParams)
    .mutation(async ({ input }) => {
      return updateGroupSubject(input.id, input)
    }),
  deleteGroupSubject: publicProcedure
    .input(groupSubjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteGroupSubject(input.id)
    }),
})
