import { NextResponse } from "next/server";
import { createUser } from "@/DB/User";
export async function POST(request){
const {name,email,password} = await request.json();
try{
const res=await createUser(name,email,password);
}
catch(error){
    return NextResponse(new Response("Error", { status: 500 }));
}

return NextResponse.json({message:"User Created Successfully"}, { status: 200 });
}