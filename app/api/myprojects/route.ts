import { NextRequest, NextResponse } from "next/server";
import { db } from "../auth/[...nextauth]/route";
import { getAuthSession } from "@/utils/getSession";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req:NextRequest)
{
const { name } = await req.json();
 const session = await getAuthSession(); 
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as any)?.id;
 try {
  const project = await db.projectName.create({
    data: { 
        name,
        // language,
        userId
     },
  });

  return NextResponse.json({
    message: "project created successfully",
    data:project
  },{status:200});
 }catch (err: unknown) {
    if(err instanceof Error){
     return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );  
    }
    return NextResponse.json(
      { error: "unknown error occured" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) 
{
const session = await getServerSession(authOptions);
   console.log("aqibSession:", session);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }


  const userId = (session.user as any)?.id;
  try {
     const projects = await db.user.findFirst({ where: { id: userId },include:{
    projectname:true,
    projects:true
  } });

  return NextResponse.json({
    projects:projects
  },{status:200});
  }catch (err: unknown) {
    if(err instanceof Error){
     return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );  
    }
    return NextResponse.json(
      { error: "unknown error occured" },
      { status: 500 }
    );
  }
}

