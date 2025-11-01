"use client"
import React, { SetStateAction, useState,Dispatch,createContext } from 'react'

interface CodeContextType {
  code: any;
  setcode: Dispatch<SetStateAction<any>>;
  projectName:any;
  setprojectName:Dispatch<SetStateAction<any>>;
  liveId:string | null;
  setliveId:Dispatch<SetStateAction<any>>;
 
}

export const context = createContext<CodeContextType>({
  code: [],
  projectName:{},
  setcode: () => {},
  setprojectName:() => {},
  liveId:null,
  setliveId:()=>{},
});
const MyContext = ({children}: {children: React.ReactNode}) => {
    const [code, setcode] = useState([]);
    const [projectName, setprojectName] = useState({});
    const [liveId, setliveId] = useState(null);
  return (
    <div>
      <context.Provider value={{ code, setcode,projectName,setprojectName,liveId,setliveId}}>
        {children}
      </context.Provider>
    </div>
  )
}

export default MyContext

