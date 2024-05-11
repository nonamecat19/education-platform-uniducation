'use client'
import { CompleteGroup } from '@/lib/db/schema/groups'
import { trpc } from '@/lib/trpc/client'
import GroupModal from './GroupModal'

export default function GroupList({ groups }: { groups: CompleteGroup[] }) {
  const { data: g } = trpc.groups.getGroups.useQuery(undefined, {
    initialData: { groups },
    refetchOnMount: false,
  })

  if (g.groups.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {g.groups.map((group) => (
        <Group group={group} key={group.id} />
      ))}
    </ul>
  )
}

const Group = ({ group }: { group: CompleteGroup }) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{group.name}</div>
      </div>
      <GroupModal group={group} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No groups
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new group.
      </p>
      <div className='mt-6'>
        <GroupModal emptyState={true} />
      </div>
    </div>
  )
}
