import { getSubjectById, getSubjects } from "@/lib/api/subjects/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subjectIdSchema,
  insertSubjectParams,
  updateSubjectParams,
} from "@/lib/db/schema/subjects";
import { createSubject, deleteSubject, updateSubject } from "@/lib/api/subjects/mutations";

export const subjectsRouter = router({
  getSubjects: publicProcedure.query(async () => {
    return getSubjects();
  }),
  getSubjectById: publicProcedure.input(subjectIdSchema).query(async ({ input }) => {
    return getSubjectById(input.id);
  }),
  createSubject: publicProcedure
    .input(insertSubjectParams)
    .mutation(async ({ input }) => {
      return createSubject(input);
    }),
  updateSubject: publicProcedure
    .input(updateSubjectParams)
    .mutation(async ({ input }) => {
      return updateSubject(input.id, input);
    }),
  deleteSubject: publicProcedure
    .input(subjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubject(input.id);
    }),
});
