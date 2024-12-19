import NextResponse from "next/server";
import { getTrendingMovies } from "@/DB/Movies";
export async function GET(){
    try{
        const trendingMovies=await getTrendingMovies();
        return NextResponse.json(
            { message: "Trending Movies",trendingMovies: trendingMovies },
            { status: 200 }
        );
    }
    catch(e){
        console.log("Error:", e);
        return NextResponse.json(
            { message: "Error getting trending movies" },
            { status: 500 }
        );
    }
}