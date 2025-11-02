"use client"
import React from "react"; 
import { FaCode } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { PlusIcon } from "lucide-react";
import { FaCross } from "react-icons/fa";
import Image from "next/image";
import { useContext } from "react";
import { useState,useEffect } from "react";
import {context} from './Context' 
import { useRouter } from "next/navigation";
interface projectInterface{
  id:string
  name:string
  userId:string
}
const Projects = ({data}:any) => {
  console.log(data,"datas");
  const router = useRouter();
    const {setcode} = useContext(context);     
    const {setprojectName} = useContext(context);
    const [close, setclose] = useState(true);
  const [name, setname] = useState<projectInterface[]>(data?.projects?.projectname || []);
  const [openSetups, setopenSetups] = useState(false);
  const [load, setload] = useState(false);
  const [isProject, setisProject] = useState(false);
  const handleProject = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const project = formData.get("project") as string;
    if (project) {
      alert(project);
try {
   const projec = await fetch("http://codely.mooo.com:3000/api/myprojects",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:project})
      })
      const res = await projec.json();
      if(projec.ok)
      {
        setname(prev=>[...prev,res.data])
        setprojectName(res.data);
      alert('project created successfully');
      }
      else{
        alert(res.message || '')
      }
      setclose(true);
} catch (error) {
  alert('failed to create project')
}finally{
   form.reset();
}
}
  };
const handleSetup = async (setup: string) => {
  // if(setup == "c++-setup" || setup == "python-setup")
  // {
   
  // }
  try {
    setload(true);
    const response = await fetch("http://codely.mooo.com:3000/api/projecte/pull", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ setupName: setup }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Setup pulled successfully:", data);
          setload(false);
setcode(data);
router.push("/code");
    } else {
       setload(false);
      alert(data.message || "Something went wrong while pulling the setup.");      
    }
  } catch (err) {
    console.error("Error pulling setup:", err);
    alert("Failed to pull setup. Please try again later.");
        setload(false);

  }
};

  return (
    <>
    <div className={`min-h-screen ${load ? "block" : "hidden"} bg-white flex justify-center items-center`}>
      <div>
      <span className="loading loading-spinner text-neutral"></span>
      </div>
    </div>
<div className={`min-h-screen flex ${load ? "hidden" : "block"} ${openSetups ? "hidden" : "block"} ${close ? "hidden" : "block"} justify-center w-full px-8 pt-20 bg-white`}>
 
   <form onSubmit={handleProject} className={`bg-orange-50  relative border-3 w-1/2 h-1/2 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all`}>
             <span className="absolute cursor-pointer top-3 right-3 text-black text-md" onClick={()=>{setclose(true)}}><FaCross /></span>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Project Name"
                name="project"
                className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
<div className="flex justify-center">

            <button
              type="submit"
              className="bg-orange-500 cursor-pointer text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-600 transition-all hover:shadow-lg"
            >
              Create
            </button>
            </div>

          </form>
</div>



    <div className={`min-h-screen ${load ? "hidden" : "block"} ${openSetups ? "hidden" : "block"} ${close ? "block" : "hidden"} px-8 text-center pt-20 bg-white`}>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
       Create a project to start code
      </h1>
      <div className="py-20">
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">

          <div className="bg-orange-50 cursor-pointer p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1" onClick={()=>setclose(false)}>
            <FaCode className="text-orange-500 text-5xl mx-auto mb-4" />
            <div className=" flex justify-center gap-1">
              <h3 className="text-xl  w-1/2 text-black font-semibold">
                Create a project{" "}
              </h3>
              <span className=" flex items-center text-orange-500 ">
                <PlusIcon />
              </span>
            </div>
          </div>

          {name?.map(nam=>{
          return  <div key={nam.id} className="bg-orange-50 cursor-pointer p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          onClick={()=>
          {
            console.log("aqi");
          const projects = typeof(data.projects.projects) === "string" ? JSON.parse(data.projects.projects) : data.projects.projects;
          console.log(nam.id,projects,"projecky");
          const project = projects.find((project:any)=>project.projectnameId == nam?.id);
          console.log("aqiproject",project);
          if(!project)
          {
          setisProject(false);
          setopenSetups(true);
          setprojectName(nam);

          return;
          }
          setprojectName(nam);
          // setisProject(true);
          setcode(project);
          router.push("/code");
          console.log(projects,"aqiprojects")
          }
          }
          >
            <FaProjectDiagram className="text-orange-500 text-5xl mx-auto mb-4" />
            <div className=" flex justify-center gap-1">
              <h3 className="text-xl  w-1/2 text-black font-semibold">
                {nam.name}
              </h3>
            </div>
          </div>
          })}

        </div>
      </div>
    </div> 




    <div className={`h-[100vh] ${isProject ? "hidden" : "block"} ${openSetups ? "block" : "hidden"} ${load ? "hidden" : "block"} bg-white flex flex-col justify-center`}>
      <h1 className="text-orange-500 mx-auto text-5xl font-bold">Select Language</h1>

     <div className='flex flex-col mx-auto w-1/2 h-2/3 mt-10 py-5 overflow-scroll gap-5'>
         <div className='bg-orange-50 p-10 cursor-pointer w-full h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
         onClick={()=>handleSetup('nextjs-setup')}
         >
             <Image className='border object-contain' src="/next.svg" alt=""  width={80} height={80} />
         </div>
          <div className='bg-orange-50 p-4 cursor-pointer h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
           onClick={()=>handleSetup('reactjs-setup')}>
             <Image className='border' src="/logo_dark.svg" alt=""  width={80} height={80} />
         </div>
           <div className='bg-orange-50 p-4 cursor-pointer h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
            onClick={()=>handleSetup('nodejs-setup')}
           >
             <Image className='border' src="/programing.png" alt="" width={80} height={80} />
         </div>
          <div className='bg-orange-50 p-4 cursor-pointer h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
           onClick={()=>handleSetup('python-setup')}
          >
             <Image className='border' src="/python.png" alt="" width={80} height={80} />
         </div>
          <div className='bg-orange-50 p-4 cursor-pointer h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
           onClick={()=>handleSetup('nodets-setup')}
          >
             <Image className='border' src="/typescript.png" alt="" width={80} height={80} />
         </div>
          <div className='bg-orange-50 p-4 cursor-pointer h-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center '
           onClick={()=>handleSetup("c++-setup")}
          >
             <Image className='border' src="/c.png" alt="" width={80} height={80} />
         </div>
     </div>
    </div>
    </>
  );
};

export default Projects;
