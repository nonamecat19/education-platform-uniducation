import StudentList from '@/components/students/StudentList'
import NewStudentModal from '@/components/students/StudentModal'
import { api } from '@/lib/trpc/api'
import { checkAuth } from '@/lib/auth/utils'
import { unstable_noStore } from 'next/cache'

export default async function Students() {
  unstable_noStore()
  await checkAuth()
  const { students } = await api.students.getStudents.query()

  return (
    <main>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Students</h1>
        {/*<NewStudentModal />*/}
      </div>
      <StudentList students={students} />
    </main>
  )
}
