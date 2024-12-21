import { NextResponse } from "next/server";
import {getAllDiscounts} from "@/DB/Discount";
export async function GET(request){

    const discount=await getAllDiscounts();
    console.log(discount);
    return NextResponse.json(
        { message: "Movies Discount",discount: discount },
        { status: 200 }
    );
}
