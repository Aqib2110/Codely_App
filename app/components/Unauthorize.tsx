"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
const Unauthorize = ({children}:{children:React.ReactNode}) => {
    const {data:session} = useSession();
    const [load, setload] = useState(false);
    const [author, setauthor] = useState(false);
    const router = useRouter();
   useEffect(() => {
    const path = window.location.pathname;
    if(!session?.user && path !== "/api/auth/signup")
   {
    setload(true);
   router.push("/api/auth/signin");
   return;
   }
    setload(true);
    setauthor(true);
   }, [])
   if(!load){
     return <div className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-2xl  font-bold text-orange-400 text-center">Loading...</h1>
    </div>
   }
   else if(!author){
return <div className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-2xl  font-bold text-orange-400 text-center">Please sign in to view the content.</h1>
    </div>
   }
   else{
    return <>{children}</>
   }
};

export default Unauthorize;
