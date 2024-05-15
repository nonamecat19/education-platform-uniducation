'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignIn() {
  return (
    <div className='space-y-3'>
      <p>Not signed in </p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  )
}
