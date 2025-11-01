import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/route";
import { getAuthSession } from "@/utils/getSession";
export async function POST(req:NextRequest) {
    const {setupName} = await req.json();
     const session = await getAuthSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
          }
          const userId = (session?.user as any)?.id;
   if (!setupName || typeof setupName !== 'string') {
    return NextResponse.json({ message: "Invalid setup parameter" }, { status: 400 });
  }
  try {
    const setup = await db.setup.findFirst({
      where: { name: setupName },
    });

    if (!setup) {
      return NextResponse.json({ message: "Setup not found" }, { status: 404 });
    }
return NextResponse.json(setup,{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving setup" },
      { status: 500 }
    );
  }
}
