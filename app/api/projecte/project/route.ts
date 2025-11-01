import { NextRequest,NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/route";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { getAuthSession } from "@/utils/getSession";

export async function POST(req:NextRequest){
    const {myProject,name,projectId,projectName} = await req.json();
    console.log(myProject,name,projectId,projectName,"aqib");
     const session = await getAuthSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

   const project = JSON.stringify(myProject);
   const userId = (session?.user as any)?.id;
try {
   const isProject = await db.projects.findFirst({
   where:{
    projectnameId:projectName?.id
    }
   });
  if(!isProject)
  {
    console.log("rech");
  await db.projects.create({
            data:{
            name,
            fileContent:project,
            userId,
            projectnameId:projectName?.id
            }
        })
    console.log("rac");
    return NextResponse.json({message:"project saved successfully"},{status:200});
  }
  
   

console.log("reaching....")

    await db.projects.update({
        where:{
            id:projectId
        },
        data:{
            name,
            fileContent:project,
            projectnameId:projectName?.id
        }
    })
    console.log("reached");
    return NextResponse.json({
        message:"project updated successfully"
    },{status:200})
} catch (error:unknown) {
    if(error instanceof Error){
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error occured" }, { status: 500 });
}
}

export async function DELETE(req:NextRequest){
    const {projectId} = await req.json();
     const session = await getAuthSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const userId = (session?.user as any)?.id;
    try {
        await db.projects.delete({
            where:{
                id:projectId
            }
        })
        return NextResponse.json({
            message:"project deleted successfully"
        },{status:200})
    } catch (error:unknown) {
        if(error instanceof Error){
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error occured" }, { status: 500 });
    }
}