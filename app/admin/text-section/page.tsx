import TextSectionList from '@/components/textSection/TextSectionList'
import NewTextSectionModal from '@/components/textSection/TextSectionModal'
import { api } from '@/lib/trpc/api'
import { unstable_noStore } from 'next/cache'

export default async function TextSection() {
  unstable_noStore()
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
