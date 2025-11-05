"use client";
import Hero from "./Hero";
import Languages from "./Languages";
import Works from "./Works";
import { useSession } from "next-auth/react";
const Home = () => {
  const { data: session } = useSession();
  if(!session?.user){
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-2xl  font-bold text-orange-400 text-center">Please sign in to view the content.</h1>
    </div>
  }
  return (
    <div className="bg-white">
      <div className="py-5 px-2 sm:py-5 sm:px-5">
        <Hero />
        <Languages />
        <Works />
      </div>
    </div>
  );
};

export default Home;
