
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

import { Login } from '../lib/action'
import { auth, signIn } from '@/auth'
import { redirect, useRouter } from 'next/navigation'


export default async function page() {
    const session = await auth();
    if(session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>Enter your Credentials</CardDescription>
  </CardHeader>
  <CardContent className="">
    <form action={async(formData)=>
    {
      "use server"
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if(!email || !password) throw new Error("Please provide proper credentials")
        const error = await Login(email,password);
        if(!error){
            console.log("Login successful")
        }
    }} className="flex flex-col gap-4">
        <Input type="email" placeholder="Email" name="email"/>
        <Input type="password" placeholder="Password" name="password"/>
        <Button type="submit">Login</Button>
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
    <Link href="/signup">
    Dont have an account ? SignUp</Link>
  </CardFooter>
</Card>

    </div>
  )
}
