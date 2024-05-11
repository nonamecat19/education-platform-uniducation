import GroupList from '@/components/groups/GroupList'
import NewGroupModal from '@/components/groups/GroupModal'
import { api } from '@/lib/trpc/api'
import { unstable_noStore } from 'next/cache'

export default async function Groups() {
  unstable_noStore()
  const { groups } = await api.groups.getGroups.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Groups</h1>
        <NewGroupModal />
      </div>
      <GroupList groups={groups} />
    </main>
  )
}
