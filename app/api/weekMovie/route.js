import { NextResponse } from "next/server";
import { getMovieDetails } from "@/DB/Movie";
export async function GET(request){
    const {value} = request.cookies.get("userid");
    const userId = value;
    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const discount=await getMovieDetails();
    return NextResponse.json(
        { message: "Movies Discount",discount: discount },
        { status: 200 }
    );
}