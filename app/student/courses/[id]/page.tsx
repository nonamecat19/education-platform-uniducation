import { CourseId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'

interface Params {
  params: {
    id: CourseId
  }
}

export default async function CourseIdPage({ params }: Params) {
  const { units, course, teacher, groupSubject } =
    await trpcSSR.courses.getCourseById({
      id: params.id,
    })
  return (
    <div>
      <div>
        {units?.map((unit) => (
          <div key={unit.id} className='border border-white p-5'>
            <h2>{unit.name}</h2>
            <p>{unit.description}</p>

            {unit.textSections.map((textSection) => (
              <div key={textSection.id} className='border border-white p-5'>
                <h4>{textSection.name}</h4>
                <p>{textSection.description}</p>
                <p>Created: {textSection.createdAt.toString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
