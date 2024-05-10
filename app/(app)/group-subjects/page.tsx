import GroupSubjectList from '@/components/groupSubjects/GroupSubjectList'
import NewGroupSubjectModal from '@/components/groupSubjects/GroupSubjectModal'
import { api } from '@/lib/trpc/api'

export default async function GroupSubjects() {
  const { groupSubjects } = await api.groupSubjects.getGroupSubjects.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Group Subjects</h1>
        <NewGroupSubjectModal />
      </div>
      <GroupSubjectList groupSubjects={groupSubjects} />
    </main>
  )
}
