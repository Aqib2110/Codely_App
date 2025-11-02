"use client";
import { useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import { context } from "./Context";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
interface FileInterface {
  id: string;
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileInterface[];
}

export default function IDE() {
  const { code,setcode,projectName } = useContext(context);
  const {liveId} = useContext(context);

  const [isClicked, setisClicked] = useState(false);
  const router = useRouter();
   const parsedFiles =
    typeof code?.fileContent === "string"
      ? JSON.parse(code?.fileContent)
      : code || [];
      const projectId = code?.id;
      console.log(code,parsedFiles,projectId,"project");
    // setparsed(parsedFiles);
    // setprojectId(projectId);
 
//  const [projectId, setprojectId] = useState('');
// const [parsed, setparsed] = useState([]);
  const [files, setFiles] = useState<FileInterface[]>(parsedFiles || []);
  const [selected, setSelected] = useState<FileInterface | null>(null);
  const [contents, setContents] = useState<FileInterface | null>(null);
  const [container, setcontainer] = useState<string | null>(null);
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [id, setid] = useState<string | null>(null)
  const [output, setOutput] = useState<string[]>([]);
  const [ws, setws] = useState<WebSocket | null>(null);
 useEffect(() => {
  console.log(files.length,files,"length");
  if(files.length > 0 || liveId){
      const ws = new WebSocket("ws://codely.mooo.com:8080");

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      setws(ws);
      if(!liveId)return;
      ws.send(JSON.stringify({
        type:"live_collab",
        liveId:liveId
      }))
    };

    ws.onmessage = (event:any) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === "id") {
          console.log("🆔 Socket ID received:", msg.id);
          setid(msg.id);
          alert(msg.id);
        }
        else if(msg.type === "live_fail"){
        alert(msg.message);
        router.push("/collab");
        }
        else if(msg.type === "live_error")
        {
        alert(msg.message);
        router.push("/collab");
        }
        else if(msg.type === "live_start")
        {
 const parsedFiles =
    typeof msg?.project?.fileContent === "string"
      ? JSON.parse(msg?.project?.fileContent)
      : code || [];         
      setFiles(parsedFiles);
      setcontainer(msg?.live?.container);
      setOutput(msg?.live?.output);
      alert("live successfully started");
        }
         else if(msg.type === "live_fail")
        {
 const parsedFiles =
    typeof msg?.project?.fileContent === "string"
      ? JSON.parse(msg?.project?.fileContent)
      : code || [];         
      setFiles(parsedFiles);
      alert("live successfully started");
        }
        else  if (msg.type === "containerId") {
          console.log("🆔 Socket ID received:");
          setcontainer(msg.container);
          alert(msg.container);
        } else if (msg.type === "output") {
          console.log(output,"output");
          setOutput((prev) => [...prev, `📤 ${msg.data}`]);
        } else if (msg.type === "error") {
          setOutput((prev) => [...prev, `❌ ${msg.data}`]);
        }
      } catch (e) {
        console.error("Invalid WS message:", event.data);
      }
    };

    ws.onclose = () => {
      alert("🔌 WebSocket closed");
      setcode([]);
      if(!liveId)
      {
       ws.send(JSON.stringify({
        type:"end_live",
        message:"live has ended",
        codeId:code?.id
       }))
      }
    };

    ws.onerror = (err) => {
      alert(`⚠️ WebSocket error:${err}`);
      console.log(err,"err");
      setcode([]);
    };
  }
else{
  router.push("/projects");
}
    return () => {
      ws?.close();
      setcode([]);
    };
  }, [files]);


const handleLive = async()=>{
  try {
    setisClicked(true);
    const res = await fetch("http://codely.mooo.com:3000/api/live",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({codeId:projectId,projectnameid:projectName?.id,socketId:id,container:container,output:output,selected:selected})
    });
    const data = await res.json();
    if(!res.ok)
    {
    throw new Error(res.statusText);
    }
alert(`${data.message} ${data.liveId}`);
setisClicked(false);
  } catch (error) {
    alert(error);
    console.log(error);
    setisClicked(false);
  }
}




  const handleRun = async() => {
   try {
    setisClicked(true);
    const res = await fetch("http://codely.mooo.com:3000/api/projecte/run",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({files:files,project:"nextjs-setup",id:id})
    })
  alert("running");
    const data = await res.json();
    if(!res.ok)
    {
     throw new Error(res.statusText)
    }
    alert(data.message);
   } catch (error) {
    alert(error)
    setisClicked(false);
   }
  };
const handleSave = async()=>{
  setisClicked(true);
try {
  const res = await fetch("http://codely.mooo.com:3000/api/projecte/project",{
  method:"POST",
  headers:{
    'Content-Type':"application/json"
  },
  body:JSON.stringify({myProject:files,name:"my-app",projectName:projectName,projectId})
})
const data = await res.json();
console.log(files);
if(!res.ok){
  throw new Error(res.statusText)
}
alert(data.message)
  setisClicked(false);
} catch (error) {
  alert(error);
  setisClicked(false);
}
}

  const addItemToTree = (
    tree: FileInterface[],
    parentName: string | null,
    newItem: FileInterface
  ): FileInterface[] => {
    return tree.map((node) => {
      if (node.type === "folder") {
        if (node.name === parentName) {
          return {
            ...node,
            children: [...(node.children || []), newItem],
          };
        } else if (node.children) {
          return { ...node, children: addItemToTree(node.children, parentName, newItem) };
        }
      }
      return node;
    });
  };

  const handleCreate = (type: "file" | "folder") => {

    const name = prompt(`Enter ${type} name:`);
    if (!name) return;

    const newItem: FileInterface = {
      id:uuidv4(),
      name,
      type,
      content: type === "file" ? "// new file" : undefined,
      children: type === "folder" ? [] : undefined,
    };

    if (selected && selected.type === "folder") {
      setFiles((prev) => addItemToTree(prev, selected.name, newItem));
    } else {
      setFiles((prev) => [...prev, newItem]);
    }
  };

  // Toggle folder dropdown open/close
  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  // Recursive tree renderer
  const renderTree = (nodes: FileInterface[]) => {
    return (
      <ul className="ml-2">
        {nodes.map((file) => (
          <li key={Math.random()} className="my-1">
            {file.type === "folder" ? (
              <div>
                <div
                  className={`cursor-pointer p-1 rounded flex justify-between items-center ${
                    selected === file ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setSelected(file);
                    toggleFolder(file.name);
                  }}
                >
                  <div className="flex items-center gap-1">
                    {openFolders.includes(file.name) ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                    <span>📁 {file.name}</span>
                  </div>

                  <span className="text-xs space-x-1">
                    <button
                      className="hover:text-blue-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(file);
                        handleCreate("file");
                      }}
                    >
                      +F
                    </button>
                    <button
                      className="hover:text-green-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(file);
                        handleCreate("folder");
                      }}
                    >
                      +D
                    </button>
                  </span>
                </div>
                {openFolders.includes(file.name) &&
                  file.children &&
                  renderTree(file.children)}
              </div>
            ) : (
              <div
                className={`cursor-pointer p-1 pl-6 rounded ${
                  contents === file ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={() => {
                  setSelected(file);
                  setContents(file);
                }}
              >
                📄 {file.name}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

const settingFiles = (
  files: FileInterface[],
  target: FileInterface,
  newContent: string,
  parentPath: string = ""
): FileInterface[] => {
  return files.map((file) => {
    const currentPath = parentPath ? `${parentPath}/${file.name}` : file.name;

    if (file.id === target.id) {
      const relativePath = currentPath.split("/").slice(1).join("/");
      console.log("Updating file:", relativePath);
      if(container) {
      ws?.send(JSON.stringify({
        type: "code_updated",
        name: relativePath,
        content: newContent,
        containerName: container, 
      }));
      }
     
      return { ...file, content: newContent };
    }

    if (file.type === "folder" && file.children) {
      return {
        ...file,
        children: settingFiles(file.children, target, newContent, currentPath),
      };
    }

    return file;
  });
};
if(files.length <= 0)
{
  return (<div className="h-screen flex justify-center items-center bg-white w-full">

     <div>
      <span className="loading loading-spinner text-neutral"></span>
      </div>
  </div>)
}
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-gray-900 text-white p-4 overflow-auto">
        <h2 className="text-lg mb-3 font-semibold flex justify-between items-center">
          Files
          <span>
            <button
              className="bg-blue-600 hover:bg-blue-700 px-2 disabled:bg-gray-500 disabled:cursor-not-allowed py-1 text-xs rounded mr-1"
              onClick={() => handleCreate("file")}
              disabled={isClicked}
            >
              + File
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-2 py-1 text-xs rounded"
              onClick={() => handleCreate("folder")}
              disabled={isClicked}
            >
              + Folder
            </button>
          </span>
        </h2>
        {files.length > 0 ? renderTree(files) : <p>No files found</p>}
        <div className="flex pt-8 w-fit mx-auto gap-5">
<button
  disabled={isClicked}
  className="text-white rounded-md px-2 py-1 text-xl enabled:cursor-pointer bg-blue-700 enabled:hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
  onClick={handleSave}

>
  Save
</button>
<button
  disabled={isClicked || liveId ? true : false}
  className="text-white rounded-md px-2 py-1 text-xl enabled:cursor-pointer bg-green-700 enabled:hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
  onClick={handleRun}
>
  run
</button>
        </div>
        <div className="flex justify-center mt-10 items-center">
         
          <button
  disabled={liveId ? true : false || output.length >= 10 ? false : true}
  className="text-white flex flex-col justify-center items-center rounded-md px-2 py-1 text-xl enabled:cursor-pointer bg-blue-700 enabled:hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
  onClick={handleLive}
>
   <FaUsers /> Live Collab
</button>
        </div>
      </div>



      <div className="flex-1 w-[80%]  h-full flex flex-col">
        <Editor
          height="70%"
          language="javascript"
          theme="vs-dark"
          value={contents?.content || ""}
          onChange={(value) =>{
            setContents((prev: any) => ({ ...prev, content: value || "" }));
            setFiles((file:any)=>{return settingFiles(file,contents!,value!)})
          }}
        />
        <div className="bg-black w-full  text-green-400 p-3 font-mono h-[30%]">
          <strong>Outputs:</strong>
          <div className=" overflow-auto w-full  h-full">
          {output.map(data=>{
            return <pre className="w-full" key={uuidv4()}>{data}</pre>
          })}
         </div>
        </div>
      </div>
    </div>
  );
}







// import fs from "fs";
// import path from "path";
// function createProjectFromJSON(project, root) {
//   for (const item of project) {
//     const itemPath = path.join(root, item.name);
//     if (item.type === "folder") {
//       // 1️⃣ Create the folder if it doesn’t exist
//       if (!fs.existsSync(itemPath)) {
//         fs.mkdirSync(itemPath);
//       }
//       // 2️⃣ Recurse into children
//       if (Array.isArray(item.children)) {
//         createProjectFromJSON(item.children, itemPath);
//       }
//     } else if (item.type === "file") {
//       // 3️⃣ Create file and write its content
//       fs.writeFileSync(itemPath, item.content || "", "utf8");
//     }
//   }
// }

