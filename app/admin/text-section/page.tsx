import TextSectionList from '@/components/textSection/TextSectionList'
import NewTextSectionModal from '@/components/textSection/TextSectionModal'
import { api } from '@/lib/trpc/api'

export default async function TextSection() {
  const { textSection } = await api.textSection.getTextSection.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Text Section</h1>
        <NewTextSectionModal />
      </div>
      <TextSectionList textSection={textSection} />
    </main>
  )
}
