import { faker } from '@faker-js/faker'
import { groups, NewGroupSubject, subjects } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'

export const generateGroupSubjectsRows = async (
  count: number,
): Promise<NewGroupSubject[]> => {
  const subjectsIds = await getEntityIds(subjects)
  const groupsIds = await getEntityIds(groups)

  return getSeed(count, () => ({
    subjectId: getRandomElementId(subjectsIds),
    groupId: getRandomElementId(groupsIds),
    hours: faker.number.int(100),
  }))
}
