import {
  getStudentSubmittedLaboratoryWorks,
  getSubmittedLaboratoryWorkById,
  getSubmittedLaboratoryWorks,
  getSubmittedLaboratoryWorksByLaboratoryWorkId,
} from '@/lib/api/submittedLaboratoryWork/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
  insertSubmittedLaboratoryWorkParams, laboratoryWorkIdSchema,
  submitLaboratoryWorkSchema,
  submittedLaboratoryWorkIdSchema,
  unitIdSchema,
  updateSubmittedLaboratoryWorkParams,
} from '@/lib/db/schema'
import {
  createSubmittedLaboratoryWork,
  deleteSubmittedLaboratoryWork,
  submitLaboratoryWork,
  updateSubmittedLaboratoryWork,
} from '@/lib/api/submittedLaboratoryWork/mutations'

export const submittedLaboratoryWorkRouter = router({
  getSubmittedLaboratoryWork: publicProcedure
    .query(async () => {
      return getSubmittedLaboratoryWorks()
    }),
  getSubmittedLaboratoryWorkById: publicProcedure
    .input(submittedLaboratoryWorkIdSchema)
    .query(async ({ input }) => {
      return getSubmittedLaboratoryWorkById(input.id)
    }),
  getStudentSubmittedLaboratoryWorks: publicProcedure
    .input(laboratoryWorkIdSchema)
    .query(async ({ input }) => {
      return getStudentSubmittedLaboratoryWorks(input.id)
    }),
  getSubmittedLaboratoryWorkByLaboratoryWorkId: publicProcedure
    .input(unitIdSchema)
    .query(async ({ input }) => {
      return getSubmittedLaboratoryWorksByLaboratoryWorkId(input.id)
    }),
  submitLaboratoryWork: publicProcedure
    .input(submitLaboratoryWorkSchema)
    .mutation(async ({ input }) => {
      return submitLaboratoryWork(input as any)
    }),
  createSubmittedLaboratoryWork: publicProcedure
    .input(insertSubmittedLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return createSubmittedLaboratoryWork(input)
    }),
  updateSubmittedLaboratoryWork: publicProcedure
    .input(updateSubmittedLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return updateSubmittedLaboratoryWork(input.id!, input)
    }),
  deleteSubmittedLaboratoryWork: publicProcedure
    .input(submittedLaboratoryWorkIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubmittedLaboratoryWork(input.id)
    }),
})
