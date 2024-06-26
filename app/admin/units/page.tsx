import UnitList from '@/components/units/UnitList'
import NewUnitModal from '@/components/units/UnitModal'
import { api } from '@/lib/trpc/api'
import { unstable_noStore } from 'next/cache'

export default async function Units() {
  unstable_noStore()
  const { units } = await api.units.getUnits.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Units</h1>
        <NewUnitModal />
      </div>
      <UnitList units={units} />
    </main>
  )
}
