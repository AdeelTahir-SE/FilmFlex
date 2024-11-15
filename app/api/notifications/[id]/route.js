import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const id_user = params.id;
  
    const notifications=await  mysql.findUnique(id){

    }
    return NextResponse.json(notifications,{status:200});
  }