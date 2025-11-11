import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import tar from "tar-stream";
import getPort from "get-port";
import { uuidv4 } from "zod";

function flattenFiles(tree: any[], basePath = "") {
  const files: { name: string; content: string }[] = [];
  for (const item of tree) {
    const currentPath = basePath ? `${basePath}/${item.name}` : item.name;
    const path = currentPath.split('/').slice(1).join('/');
    if (item.type === "file") files.push({ name: path, content: item.content || "" });
    else if (item.type === "folder" && item.children)
      files.push(...flattenFiles(item.children, currentPath));
  }
  return files;
}

async function sendToSocket(id: string, data: any) {
  await fetch("http://codely.mooo.com:9000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, data }),
  });
}

async function runInDocker(flattenedFiles:any, project:any, socketId:any) {
  const pack = tar.pack();
  for (const file of flattenedFiles) pack.entry({ name: file.name }, file.content);
  pack.finalize();
  let docker;
  const port = await getPort({ port: Math.floor(Math.random() * 1000) + 5000 });
  const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
const containerName = `userproj_${uniqueId}`;
  await sendToSocket(socketId, { type: "containerId", container: containerName });

  console.log(`🚀 Creating container ${containerName} on port ${port}`);

 
// if(project==="nextjs-setup"){
//   console.log("reached");
//  docker = spawn("docker", [
//   "run",
//   "--rm",
//   "--name", containerName,
//   "-i",
//   "-p", `${port}:3000`,
//   "-w", "/app",
//   "node:20-alpine",
//   "sh", "-c",
//     `
//     apk add --no-cache tar npm >/dev/null &&
//     mkdir -p /app &&
//     tar -xvf - -C /app >/dev/null &&
//     cd /app &&
//     npm install --legacy-peer-deps &&
//     npm run build &&
//     echo "✅ Build complete. Starting server..." &&
//     npm run start
//   `
// ]);
// }
if (project === "nextjs-setup") {
  console.log("reached aqib");
  docker = spawn("docker", [
    "run",
    "--rm",
    "--name", containerName,
    "-i",
    "-p", `${port}:3000`,
    "-w", "/app",
    "node:20-alpine",
    "sh", "-c",
    `
    apk add --no-cache tar npm >/dev/null &&
    mkdir -p /app &&
    tar -xvf - -C /app >/dev/null &&
    cd /app &&
    npm install --legacy-peer-deps &&
    echo "👀 Starting Next.js in dev mode for hot reload..." &&
    npm run dev
    `
  ]);
  console.log("dockerrech");
}
else if(project==="reactjs-setup"){
   docker = spawn("docker", [
  "run",
  "--rm",
  "--name", containerName,
  "-i",
  "-p", `${port}:4173`,
  "-w", "/app",
  "node:20-alpine",
  "sh", "-c",
    `
    apk add --no-cache tar npm >/dev/null &&
    mkdir -p /app &&
    tar -xvf - -C /app >/dev/null &&
    cd /app &&
    npm install --legacy-peer-deps &&
    npm run build &&
    echo "✅ Build complete. Starting react server..." &&
    npm run start
  `
]);
}
else if(project==="nodejs-setup"){
 docker = spawn("docker", [
  "run",
  "--rm",
  "--name", containerName,
  "-i",
  "-p", `3001:3001`,
  "-w", "/app",
  "node:20-alpine",
  "sh", "-c",
    `
    apk add --no-cache tar npm >/dev/null &&
    mkdir -p /app &&
    tar -xvf - -C /app >/dev/null &&
    cd /app &&
    npm install --legacy-peer-deps &&
    echo "✅Starting server..." &&
    npm run start
  `
]);
}
else if(project==="nodets-setup"){
 docker = spawn("docker", [
  "run",
  "--rm",
  "--name", containerName,
  "-i",
  "-p", `3002:3002`,
  "-w", "/app",
  "node:20-alpine",
  "sh", "-c",
    `
    apk add --no-cache tar npm >/dev/null &&
    mkdir -p /app &&
    tar -xvf - -C /app >/dev/null &&
    cd /app &&
    npm install --legacy-peer-deps &&
    npm run build &&
    echo "✅ Build complete. Starting server..." &&
    npm run start
  `
]);
}
else if(project==="python")
{
  docker = spawn("docker",[
    "run",
    "--rm",
    "--name", containerName,
    "-i",
    "-w", "/app",
    "python:3.11",
    "sh","-c",
   `
   mkdir -p /app &&
   tar -xvf - -C /app >/dev/null &&
   cd /app &&
   python main.py
   `
  ])
}
else if(project==="c++")
{
 docker = spawn("docker",[
  "run",
  "--rm",
  "--name",containerName,
  "-i",
  "-w","/app",
  "gcc:latest",
  "sh","-c",
  `
  mkdir -p /app && 
  tar -xvf - -C /app >/dev/null &&
  cd /app &&
  g++ main.cpp -o main &&
  ./main
  `
 ])
}
else{
   docker = spawn("docker", [
  "run",
  "--rm",
  "--name", containerName,
  "-i",
  "-p", `${port}:3000`,
  "-w", "/app",
  "node:20-alpine",
  "sh", "-c",
    `
    apk add --no-cache tar npm >/dev/null &&
    mkdir -p /app &&
    tar -xvf - -C /app >/dev/null &&
    cd /app &&
    npm install --legacy-peer-deps &&
    npm run build &&
    echo "✅ Build complete. Starting server..." &&
    npm run start
  `
]);
}

  docker.stdout.on("data", async(data) => {
   await sendToSocket(socketId, { type: "output", data: data.toString() });
  });

  docker.stderr.on("data", async(data) => {
   await sendToSocket(socketId, { type: "error", data: data.toString() });
  });

  docker.on("close", (code) => {
    console.log(`🧹 Container exited with code ${code}`);
    sendToSocket(socketId, { type: "close", code });
  });

  pack.pipe(docker.stdin);

  return { containerName, port, previewUrl: `http://codely.mooo.com:${port}` };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { files, project, id: socketId } = body;

    if (!Array.isArray(files)) {
      return NextResponse.json({ error: "Invalid input: expected 'files' array" }, { status: 400 });
    }

    const flattened = flattenFiles(files);
    const result = await runInDocker(flattened, project, socketId);

    return NextResponse.json({
      message: "Container started successfully",
      ...result,
    });
  } catch (error: any) {
    console.error("❌ Error running project:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}





