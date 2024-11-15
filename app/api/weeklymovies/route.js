import { NextResponse } from "next/server";
export  async function GET(request){
    const weekly_movies=await WeeklyMovies();
    return NextResponse.json(weekly_movies,{status:200});
}