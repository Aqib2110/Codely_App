import express from "express";
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
// import bodyParser from "body-parser";
import { sockets } from "./ws-share.js";
import { Live } from "./ws-share.js";
import { spawn } from "child_process";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const db = new PrismaClient();
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: "http://codely.mooo.com:3000", credentials: true }));



app.get("/clients", (req, res) => {
  res.json({ sockets: sockets.map(s => ({ id: s.id })) }); 
});

app.post("/send", (req, res) => {
  const { id, data } = req.body;
  const sock = sockets.find(s => s.id === id);
  if (!sock) return res.status(404).send("Socket not found");
  sock.socket.send(JSON.stringify(data));
  res.send("✅ Message sent");
});

app.post("/checkId", (req, res) => {
  const { id } = req.body;
  const sock = Live.find(s => s.id === id);
  if (!sock) return res.status(404).json({
    message:"project not found"
  });
  res.status(200).json({
    message:"project found"
  });
});

app.post("/live", (req, res) => {
  const { id,codeId,projectNameId,socketId,container,output,selected } = req.body;
  const exist = Live.find(obj=>obj.id === id);
  if(!exist)
  {
  Live.push({
  id,
  codeId,
  projectNameId,
  container,
  output,
  selected,
  members:[socketId]
  });
 return res.status(200).json({
    message:'message sent'
  });
  }
 return res.status(202).json({
    message:'live exist'
  });
});

app.listen(9000, () => console.log("🧩 API bridge running on port 9000"));

// Start WebSocket server (avoid double init)
const globalForWSS = globalThis as any;
if (!globalForWSS._wss) {
  const wss = new WebSocketServer({ port: 8080 });
  globalForWSS._wss = wss;

  wss.on("connection", (socket) => {
    const id = uuidv4();
    sockets.push({ id, socket });
    console.log(`🔗 Client connected: ${id}`);
    socket.send(JSON.stringify({ type: "id", id }));
    

socket.on("message", async (msg) => {
  let msag = msg.toString();
  try {
      const message = JSON.parse(msag.toString());
 
  console.log(message,"message");
  if(message.type === "end_live")
  {
   const live = Live.find(obj=>obj.codeId == message.codeId);
   if(live){
    return Live.filter(obj=>obj.codeId !== message.codeId);
   }
  }
 else if(message.type === "live_collab")
 {
 const {liveId} = message; 
 const liveFind = Live.find(obj=>obj.id == liveId);
 if(!liveFind)
 {
 socket.send(JSON.stringify({
  type:"live_fail",
  message:"Live might end or failed"
 }))
 return;
 }
 try {
   const project =  await db.projects.findFirst({
    where:{
      id:liveFind.codeId
    }
  })
  socket.send(JSON.stringify({
    type:"live_start",
    project:project,
    live:liveFind
  }))
 } catch (error) {
  if(error instanceof Error){
 socket.send(JSON.stringify({
  type:"live_error",
  message:error.message
 })) 
 return;
  }
  socket.send(JSON.stringify({
  type:"live_fail",
 message:"some error occured",
 }))

 }


 }
 else if (message.type === "code_updated") {
    const { name, content,containerName } = message;
    
    console.log(name,"name");
    if (!name) return;

    const exec = spawn("docker", [
      "exec",
      "-i",
      containerName,
      "sh",
      "-c",
      `cat > /app/${name}`
    ]);

    exec.stdin.write(content);
    exec.stdin.end();

    exec.on("close", (code) => {
      console.log(`📝 Updated file ${name} in ${containerName} (code ${code})`);
      socket.send(JSON.stringify({
        type: "file_updated",
        data: `${name} updated in container`
      }));
    });

    exec.stderr.on("data", (data) => {
      socket.send(JSON.stringify({
        type: "error",
        data: data.toString()
      }));
      console.log(data.toString());
    });
  }

 } catch (error) {
    if(error instanceof Error){
      socket.send(JSON.stringify({
  type:"live_fail",
  error:error.message
 })) 
    }
 socket.send(JSON.stringify({
  type:"live_fail",
  error:"parsing Failed"
 }))


  }
 });

    socket.on("close", () => {
      const i = sockets.findIndex(s => s.id === id);
      if (i !== -1) sockets.splice(i, 1);
      console.log(`❌ Client disconnected: ${id}`);
    });
  });

  console.log("✅ WebSocket server running at ws://13.48.129.114:8080");
}




