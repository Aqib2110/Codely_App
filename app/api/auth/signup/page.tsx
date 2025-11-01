"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";
export default function SignUp() {
    const router = useRouter()
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await fetch("/api/signup",{
        method:"POST",
        headers:{
 "Conten-Type":"application/json",
        },
        body:JSON.stringify({name,email,password})
        })
   if(!res.ok){
    alert("signup failed");
    return;
   }
   alert("signup successfully")
   router.push("/api/auth/signin");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-gray-900/70 p-8  rounded-2xl shadow-lg w-[350px]">
        <center><h1 className="text-2xl mb-2 font-bold">Signup</h1></center>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}>
          <input
            name="name"
            type="name"
            placeholder="name"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="test@example.com"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2 rounded-md"
          >
           Create your account
          </button>
        </form>

        <div className="my-6 border-b border-gray-700 text-center ">
          <span className="bg-gray-900 px-2 text-gray-400  text-sm">or</span>
        </div>

        <button
          onClick={()=> signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md mb-3"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.5-4-1.5-.6-1.5-1.3-1.9-1.3-1.9-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1 .1.9 2.1.9 2.1.7 2.1 2.8 1.5 3.5 1.2.1-.7.4-1.5.8-1.9-2.7-.3-5.5-1.4-5.5-6.3 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 016 0c2.3-1.6 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.9-2.8 6-5.5 6.3.4.4.8 1.2.8 2.4v3.5c0 .3.2.7.8.6A12 12 0 0012 0z" />
          </svg>
          Continue with GitHub
        </button>

        <button
          onClick={()=> signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 py-2 rounded-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/api/auth/signin" className="text-indigo-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}