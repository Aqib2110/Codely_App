// "use client";
// import { useSession } from "next-auth/react";
// // import { useState, useRef } from "react";
// // export default function Home() {
// //   const [code, setCode] = useState(
// //     `console.log('Start');\nsetTimeout(() => console.log('After 2 seconds'), 2000);\nsetTimeout(() => console.log('After 3 seconds'), 3000);`
// //   );
// //   const [language, setLanguage] = useState("nodejs");
// //   const [output, setOutput] = useState("Waiting for execution...");
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [elapsed, setElapsed] = useState(0);
// //   const timerRef = useRef<NodeJS.Timeout | null>(null);
// //   const startTimeRef = useRef<number>(0);

// //   const examples = {
// //     nodejs: `console.log('Start');\nsetTimeout(() => console.log('After 2 seconds'), 2000);\nsetTimeout(() => console.log('After 3 seconds'), 3000);`,
// //     python: `import time\nprint('Start')\ntime.sleep(2)\nprint('After 2 seconds')\ntime.sleep(1)\nprint('After 3 seconds')`,
// //     typescript:`let a:string='pakistan';\nlet b:number=9;\nconsole.log("The sum of a and b is",a+b);\nconsole.log("Hello World")`,
// //     cpp:`#include <iostream>\nusing namespace std;\nint main()\n {\ncout << "Hello";\nreturn 0;\n}`
// //   };

// //   const loadExample = (lang: string) => {
// //     setLanguage(lang);
// //     setCode(examples[lang as keyof typeof examples]);
// //   };

// //   const clearOutput = () => {
// //     setOutput("Waiting for execution...");
// //     setElapsed(0);
// //     if (timerRef.current) {
// //       clearInterval(timerRef.current);
// //     }
// //   };

// //   const runCode = async () => {
// //     setOutput("");
// //     setIsRunning(true);
// //     setElapsed(0);

// //     startTimeRef.current = Date.now();
// //     timerRef.current = setInterval(() => {
// //       setElapsed(((Date.now() - startTimeRef.current) / 1000));
// //     }, 100);

// //     try {
// //       const response = await fetch("/api/projecte/run", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ language, code }),
// //       });

// //       const reader = response.body?.getReader();
// //       const decoder = new TextDecoder();

// //       if (!reader) {
// //         throw new Error("No reader available");
// //       }

// //       while (true) {
// //         const { done, value } = await reader.read();

// //         if (done) break;

// //         const chunk = decoder.decode(value, { stream: true });
// //         const timestamp = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);

// //         console.log(`[${timestamp}s] Received chunk:`, chunk);

// //         setOutput((prev) => prev + chunk);
// //       }
// //     } catch (error: any) {
// //       setOutput((prev) => prev + `\n\nError: ${error.message}`);
// //     } finally {
// //       setIsRunning(false);
// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen  bg-gray-50 p-8">
// //       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-2">
// //           🚀 Code Streaming Tester
// //         </h1>
// //         <p className="text-gray-600 mb-6">
// //           Test your streaming code execution in real-time!
// //         </p>

// //         {isRunning && (
// //           <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4 font-semibold">
// //             🏃 Running... ({elapsed.toFixed(1)}s elapsed)
// //           </div>
// //         )}

// //         {!isRunning && output !== "Waiting for execution..." && (
// //           <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4 font-semibold">
// //             ✅ Execution Complete ({elapsed.toFixed(1)}s total)
// //           </div>
// //         )}

// //         <div className="mb-4">
// //           <label className="block text-sm font-bold text-gray-700 mb-2">
// //             Language:
// //           </label>
// //           <select
// //             value={language}
// //             onChange={(e) => setLanguage(e.target.value)}
// //             className="w-full p-3 border-2 border-blue-500 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="nodejs" className="text-black">Node.js</option>
// //             <option value="python">Python</option>
// //             <option value="typescript">Typescript</option>
// //             <option value="cpp">C++</option>
// //           </select>
// //         </div>

// //         <div className="mb-4">
// //           <label className="block text-sm text-black font-bold mb-2">
// //             Code:
// //           </label>
// //           <textarea
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg font-mono text-black text-sm focus:outline-none focus:border-blue-500"
// //             placeholder="Enter your code here..."
// //           />
// //         </div>

// //         <div className="flex gap-3 mb-6">
// //           <button
// //             onClick={runCode}
// //             disabled={isRunning}
// //             className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
// //           >
// //             ▶ Run Code
// //           </button>
// //           <button
// //             onClick={clearOutput}
// //             className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600"
// //           >
// //             Clear Output
// //           </button>
// //         </div>

// //         <div className="bg-gray-100 p-4 rounded-lg mb-4">
// //           <strong className="text-gray-700">Quick Examples:</strong>
// //           <div className="mt-2 flex gap-2">
// //             <button
// //               onClick={() => loadExample("nodejs")}
// //               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
// //             >
// //               Node.js Timeout Example
// //             </button>
// //             <button
// //               onClick={() => loadExample("python")}
// //               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
// //             >
// //               Python Sleep Example
// //             </button>
// //              <button
// //               onClick={() => loadExample("typescript")}
// //               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
// //             >
// //               Typescript Example
// //             </button>
// //               <button
// //               onClick={() => loadExample("cpp")}
// //               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
// //             >
// //               C++ Example
// //             </button>
// //           </div>
// //         </div>

// //         <div>
// //           <label className="block text-sm font-bold text-gray-700 mb-2">
// //             Output:
// //           </label>
// //           <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm min-h-[150px] max-h-96 overflow-y-auto whitespace-pre-wrap">
// //             {output}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // import { authOptions } from "./api/auth/[...nextauth]/route";
// // import { getAuthSession } from "@/utils/getSession";
// function Home()
// {
//   // const session = await getAuthSession();
//   const session = useSession();
//   console.log(session,"sesion");
// return <><h1>Hello</h1>
// </>
// }
// export default Home;
import Home from './components/Home';
const page = () => {
  return (
    <div className='min-h-screen bg-white'>
     <Home />
    </div>
  )
}

export default page
