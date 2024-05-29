import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { TextSectionBlock } from '@/components/courses/TextSectionBlock'
import { UnitBlock } from '@/components/courses/UnitBlock'
import { DescriptionBlock } from '@/components/courses/DescriptionBlock'
import { EditElement } from '@/components/layout/EditElement'
import { Button } from '@/components/ui/button'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function CourseIdPage({ params }: Params) {
  const { units, course, teacher, groupSubject, subject } = await trpcSSR.courses.getCourseById({
    id: params.id,
  })

  const addSectionHandler = async () => {

  }

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
          <Button
            onClick={addSectionHandler}
            className="w-full"
          >
            +
          </Button>
        </UnitBlock>
      ))}
    </div>
  )
}
