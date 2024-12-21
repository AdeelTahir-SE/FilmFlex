import { NextResponse } from "next/server";
import { getMoviesSale } from "@/DB/Discount";
export async function GET(request){

    const moviesSale=await getMoviesSale();
    console.log(moviesSale);
    return NextResponse.json(
        { message: "Movies Sale",moviesSale: moviesSale },
        { status: 200 }
    );
}

