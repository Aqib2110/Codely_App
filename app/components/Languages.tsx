import React from 'react'
import Image from 'next/image'
const Languages = () => {
  return (
    <div className=''>
      <section className="text-center mt-6">
  <h2 className="text-4xl font-extrabold text-orange-500">
    Code in Your Favorite Languages
  </h2>
  <p className="text-gray-600 text-xl mt-3">
    Codely supports mostly all languages — from Python to JavaScript.
  </p>
</section>
<div className='grid grid-cols-3 mt-5  pt-5 gap-10'>
    <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/next.svg" alt="" width={100} height={100} />
    </div>
     <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/logo_dark.svg" alt=""  width={80} height={80} />
    </div>
      <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/programing.png" alt="" width={80} height={80} />
    </div>
     <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/python.png" alt="" width={80} height={80} />
    </div>
     <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/typescript.png" alt="" width={80} height={80} />
    </div>
     <div className='bg-orange-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '>
        <Image className='border' src="/c.png" alt="" width={80} height={80} />
    </div>
</div>


    </div>
  )
}

export default Languages
