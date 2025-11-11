import { NextResponse,NextRequest } from "next/server";
import {v4 as uuidv4} from 'uuid'
export async function POST(req:NextRequest)
{
const liveId = uuidv4();
const {codeId,projectnameid,socketId,container,output,selected} = await req.json();
try {
    const res = await fetch('http://codely.mooo.com:9000/live',{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({id:liveId,codeId,projectNameId:projectnameid,socketId,container,output,selected})
})
const data = await res.json();
if(!res.ok)
{
return NextResponse.json({
    message:'failed for live collab.Try again'
},{
    status:202
})
}
return NextResponse.json({
    message:'Live enabled',
    liveId
},{
    status:202
})
} catch (error:unknown) {
    if(error instanceof Error){
return NextResponse.json({
    message:error.message
},{
    status:500
})
    } 
}
}
