
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SignUp } from '../lib/action'
import { signIn } from '@/auth'

export default function signup() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
  <CardHeader>
    <CardTitle>Sign Up</CardTitle>
    <CardDescription>Enter your Credentials</CardDescription>
  </CardHeader>
  <CardContent className="">
    <form action={SignUp} className="flex flex-col gap-4">
        <Input type="text" placeholder="Name" name="name"/>
        <Input type="email" placeholder="Email" name="email"/>
        <Input type="password" placeholder="Password" name="password"/>
        <Button type="submit">Sign Up</Button>
    </form>
    
  </CardContent>
  <CardFooter className='flex flex-col gap-4'>
    <span>or</span>
    <form action={async()=>{
        "use server"
        await signIn("google");
    }}>
        <Button type="submit" variant={'outline'}>Sign in with Google</Button>
    </form>
    <Link href="/login">
    Already have an account ? Login</Link>
  </CardFooter>
</Card>

    </div>
  )
}
