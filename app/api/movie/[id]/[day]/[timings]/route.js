import { NextResponse } from "next/server";
import { getMovie } from '@/DB/Movie';

// Extract the movie, day, and timings from the URL
export async function GET(req) {
    const url = new URL(req.url);
    const pathname = url.pathname.split('/');
    
    // Extract the id, day, and timings from the URL
    const id = pathname[3];      // Assuming the URL is like /api/movie/[id]/[day]/[timings]
    const day = pathname[4];     // Day is now the fourth part of the URL
    const timings = decodeURIComponent(pathname[5]); // Timings is now the fifth part of the URL
console.log(id,day,timings);
 
    try {
        // Fetch the movie from the database using the extracted id
        const movie = await getMovie(id, day, timings);

        // Check if movie exists, otherwise send an error response
        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        return NextResponse.json({ movie }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || "Failed to fetch movie data" }, { status: 500 });
    }
}
