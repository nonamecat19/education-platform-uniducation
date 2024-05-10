import {
  getTextSectionById,
  getTextSection,
} from '@/lib/api/textSection/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
  textSectionIdSchema,
  insertTextSectionParams,
  updateTextSectionParams,
} from '@/lib/db/schema/textSection'
import {
  createTextSection,
  deleteTextSection,
  updateTextSection,
} from '@/lib/api/textSection/mutations'

export const textSectionRouter = router({
  getTextSection: publicProcedure.query(async () => {
    return getTextSection()
  }),
  getTextSectionById: publicProcedure
    .input(textSectionIdSchema)
    .query(async ({ input }) => {
      return getTextSectionById(input.id)
    }),
  createTextSection: publicProcedure
    .input(insertTextSectionParams)
    .mutation(async ({ input }) => {
      return createTextSection(input)
    }),
  updateTextSection: publicProcedure
    .input(updateTextSectionParams)
    .mutation(async ({ input }) => {
      return updateTextSection(input.id, input)
    }),
  deleteTextSection: publicProcedure
    .input(textSectionIdSchema)
    .mutation(async ({ input }) => {
      return deleteTextSection(input.id)
    }),
})
