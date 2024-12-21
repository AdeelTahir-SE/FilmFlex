import { NextResponse } from "next/server";
import { displayAllReview } from "@/DB/User";
export async function GET(req) {
  try {
    const reviews = await displayAllReview();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error getting reviews" },
      { status: 500 }
    );
  }
}