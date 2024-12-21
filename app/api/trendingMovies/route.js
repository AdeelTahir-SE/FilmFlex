import {NextResponse} from "next/server";
import { getTrendingMovies } from "@/DB/Movie";
export async function GET(request){
    try{
        const trendingMovies=await getTrendingMovies();
        console.log("Trending Movies:",trendingMovies);
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