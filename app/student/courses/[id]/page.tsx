import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { TextSectionBlock } from '@/components/courses/TextSectionBlock'
import { UnitBlock } from '@/components/courses/UnitBlock'
import { DescriptionBlock } from '@/components/courses/DescriptionBlock'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function CourseIdPage({ params }: Params) {
  const { units,  teacher, subject, groupSubject } = await trpcSSR.courses.getCourseById({
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
            <TextSectionBlock key={textSection.id} value={textSection} />
          ))}
        </UnitBlock>
      ))}
    </div>
  )
}
