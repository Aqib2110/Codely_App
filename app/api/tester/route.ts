import { NextRequest,NextResponse } from "next/server";
import { getAuthSession } from "@/utils/getSession";

export async function GET(req:NextRequest)
{
   const session = await getAuthSession();
   
   return NextResponse.json({
        session:session
    })
}
