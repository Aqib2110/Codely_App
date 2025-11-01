// server/ws-share.ts
import { WebSocket } from "ws";

export interface SocketClient {
  id: string;
  socket: WebSocket;
}

export interface LiveCollab
{
  id:string,
  codeId:string,
  projectNameId:string,
  container:string,
  output:string,
  selected:string,
  members:string[]
}

const globalForSockets = globalThis as unknown as {
  sockets?: SocketClient[];
};

export const sockets = globalForSockets.sockets ?? [];
export const Live:LiveCollab[] = [];
if (!globalForSockets.sockets) {
  globalForSockets.sockets = sockets;
}
