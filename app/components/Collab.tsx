"use client"
import React from 'react'
import { useContext } from 'react'
import { context } from './Context'
import { useRouter } from 'next/navigation'
const Collab = () => {
    const {setliveId,liveId} = useContext(context);
    const router = useRouter();
  const handleCollab = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if(!liveId)
  {
    console.log("reach");
   return;
  }
  console.log("reached");
  try {
     const res = await fetch("http://codely.mooo.com:9000/checkId",{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({id:liveId})
  })
  const data = await res.json();
  if(!res.ok)
  {
    setliveId('');
throw new Error(res.statusText);
  }
  alert(data.message)
  router.push("/code");
  } catch (error){
     setliveId('');
   
   alert(error)
  }
 
};

  return (
    <div className='min-h-screen bg-white w-full'>
        <div className='pt-20'>
 <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
       Live Collab into the Project
      </h1>
        </div>

<div>
 <main className="flex-grow flex items-center justify-center p-4">
        <form
          onSubmit={handleCollab}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">
            Collaborate on Project
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Project ID
            </label>
            <input
              type="text"
              value={liveId || ''}
              onChange={(e) => setliveId(e.target.value)}
              placeholder="Enter project ID"
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
          >
            Collab
          </button>
        </form>
      </main>

</div>

     
    </div>
  )
}

export default Collab
