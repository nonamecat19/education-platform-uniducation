import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { TextSectionBlock } from '@/components/textSection/TextSectionBlock'
import { UnitBlock } from '@/components/courses/UnitBlock'
import { DescriptionBlock } from '@/components/courses/DescriptionBlock'
import { EditElement } from '@/components/layout/EditElement'
import { LaboratoryWorkBlock } from '@/components/laboratoryWorks/LaboratoryWorkBlock'
import { NoItems } from '@/components/layout/NoItems'
import { AddUnitButton } from '@/components/units/AddUnitButton'
import { AddSectionButton } from '@/components/units/AddSectionButton'

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
            <EditElement key={textSection.id}>
              <TextSectionBlock value={textSection} />
            </EditElement>
          ))}
          {unit.laboratoryWorks.map((laboratoryWork) => (
            <EditElement key={laboratoryWork.id}>
              <LaboratoryWorkBlock value={laboratoryWork} url={'/teacher'} />
            </EditElement>
          ))}
          <AddSectionButton unitId={unit.id}/>
          {/*  TODO: delete unit*/}
        </UnitBlock>
      ))}
      {units?.length === 0 && <NoItems/>}
      <div className="px-3">
        <AddUnitButton courseId={params.id} />
      </div>
    </div>
  )
}
