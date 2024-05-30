import { LaboratoryWorkId } from '@/lib/db/schema'
import { trpcSSR } from '@/lib/trpc/ssr'
import { RenderJSON } from '@/components/utils/RenderJSON'

interface Props {
  params: {
    id: LaboratoryWorkId
  }
}

export default async function LaboratoryWork({ params }: Props) {

  const { laboratoryWork } = await trpcSSR.laboratoryWorks.getLaboratoryWorkById({ id: params?.id })

  return (
    <div>
      <RenderJSON json={laboratoryWork}/>
    </div>
  )
}
