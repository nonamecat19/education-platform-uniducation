import { redirect } from 'next/navigation'

export default function AdminRootPage () {
  redirect('/admin/dashboard')
}
