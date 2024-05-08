import { getTeacherById, getTeachers } from "@/lib/api/teachers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  teacherIdSchema,
  insertTeacherParams,
  updateTeacherParams,
} from "@/lib/db/schema/teachers";
import { createTeacher, deleteTeacher, updateTeacher } from "@/lib/api/teachers/mutations";

export const teachersRouter = router({
  getTeachers: publicProcedure.query(async () => {
    return getTeachers();
  }),
  getTeacherById: publicProcedure.input(teacherIdSchema).query(async ({ input }) => {
    return getTeacherById(input.id);
  }),
  createTeacher: publicProcedure
    .input(insertTeacherParams)
    .mutation(async ({ input }) => {
      return createTeacher(input);
    }),
  updateTeacher: publicProcedure
    .input(updateTeacherParams)
    .mutation(async ({ input }) => {
      return updateTeacher(input.id, input);
    }),
  deleteTeacher: publicProcedure
    .input(teacherIdSchema)
    .mutation(async ({ input }) => {
      return deleteTeacher(input.id);
    }),
});
