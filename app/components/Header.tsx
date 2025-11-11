"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaTimes } from 'react-icons/fa';
const Header = () => {
    const { data: session,status } = useSession();
    const [nav, setnav] = useState("");
    const [image, setimage] = useState(session?.user?.image);
    const [menu, setmenu] = useState(false);
    const router = useRouter();
    useEffect(() => {
     const path = window.location.pathname;
     if (path === "/") return setnav("Home");
      if (path === "/features") return setnav("Features");
      if (path === "/projects") return setnav("Projects");
      if (path === "/about") return setnav("About");
      if (path === "/contact") return setnav("Contact");
    }, []);

     useEffect(() => {
    if (menu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menu]);

  const handlePost = async ()=>{
   try {
     const res = await fetch("/api/projecte/push",{
      method:"POST",
      headers:{
       "Content-Type":"application/json"
      }
     });
    const data = await res.json();
    if(!res.ok)
    {
     alert(data.message);
     return;
    }
    alert("Projects Posted Successfully");
   } catch (error) {
     alert("An error occurred while posting the project.");
   }

  }
  return (
    <>
    <div className='bg-orange-400 md:py-auto md:px-auto px-3 py-5 relative p-0 md:p-4 flex justify-between items-center'>

    


    <div className='bg-orange-400 flex w-full gap-25'>
       
        <div className='flex justify-center items-center'>
          <h1 className='text-4xl text-white font-extrabold cursor-pointer' onClick={()=>{setnav("Home"); router.push("/")}}>
         Code
        <span className={`text-orange-300  `}>ly</span>
        </h1>
        </div>


      <div className='hidden lg:flex justify-center items-center gap-0 lg:gap-13 xl:gap-15 xxl:gap-25'>
    <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("Home"); router.push("/")}}>
        Home
        <span className={`text-white border border-1 mx-1 ${nav === "Home" ? "block" : "hidden"}`}></span>
        </h1>
    <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("Features"); router.push("/features")}}>Features
         <span className={`text-white border border-1 mx-1 ${nav === "Features" ? "block" : "hidden"}`}></span>
    </h1>
     <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("Projects"); router.push("/projects")}}>Projects
        <span className={`text-white border border-1 mx-1 ${nav === "Projects" ? "block" : "hidden"}`}></span>
    </h1>
    <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("About"); router.push("/about")}}>
        About
        <span className={`text-white border border-1 mx-1 ${nav === "About" ? "block" : "hidden"}`}></span>
    </h1>
     <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("Collab"); router.push("/collab")}}>
       Live Collab
        <span className={`text-white border border-1 mx-1 ${nav === "Collab" ? "block" : "hidden"}`}></span>
        </h1>
    <h1 className='text-xl font-semibold cursor-pointer flex flex-col gap-1' onClick={()=>{setnav("Contact"); router.push("/contact")}}>Contact
        <span className={`text-white border border-1 mx-1 ${nav === "Contact" ? "block" : "hidden"}`}></span>
    </h1>
    </div>

</div>
  
      

    

<div className='flex gap-5 justify-center items-center '>
<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn border flex justify-center items-center btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border flex justify-center items-center bg-orange-400 text-white">
          {image ? <img
            alt="Tailwind CSS Navbar component"
            // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
             src={image || ''} /> : <div className=' h-full flex justify-center items-center'><span className=' text-xl font-bold w-fit h-fit'>{(session as any)?.user?.name[0].toUpperCase() || ''}</span></div> }
        </div>
      </div>
      <ul
        tabIndex={1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {/* <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li> */}
        <li onClick={()=>{signOut()}}><a>Logout</a></li>
      </ul>
    </div>




     <div className='hidden lg:block'>
      <span className='px-4 py-2 text-white border rounded-lg' onClick={handlePost}>post</span>
     </div>






    <div className='lg:hidden block text-4xl font-bold block'>
      <GiHamburgerMenu onClick={()=>{setmenu(true);}}/>
    </div>
</div>












<div className={`flex-col w-full ${menu ? "flex" : "hidden"} border fixed top-0 right-0 bg-white h-screen w-full border text-center py-20 gap-10 sm:gap-20`}>
    <span className='text-orange-400 absolute top-3 right-3'><FaTimes size={24} onClick={()=>{setmenu(false);}}/></span>
    <h1 className={`text-xl justify-center items-center font-semibold cursor-pointer bg-white flex flex-col gap-1`}>
         <span className={`px-5 py-3 rounded-lg w-[200px] ${nav === "Home" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("Home"); router.push("/");setmenu(false);}}>Home</span>

        </h1>

    <h1 className={`text-xl justify-center items-center font-semibold bg-white cursor-pointer flex flex-col gap-1`}>
         <span className={`px-5 py-3 rounded-lg w-[200px] ${nav === "Features" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("Features"); router.push("/features");setmenu(false);}}>Features</span>

    </h1>

     <h1 className={`text-xl justify-center items-center font-semibold bg-white cursor-pointer flex flex-col gap-1`} >
          <span className={`px-5 py-3 rounded-lg w-[200px] ${nav === "Projects" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("Projects"); router.push("/projects");setmenu(false);}}>Projects</span>

    </h1>

    <h1 className={`text-xl justify-center items-center font-semibold bg-white cursor-pointer flex flex-col gap-1`} >
         <span className={`px-5 py-3 rounded-lg w-[200px] ${nav === "About" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("About"); router.push("/about");setmenu(false);}}>About</span>

    </h1>

      <h1 className={`text-xl justify-center items-center font-semibold bg-white cursor-pointer flex flex-col gap-1`} >
    <span className={`px-5 py-3 rounded-lg w-[200px] ${nav === "Collab" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("Collab"); router.push("/collab");setmenu(false);}}>Live Collab</span>
        </h1>

 <h1 className={`text-xl  justify-center items-center font-semibold bg-white cursor-pointer flex flex-col gap-1`} >
   <span className={`px-5 py-3 rounded-lg  w-[200px] ${nav === "Contact" ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`} onClick={()=>{setnav("Contact"); router.push("/contact");setmenu(false);}}>Contact</span>
    
    </h1>

</div>










  </div>

</>
  )
}

export default Header



