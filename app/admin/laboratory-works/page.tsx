import LaboratoryWorkList from '@/components/laboratoryWorks/LaboratoryWorkList'
import NewLaboratoryWorkModal from '@/components/laboratoryWorks/LaboratoryWorkModal'
import { api } from '@/lib/trpc/api'
import { unstable_noStore } from 'next/cache'

export default async function LaboratoryWorks() {
  unstable_noStore()
  const { laboratoryWorks } = await api.laboratoryWorks.getLaboratoryWorks.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Laboratory Works</h1>
        <NewLaboratoryWorkModal />
      </div>
      <LaboratoryWorkList laboratoryWorks={laboratoryWorks} />
    </main>
  )
}
