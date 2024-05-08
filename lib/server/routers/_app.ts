import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { teacherRouter } from "./teacher";
import { teachersRouter } from "./teachers";
import { groupsRouter } from "./groups";
import { studentsRouter } from "./students";
import { subjectsRouter } from "./subjects";
import { groupSubjectsRouter } from "./groupSubjects";
import { coursesRouter } from "./courses";
import { unitsRouter } from "./units";
import { textSectionRouter } from "./textSection";

export const appRouter = router({
  computers: computersRouter,
  teacher: teacherRouter,
  teachers: teachersRouter,
  groups: groupsRouter,
  students: studentsRouter,
  subjects: subjectsRouter,
  groupSubjects: groupSubjectsRouter,
  courses: coursesRouter,
  units: unitsRouter,
  textSection: textSectionRouter,
});

export type AppRouter = typeof appRouter;
