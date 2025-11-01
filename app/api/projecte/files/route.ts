import { db } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/getSession";

export async function POST(req:NextRequest) {
    const {projectId,filename,fileContent} = await req.json();
     const session = await getAuthSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
          }
          const userId = (session?.user as any)?.id;
try {
     await db.file.create({
          data:{
            filename,
            fileContent,
            projectId
          }
    })
      NextResponse.json({
        message:"file created successfully"
      },{status:200})
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

export async function DELETE(req:NextRequest) {
    const {fileId} = await req.json();
 const session = await getAuthSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const userId = (session?.user as any)?.id;
   try {
     await db.file.delete({
         where:{
            id:fileId
         }
    })
      NextResponse.json({
        message:"file deleted successfully"
      },
    {status:200})
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


export async function PUT(req: NextRequest) {
   const session = await getAuthSession();
      if (!session) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userId = (session?.user as any)?.id;
  try {
    const { fileId, fileContent } = await req.json();

    if (!fileId || !fileContent) {
      return NextResponse.json(
        { error: "fileId and fileContent are required" },
        { status: 400 }
      );
    }

    const updatedFile = await db.file.update({
      where: { id: fileId },  
      data: { fileContent },   
      select: { id: true, fileContent: true } 
    });

    return NextResponse.json({
      message: "File updated successfully",
      file: updatedFile,
    },
{status:200});
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
