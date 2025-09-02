"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'




const getErrorMessage = (error: string) => {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "Email already associated with another account"
    case "OAuthCallbackError":
      return "User denied authorization or configuration error"
    default:
      return "Something went wrong"
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const error = useSearchParams().get('error')


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/logoipsum.svg"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className='mb-4 text-left bg-accent'>
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
                <AlertDescription>
                  {getErrorMessage(error)}
                </AlertDescription>
              </Alert>
            )}
            <Button onClick={() => {
              setIsLoading(true)
              signIn('discord', { callbackUrl: "/dashboard" })
            }} size="lg" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : (
                <>
                  Continue with
                  <img src="/discord.svg" alt="Discord" className="inline-block w-6 h-6 text-white" />
                </>
              )}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          New to our platform?{' '}
          <Link href="/" className="text-primary hover:underline">
            Learn more
          </Link>
        </p>
      </div>
    </div>
  )
}
