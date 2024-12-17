import { NextResponse } from "next/server";
import { getMoviesSale } from "@/DB/Discount";
export async function GET(request){
    const {value} = request.cookies.get("userid");
    const userId = value;
    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const moviesSale=await getMoviesSale();
    return NextResponse.json(
        { message: "Movies Sale",moviesSale: moviesSale },
        { status: 200 }
    );
}