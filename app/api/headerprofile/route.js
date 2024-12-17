import { NextResponse } from "next/server";
import { getUserById } from "@/DB/User";

export async function GET(request) {
  // Get the user ID from the cookie
  const {value} = request.cookies.get("userid");
    const userId = value;
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

const user=await getUserById(userId);
    if (!user) {
        console.log("User not found with this ID.", userId);
        return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
        );
    }

  // Return the user data
  return NextResponse.json(
    { message: "User Profile",user: user },
    { status: 200 }
    
  );
}