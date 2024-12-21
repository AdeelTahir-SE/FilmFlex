import { NextResponse } from "next/server";
import { getMovie } from '@/DB/Movie';

export async function GET(req) {
    // Extract the movie id from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Assuming the URL is like /api/movie/[id]

    try {
        // Fetch the movie from the database using the extracted id
        const movie = await getMovie(id);

        // Check if movie exists, otherwise send an error response
        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }
console.log(movie);
        return NextResponse.json({ movie }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || "Failed to fetch movie data" }, { status: 500 });
    }
}
