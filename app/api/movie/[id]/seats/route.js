// pages/api/movie/[id]/seats.js
import { getSeatLayoutForMovie } from "@/Seats";
import { NextResponse } from "next/server";
export  async function GET(req) {
  const {
    query: { id },
  } = req;
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
