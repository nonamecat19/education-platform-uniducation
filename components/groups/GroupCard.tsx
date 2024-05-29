import type { Group } from '@/lib/db/schema'

interface Props {
  group: Group
}

export function GroupCard({ group }: Props) {
  return (
    <div className="p-3 bg-white text-black rounded-lg">
      <div>
        {group.name}
      </div>
      <div>
        Course: {group.course}
      </div>
    </div>
  )
}
