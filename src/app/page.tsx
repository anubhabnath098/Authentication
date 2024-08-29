import { auth } from "@/auth";
import Image from "next/image";
import {decode, encode} from "next-auth/jwt"
import {cookies} from "next/headers"
import Link from "next/link";
export default async function Home() {
  const session = await auth();
  const cookiess = cookies().get("authjs.session-token");
  
    const decodejwt = await decode({
      token: cookiess?.value,
      salt:cookiess?.name as string,
      secret:process.env.AUTH_SECRET as string,
    })
    console.log(session);
  return (
    <>
      <div className="flex flex-col justify-center align-middle h-dvh w-full">
        <Link href="/signin" className="text-center">Sign In</Link>
        <Link href="/login" className="text-center">Login</Link>
        {decodejwt&&(<p className="text-center">User Logged In: {decodejwt.name}</p>)}
      </div>
    </>
  );
}
