import AuthButton from '@/components/auth-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function LandingPage() {
  return (
    <div>
        <Link href="/auth/login">Login</Link>
    </div>
  )
}

export default LandingPage