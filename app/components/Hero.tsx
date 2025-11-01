"use client";
import React from 'react'
import HeroEditor from './HeroEditor'
import { useRouter } from 'next/navigation';
const Hero = () => {
  const router = useRouter();
  return (
    <div className=' text-black'>

 <div className='flex flex-col md:flex-row justify-between gap-0 md:gap-10'>

   

     <div className='md:w-1/2 w-full flex flex-col'>
         <div className=''>
        <h1 className='text-5xl leading-snug text-center md:text-start font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent'>Code, Run, and Collaborate — Instantly in Your Browser.</h1>
        <p className='text-gray-600 text-center md:text-start leading-normal text-xl'>Codely lets you build and execute code in seconds. No setup, no installs — just open your browser and start creating.</p>
      </div>

     
    <div className='py-5 w-full flex flex-col md:flex-row md:justify-start justify-center md:items-start items-center gap-5 sm:gap-3 md:w-auto'>
    <button className='bg-orange-500 mx-3 w-3/4 md:w-auto cursor-pointer hover:bg-orange-600 text-xl text-white py-2 px-4 rounded-md' onClick={()=>{router.push("/projects");}}>Start Coding</button>
    <button className=' mx-3 border border-1 w-3/4 md:w-auto border-gray-300 cursor-pointer hover:text-white hover:bg-orange-500 text-xl text-black py-2 px-4 rounded-md'>Explore Features</button>
    </div>
     </div>

      <div className='md:w-1/2 w-full md:h-auto h-[300px] py-3'>
     <div className='h-full '>
         <HeroEditor />
      </div>
    </div>


</div>

    </div>
  )
}

export default Hero
