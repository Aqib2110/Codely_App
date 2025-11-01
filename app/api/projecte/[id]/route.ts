import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "../../auth/[...nextauth]/route";
import { getAuthSession } from "@/utils/getSession";
export async function GET(req: NextRequest,{params}:{
  params:{
    id:string
  }
}) {
 const session = await getAuthSession(); 
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
 try {
     const project = await db.projectName.findFirst({
    where:{
      id:params.id
    }
  });

  return NextResponse.json({
   project
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