import { getCourseById, getCourses, getStudentCourses } from '@/lib/api/courses/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
  courseIdSchema,
  insertCourseParams,
  updateCourseParams,
} from '@/lib/db/schema'
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from '@/lib/api/courses/mutations'

export const coursesRouter = router({
  getCourses: publicProcedure.query(async () => {
    return getCourses()
  }),
  getStudentCourses: publicProcedure.query(async () => {
    return getStudentCourses()
  }),
  getCourseById: publicProcedure
    .input(courseIdSchema)
    .query(async ({ input }) => {
      return getCourseById(input.id)
    }),
  createCourse: publicProcedure
    .input(insertCourseParams)
    .mutation(async ({ input }) => {
      return createCourse(input)
    }),
  updateCourse: publicProcedure
    .input(updateCourseParams)
    .mutation(async ({ input }) => {
      return updateCourse(input.id, input)
    }),
  deleteCourse: publicProcedure
    .input(courseIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourse(input.id)
    }),
})
