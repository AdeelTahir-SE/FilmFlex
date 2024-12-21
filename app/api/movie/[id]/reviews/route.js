import { NextResponse } from "next/server";
import { getMovieReviews, addMovieReview } from "@/DB/Movie"; // Import database functions

// Handle GET requests to fetch movie reviews
export async function GET(request, { params }) {
  try {
    const { id: movieId } = params; // Extract movieId from route params
    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const reviews = await getMovieReviews(movieId); // Fetch reviews from the database
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// Handle POST requests to add a new movie review
export async function POST(request, { params }) {
  try {
    const { id: movieId } = params; // Extract movieId from route params
    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }
    const cookie = request.cookies.get("userid"); // Retrieve user ID from cookies
    const userId = cookie?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { name,comment,rating } = await request.json(); // Parse request body
console.log(name,comment,rating);
    if (!rating || !name || !comment) {
      return NextResponse.json(
        { error: "Rating and description are required" },
        { status: 400 }
      );
    }

    // Add the new review to the database
    await addMovieReview(movieId, userId, rating, comment);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
