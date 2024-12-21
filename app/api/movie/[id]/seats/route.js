// pages/api/movie/[id]/seats.js
import { getSeatLayoutForMovie } from "@/DB/Seats";
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    const { id } = params; // Extract movieId from route params

  try {
    const seatLayout = await getSeatLayoutForMovie(id);
    if (!seatLayout) {
      return res.status(404).json({ error: "Seat layout not found" });
    }

    return NextResponse.json({ seatLayout });
  } catch (error) {
    console.error("Error fetching seat layout:", error);
    return NextResponse.json({ error: "Failed to fetch seat layout" });
  }
}
