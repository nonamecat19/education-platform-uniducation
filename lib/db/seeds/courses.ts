import { groupSubjects, NewCourse, teachers } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'

export const generateCoursesRows = async (
  count: number,
): Promise<NewCourse[]> => {
  const teacherIds = await getEntityIds(teachers)
  const groupSubjectIds = await getEntityIds(groupSubjects)

  return getSeed(count, () => ({
    groupSubjectId: getRandomElementId(groupSubjectIds),
    teacherId: getRandomElementId(teacherIds),
  }))
}
