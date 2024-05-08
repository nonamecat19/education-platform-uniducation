import { getLaboratoryWorkById, getLaboratoryWorks } from "@/lib/api/laboratoryWorks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  laboratoryWorkIdSchema,
  insertLaboratoryWorkParams,
  updateLaboratoryWorkParams,
} from "@/lib/db/schema/laboratoryWorks";
import { createLaboratoryWork, deleteLaboratoryWork, updateLaboratoryWork } from "@/lib/api/laboratoryWorks/mutations";

export const laboratoryWorksRouter = router({
  getLaboratoryWorks: publicProcedure.query(async () => {
    return getLaboratoryWorks();
  }),
  getLaboratoryWorkById: publicProcedure.input(laboratoryWorkIdSchema).query(async ({ input }) => {
    return getLaboratoryWorkById(input.id);
  }),
  createLaboratoryWork: publicProcedure
    .input(insertLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return createLaboratoryWork(input);
    }),
  updateLaboratoryWork: publicProcedure
    .input(updateLaboratoryWorkParams)
    .mutation(async ({ input }) => {
      return updateLaboratoryWork(input.id, input);
    }),
  deleteLaboratoryWork: publicProcedure
    .input(laboratoryWorkIdSchema)
    .mutation(async ({ input }) => {
      return deleteLaboratoryWork(input.id);
    }),
});
