import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export default async function AppLayout({ children }: Props) {
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
