import { reserveSeat, cancelReservation, buySeat} from "@/DB/SeatsFB" // Adjust path as needed
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { movieid: movieId, seatnumber: seatId } = params;
    const { action, userId } = await request.json();

    if (action === "reserve") {
      await reserveSeat(movieId, seatId, userId);
    } else if (action === "cancel") {
      await cancelReservation(movieId, seatId);
    } else if (action === "buy") {
      await buySeat(movieId, seatId, userId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ message: "Operation successful" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
