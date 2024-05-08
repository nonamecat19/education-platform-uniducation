import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { teacherRouter } from "./teacher";
import { teachersRouter } from "./teachers";
import { groupsRouter } from "./groups";
import { studentsRouter } from "./students";

export const appRouter = router({
  computers: computersRouter,
  teacher: teacherRouter,
  teachers: teachersRouter,
  groups: groupsRouter,
  students: studentsRouter,
});

export type AppRouter = typeof appRouter;
