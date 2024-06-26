'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function SignOutBtn() {
  return (
    <Button
      variant={'destructive'}
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign out
    </Button>
  )
}
