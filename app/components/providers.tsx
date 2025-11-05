'use client'

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import {useRouter} from "next/navigation"
import { useEffect } from "react"
export default function SessionProviderWrapper({
  children,
  session
}: {
  children: React.ReactNode
  session?: Session | null
}) {
   const router = useRouter();
  useEffect(() => {
   const path = window.location.pathname;
   if(!session?.user && path !== "/api/auth/signup")
{
router.push("/api/auth/signin");
}
  }, [])
  
// if(!session?.user && window.location.pathname !== "/api/auth/signup")
// {
// router.push("/api/auth/signin");
// }
  return <SessionProvider session={session}>{children}</SessionProvider>
}
