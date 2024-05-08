import { getStudentById, getStudents } from "@/lib/api/students/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  studentIdSchema,
  insertStudentParams,
  updateStudentParams,
} from "@/lib/db/schema/students";
import { createStudent, deleteStudent, updateStudent } from "@/lib/api/students/mutations";

export const studentsRouter = router({
  getStudents: publicProcedure.query(async () => {
    return getStudents();
  }),
  getStudentById: publicProcedure.input(studentIdSchema).query(async ({ input }) => {
    return getStudentById(input.id);
  }),
  createStudent: publicProcedure
    .input(insertStudentParams)
    .mutation(async ({ input }) => {
      return createStudent(input);
    }),
  updateStudent: publicProcedure
    .input(updateStudentParams)
    .mutation(async ({ input }) => {
      return updateStudent(input.id, input);
    }),
  deleteStudent: publicProcedure
    .input(studentIdSchema)
    .mutation(async ({ input }) => {
      return deleteStudent(input.id);
    }),
});
