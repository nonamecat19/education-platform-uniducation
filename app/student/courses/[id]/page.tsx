import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { TextSectionBlock } from '@/components/textSection/TextSectionBlock'
import { UnitBlock } from '@/components/courses/UnitBlock'
import { DescriptionBlock } from '@/components/courses/DescriptionBlock'
import { NoItems } from '@/components/layout/NoItems'
import { LaboratoryWorkBlock } from '@/components/laboratoryWorks/LaboratoryWorkBlock'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function CourseIdPage({ params }: Params) {
  const { units, teacher, subject, groupSubject } = await trpcSSR.courses.getCourseById({
    id: params.id,
  })

  return (
    <div>
      <DescriptionBlock
        groupSubject={groupSubject}
        subject={subject}
        teacher={teacher}
      />
      {units?.map((unit) => (
        <UnitBlock key={unit.id} value={unit}>
          {unit.textSections.map((textSection) => (
            <TextSectionBlock
              isEditable
              key={textSection.id}
              value={textSection}
            />
          ))}
          {unit.laboratoryWorks.map((laboratoryWork) => (
            <LaboratoryWorkBlock
              key={laboratoryWork.id}
              value={laboratoryWork}
              url="/student"
            />
          ))}
        </UnitBlock>
      ))}
      {units?.length === 0 && <NoItems />}
    </div>
  )
}
