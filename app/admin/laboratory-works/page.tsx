import LaboratoryWorkList from '@/components/laboratoryWorks/LaboratoryWorkList'
import NewLaboratoryWorkModal from '@/components/laboratoryWorks/LaboratoryWorkModal'
import { api } from '@/lib/trpc/api'

export default async function LaboratoryWorks() {
  const { laboratoryWorks } =
    await api.laboratoryWorks.getLaboratoryWorks.query()

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
