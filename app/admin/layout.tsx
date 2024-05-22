import { checkAuth } from '@/lib/auth/utils'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'
// import { seed } from '@/lib/db/seed'
export default async function AppLayout({ children }: { children: ReactNode }) {
  // await seed()
  await checkAuth()

  return (
    <main>
      <div className='flex h-screen'>
        <Sidebar />
        <main className='flex-1 md:p-8 pt-2 p-8 overflow-y-auto'>
          <Navbar />
          {children}
        </main>
      </div>
      <Toaster richColors />
    </main>
  )
}
