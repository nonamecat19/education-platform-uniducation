import {
  getSubmittedLaboratoryWorkById,
  getSubmittedLaboratoryWorks,
  getSubmittedLaboratoryWorksByLaboratoryWorkId,
} from '@/lib/api/submittedLaboratoryWork/queries'
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  submittedLaboratoryWorkIdSchema,
  insertSubmittedLaboratoryWorkParams,
  updateSubmittedLaboratoryWorkParams, unitIdSchema,
} from '@/lib/db/schema'
import { createSubmittedLaboratoryWork, deleteSubmittedLaboratoryWork, updateSubmittedLaboratoryWork } from "@/lib/api/submittedLaboratoryWork/mutations";

export const submittedLaboratoryWorkRouter = router({
  getSubmittedLaboratoryWork: publicProcedure.query(async () => {
    return getSubmittedLaboratoryWorks();
  }),
  getSubmittedLaboratoryWorkById: publicProcedure.input(submittedLaboratoryWorkIdSchema).query(async ({ input }) => {
    return getSubmittedLaboratoryWorkById(input.id);
  }),
  getSubmittedLaboratoryWorkByLaboratoryWorkId: publicProcedure.input(unitIdSchema).query(async ({ input }) => {
    return getSubmittedLaboratoryWorksByLaboratoryWorkId(input.id);
  }),
  createSubmittedLaboratoryWork: publicProcedure
    .input(insertSubmittedLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return createSubmittedLaboratoryWork(input);
    }),
  updateSubmittedLaboratoryWork: publicProcedure
    .input(updateSubmittedLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return updateSubmittedLaboratoryWork(input.id, input);
    }),
  deleteSubmittedLaboratoryWork: publicProcedure
    .input(submittedLaboratoryWorkIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubmittedLaboratoryWork(input.id);
    }),
});
