import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { TextSectionBlock } from '@/components/textSection/TextSectionBlock'
import { UnitBlock } from '@/components/courses/UnitBlock'
import { DescriptionBlock } from '@/components/courses/DescriptionBlock'
import { LaboratoryWorkBlock } from '@/components/laboratoryWorks/LaboratoryWorkBlock'
import { NoItems } from '@/components/layout/NoItems'
import { AddUnitButton } from '@/components/units/AddUnitButton'
import { AddSectionButton } from '@/components/units/AddSectionButton'
import { DeleteUnitButton } from '@/components/units/DeleteUnitButton'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function CourseIdPage({ params }: Params) {
  const { units, course, teacher, groupSubject, subject } = await trpcSSR.courses.getCourseById({
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
              isEditable
              key={laboratoryWork.id}
              value={laboratoryWork}
              url={'/teacher'}
            />
          ))}
          <div className="flex gap-2">
            <AddSectionButton unitId={unit.id} />
            <DeleteUnitButton unitId={unit.id} disabled={unit.laboratoryWorks.length !== 0 || unit.textSections.length !== 0}/>
          </div>
        </UnitBlock>
      ))}
      {units?.length === 0 && <NoItems />}
      <div className="px-3">
        <AddUnitButton courseId={params.id} />
      </div>
    </div>
  )
}
