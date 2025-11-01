import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { db } from "../auth/[...nextauth]/route";
import bcrypt from 'bcrypt'
export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    const hashed = bcrypt.hashSync(password,10);
   try {
     await db.user.create({
        data: {
            name,
            email,
            password:hashed
        }
    });
    return NextResponse.json({
        message: "signup successfully"
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
