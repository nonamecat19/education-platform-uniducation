import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { teachersRouter } from './teachers'
import { groupsRouter } from './groups'
import { studentsRouter } from './students'
import { subjectsRouter } from './subjects'
import { groupSubjectsRouter } from './groupSubjects'
import { coursesRouter } from './courses'
import { unitsRouter } from './units'
import { textSectionRouter } from './textSection'
import { laboratoryWorksRouter } from './laboratoryWorks'

export const appRouter = router({
  computers: computersRouter,
  teachers: teachersRouter,
  groups: groupsRouter,
  students: studentsRouter,
  subjects: subjectsRouter,
  groupSubjects: groupSubjectsRouter,
  courses: coursesRouter,
  units: unitsRouter,
  textSection: textSectionRouter,
  laboratoryWorks: laboratoryWorksRouter,
})

export type AppRouter = typeof appRouter
