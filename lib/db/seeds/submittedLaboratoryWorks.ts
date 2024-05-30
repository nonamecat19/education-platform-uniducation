import { getEntityIds, getRandomElement, getRandomElementId, getRandomInt, getSeed } from '@/lib/db/seed-utils'
import { faker } from '@faker-js/faker'
import { laboratoryWorks, NewSubmittedLaboratoryWork, students } from '@/lib/db/schema'
import { SubmittedLaboratoryWorkStatus } from '@/lib/eunms'

export const generateSubmittedLaboratoryWorksRows = async (
  count: number,
): Promise<NewSubmittedLaboratoryWork[]> => {
  const studentIds = await getEntityIds(students)
  const laboratoryWorkIds = await getEntityIds(laboratoryWorks)

  const statuses = [
    SubmittedLaboratoryWorkStatus.NotSubmitted,
    SubmittedLaboratoryWorkStatus.Submitted,
    SubmittedLaboratoryWorkStatus.Graded,
    SubmittedLaboratoryWorkStatus.Rejected
  ]

  return getSeed(count, () => ({
    studentId: getRandomElementId(studentIds),
    laboratoryWorkId: getRandomElementId(laboratoryWorkIds),
    status: getRandomElement(statuses),
    mark: getRandomInt(10, 100),
    studentComment: faker.commerce.productDescription(),
    teacherComment: faker.commerce.productDescription(),
  }))
}
